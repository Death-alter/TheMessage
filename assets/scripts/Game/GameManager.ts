import { _decorator, Component, Node, Prefab, instantiate, Label, resources, Layout } from "cc";
import { SelectCharacter } from "../UI/Game/SelectCharacter/SelectCharacter";
import { GamePhase } from "./type";
import {
  wait_for_select_role_toc,
  init_toc,
  notify_phase_toc,
  sync_deck_num_toc,
  add_card_toc,
  notify_role_update_toc,
} from "../../protobuf/proto.d";
import EventTarget from "../Event/EventTarget";
import { ProcessEvent, GameEvent } from "../Event/type";
import { Card } from "../Data/Cards/Card";
import { createIdentity } from "../Data/Identity";
import { Identity } from "../Data/Identity/Identity";
import { IdentityType, SecretTaskType } from "../Data/Identity/type";
import { CharacterStatus, CharacterType } from "../Data/Characters/type";
import Player from "../Data/Player/Player";
import { createCharacterById } from "../Data/Characters";
import { PlayerUI } from "../UI/Game/Player/PlayerUI";
import { createCard, createUnknownCard } from "../Data/Cards";
import { CardUsage } from "../Data/Cards/type";
import { HandCardUI } from "../UI/Game/HandCardUI";
import { ProgressControl } from "../Utils/ProgressControl";

