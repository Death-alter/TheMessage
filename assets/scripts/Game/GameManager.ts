import { _decorator, Component, Node, Prefab, instantiate, Label, resources, Layout } from "cc";
import { SelectCharacter } from "../UI/Game/SelectCharacter/SelectCharacter";
import { GamePhase } from "./type";
import {
  wait_for_select_role_toc,
  init_toc,
  notify_phase_toc,
  sync_deck_num_toc,
  add_card_toc,
} from "../../protobuf/proto.d";
import EventTarget from "../Event/EventTarget";
import { ProcessEvent, GameEvent } from "../Event/type";
import { Card } from "../Cards/Card";
import { createIdentity } from "../Identity";
import { Identity } from "../Identity/Identity";
import { IdentityType, SecretTaskType } from "../Identity/type";
import { CharacterType } from "../Characters/type";
import Player from "./Player";
import { createCharacterById } from "../Characters";
import { PlayerUI } from "../UI/Game/Player/PlayerUI";
import { createCard, createUnknownCard } from "../Cards";
import { CardUI } from "../UI/Game/Card/CardUI";
import { CardUsage } from "../Cards/type";
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
  public playerScriptList: PlayerUI[];

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
      if (this._turnPlayerId != null) {
        this.playerScriptList[this._turnPlayerId].setTurnPlayer(false);
      }
      this.playerScriptList[playerId].setTurnPlayer(true);
      this._turnPlayerId = playerId;
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
        this.playerScriptList[data.waitingPlayerId].startCoundDown(data.waitingSecond);
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
  }

  onDisable() {
    //移除事件监听
    EventTarget.off(ProcessEvent.START_SELECT_CHARACTER);
    EventTarget.off(ProcessEvent.INIT_GAME);
    EventTarget.off(ProcessEvent.GET_PHASE_DATA);
    EventTarget.off(ProcessEvent.SYNC_DECK_NUM);
  }

  init(data: init_toc) {
    this.playerCount = data.playerCount;
    const playerList = [];
    this.playerScriptList = [];

    //创建自己
    this.selfPlayer = new Player({
      name: data.names[0],
      character: createCharacterById((<unknown>data.roles[0]) as CharacterType),
    });
    playerList.push(this.selfPlayer);
    const selfPlayerScript = this.gameWindow.getChildByPath("Self/Player").getComponent(PlayerUI);
    this.playerScriptList.push(selfPlayerScript);
    selfPlayerScript.init(this.selfPlayer);
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
      playerList.push(
        new Player({
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
      const playerScript = player.getComponent(PlayerUI);
      playerScript.init(playerList[i + 1]);
      this.playerScriptList.push(playerScript);
      this.rightPlayerNodeList.addChild(player);
    }

    for (let i = sideLength; i < othersCount - sideLength; i++) {
      const player = instantiate(this.playerPrefab);
      const playerScript = player.getComponent(PlayerUI);
      playerScript.init(playerList[i + 1]);
      this.playerScriptList.push(playerScript);
      this.topPlayerNodeList.addChild(player);
    }

    for (let i = othersCount - sideLength; i < othersCount; i++) {
      const player = instantiate(this.playerPrefab);
      const playerScript = player.getComponent(PlayerUI);
      playerScript.init(playerList[i + 1]);
      this.playerScriptList.push(playerScript);
      this.leftPlayerNodeList.addChild(player);
    }
  }

  drawCards(data: add_card_toc) {
    if (data.unknownCardCount) {
      for (let i = 0; i < data.unknownCardCount; i++) {
        this.playerScriptList[data.playerId].addCard(createUnknownCard());
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
        this.playerScriptList[data.playerId].addCard(card);
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
      this.playerScriptList[i].getComponent(PlayerUI).setSeat(j);
      i = (i + 1) % this.playerCount;
      ++j;
    } while (i !== fistPlayerId);
  }
}