const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  @property(Node)
  selectCharacterWindow: Node | null = null;
  @property(Node)
  gameWindow: Node | null = null;
  @property(Prefab)
  playerPrefab: Prefab | null = null;
  @property(Prefab)
  cardPrefab: Prefab | null = null;
  @property(Node)
  leftPlayerNodeList: Node | null = null;
  @property(Node)
  topPlayerNodeList: Node | null = null;
  @property(Node)
  rightPlayerNodeList: Node | null = null;
  @property(Node)
  deck: Node | null = null;
  @property(Node)
  handCardUI: Node | null = null;

  public identity: Identity;
  public playerCount: number;
  public selfPlayer: Player;
  public playerCharacterIdList: number[];
  public playerList: Player[];

  private _gamePhase: GamePhase;
  private _turnPlayerId: number;
  private _messageInTransmit: Card | null = null;
  private _deckCardCount: number;
  private _discardPile: Card[] = [];
  private _banishCards: Card[] = [];
  private _seq: number;

  get gamePhase() {
    return this._gamePhase;
  }
  set gamePhase(phase: GamePhase) {
    if (phase !== this._gamePhase) {
      this._gamePhase = phase;
      EventTarget.emit(GameEvent.GAME_PHASE_CHANGE, phase);
    }
  }

  get turnPlayerId() {
    return this._turnPlayerId;
  }
  set turnPlayerId(playerId: number) {
    if (playerId !== this._turnPlayerId) {
      this._turnPlayerId = playerId;
      Player.turnPlayerId = playerId;
      EventTarget.emit(GameEvent.GAME_TURN_CHANGE, playerId);
    }
  }

  get deckCardCount() {
    return this._deckCardCount;
  }
  set deckCardCount(count) {
    this._deckCardCount = count;
    this.deck.getChildByName("Label").getComponent(Label).string = "牌堆剩余数量：" + count;
  }

  onEnable() {
    this.gameWindow.active = false;

    //开始选人
    EventTarget.on(ProcessEvent.START_SELECT_CHARACTER, (data: wait_for_select_role_toc) => {
      this.identity = createIdentity(
        (<unknown>data.identity) as IdentityType,
        (<unknown>data.secretTask) as SecretTaskType
      );
      this.playerCount = data.playerCount;
      this.playerCharacterIdList = data.roles;
      this.selectCharacterWindow.getComponent(SelectCharacter).init({
        identity: this.identity,
        roles: (<unknown[]>data.roles) as CharacterType[],
        waitingSecond: data.waitingSecond,
      });
    });

    //收到初始化
    EventTarget.on(ProcessEvent.INIT_GAME, (data) => {
      this.init(data);
      //预加载卡图
      resources.preloadDir("images/cards");
    });

    //设置座位号
    EventTarget.once(ProcessEvent.GET_PHASE_DATA, (data: notify_phase_toc) => {
      this.setPlayerSeats(data.currentPlayerId);
      this.selectCharacterWindow.getComponent(SelectCharacter).hide();
      this.gameWindow.active = true;
    });

    //收到phase数据
    EventTarget.on(ProcessEvent.GET_PHASE_DATA, (data: notify_phase_toc) => {
      EventTarget.emit(ProcessEvent.STOP_COUNT_DOWN);
      this.turnPlayerId = data.currentPlayerId;
      this.gamePhase = (<unknown>data.currentPhase) as GamePhase;
      if (data.waitingPlayerId === 0) {
        const progressStript = this.gameWindow.getChildByPath("Tooltip/Progress").getComponent(ProgressControl);

        progressStript.startCoundDown(data.waitingSecond);
      } else {
        this.playerList[data.waitingPlayerId].UI.startCoundDown(data.waitingSecond);
      }
      if (data.seq) this._seq = data.seq;
    });

    //卡组数量变化
    EventTarget.on(ProcessEvent.SYNC_DECK_NUM, (data: sync_deck_num_toc) => {
      this.deckCardCount = data.num;
      if (data.shuffled) {
        //播放洗牌动画（如果做了的话）
      }
    });

    //抽卡
    EventTarget.on(ProcessEvent.ADD_CARDS, (data: add_card_toc) => {
      this.drawCards(data);
    });

    //收到角色更新
    EventTarget.on(ProcessEvent.UPDATE_CHARACTER, (data: notify_role_update_toc) => {
      if (data.role) {
        if (this.playerList[data.playerId].character.id === 0) {
          const ui = this.playerList[data.playerId].character.UI;
          const character = createCharacterById((<unknown>data.role) as CharacterType);
          character.bindUI(ui);
          this.playerList[data.playerId].character = character;
        }
        this.playerList[data.playerId].character.status = CharacterStatus.FACE_UP;
      } else {
        this.playerList[data.playerId].character.status = CharacterStatus.FACE_DOWN;
      }
    });
  }

  onDisable() {
    //移除事件监听
    EventTarget.off(ProcessEvent.START_SELECT_CHARACTER);
    EventTarget.off(ProcessEvent.INIT_GAME);
    EventTarget.off(ProcessEvent.GET_PHASE_DATA);
    EventTarget.off(ProcessEvent.SYNC_DECK_NUM);
    EventTarget.off(ProcessEvent.ADD_CARDS);
    EventTarget.off(ProcessEvent.UPDATE_CHARACTER);
  }

  init(data: init_toc) {
    this.playerCount = data.playerCount;
    this.playerList = [];

    //创建自己
    this.selfPlayer = new Player({
      id: 0,
      name: data.names[0],
      character: createCharacterById((<unknown>data.roles[0]) as CharacterType),
      UI: this.gameWindow.getChildByPath("Self/Player").getComponent(PlayerUI),
    });
    this.playerList.push(this.selfPlayer);
    this.identity = createIdentity(
      (<unknown>data.identity) as IdentityType,
      (<unknown>data.secretTask) as SecretTaskType
    );

    //隐藏人物进度条
    this.gameWindow.getChildByPath("Tooltip/Progress").active = false;

    //初始化手牌UI
    this.handCardUI.getComponent(HandCardUI).init();

    //创建其他人
    for (let i = 1; i < data.playerCount; i++) {
      this.playerList.push(
        new Player({
          id: i,
          name: data.names[i],
          character: createCharacterById((<unknown>data.roles[i]) as CharacterType),
        })
      );
    }

    //创建其他人UI
    const othersCount = data.playerCount - 1;
    const sideLength = Math.floor(othersCount / 3);

    for (let i = 0; i < sideLength; i++) {
      const player = instantiate(this.playerPrefab);
      this.rightPlayerNodeList.addChild(player);
      this.playerList[i + 1].bindUI(player.getComponent(PlayerUI));
    }

    for (let i = sideLength; i < othersCount - sideLength; i++) {
      const player = instantiate(this.playerPrefab);
      this.topPlayerNodeList.addChild(player);
      this.playerList[i + 1].bindUI(player.getComponent(PlayerUI));
    }

    for (let i = othersCount - sideLength; i < othersCount; i++) {
      const player = instantiate(this.playerPrefab);
      this.leftPlayerNodeList.addChild(player);
      this.playerList[i + 1].bindUI(player.getComponent(PlayerUI));
    }
  }

  drawCards(data: add_card_toc) {
    if (data.unknownCardCount) {
      for (let i = 0; i < data.unknownCardCount; i++) {
        this.playerList[data.playerId].addCard(createUnknownCard());
      }
    } else {
      for (let item of data.cards) {
        const card = createCard({
          id: item.cardId,
          color: item.cardColor,
          type: item.cardType,
          direction: item.cardDir,
          drawCardColor: item.whoDrawCard,
          usage: CardUsage.HAND_CARD,
          lockable: item.canLock,
        });
        this.playerList[data.playerId].addCard(card);
        if (data.playerId === 0) {
          this.handCardUI.getComponent(HandCardUI).addCard(card);
        }
      }
    }
  }

  selectCard() {}

  playCard(player, card) {}

  sendMessage(player, card) {}

  setPlayerSeats(fistPlayerId: number) {
    let i = fistPlayerId;
    let j = 0;
    do {
      this.playerList[i].seatNumber = j;
      i = (i + 1) % this.playerCount;
      ++j;
    } while (i !== fistPlayerId);
  }
}
