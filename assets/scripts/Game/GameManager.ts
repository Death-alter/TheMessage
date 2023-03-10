import { _decorator, Component, Node, director, RichText, tween, UITransform, Prefab, instantiate } from "cc";
import { SelectCharacter } from "../UI/SelectCharacter/SelectCharacter";
import { Character } from "../Characters/Character";
import { GamePhase } from "./type";
import { phase, wait_for_select_role_toc, init_toc, notify_phase_toc, sync_deck_num_toc } from "../../protobuf/proto.d";
import EventTarget from "../Event/EventTarget";
import { ProcessEvent, GameEvent } from "../Event/type";
import { Card } from "../Cards/Card";
import { createIdentity } from "../Identity";
import { Identity } from "../Identity/Identity";
import { IdentityType, SecretTaskType } from "../Identity/type";
import { CharacterType } from "../Characters/type";
import Player from "./Player";
import { createCharacterById } from "../Characters";

const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  @property(Node)
  selectCharacterWindow: Node | null = null;
  @property(Prefab)
  characterPrefab: Prefab | null = null;
  @property(Node)
  leftPlayerNodeList: Node | null;
  @property(Node)
  topPlayerNodeList: Node | null;
  @property(Node)
  rightPlayerNodeList: Node | null;

  public identity: Identity;
  public playerCount: number;
  public selfPlayer: Player;
  public playerIdList: number[];
  public playerList: Player[];

  private _gamePhase: GamePhase;
  private _turnPlayerId: number;
  private _messageInTransmit: Card | null = null;
  private _deckCardCount: number;
  private _discardPile: Card[] = [];
  private _banishCards: Card[] = [];

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
        this.playerList[this._turnPlayerId].isCurrentTurnPlayer = false;
      }
      this.playerList[playerId].isCurrentTurnPlayer = true;
      this._turnPlayerId = playerId;
      EventTarget.emit(GameEvent.GAME_TURN_CHANGE, playerId);
    }
  }

  onEnable() {
    //开始选人
    EventTarget.on(ProcessEvent.START_SELECT_CHARACTER, (data: wait_for_select_role_toc) => {
      this.identity = createIdentity(
        (<unknown>data.identity) as IdentityType,
        (<unknown>data.secretTask) as SecretTaskType
      );
      this.playerCount = data.playerCount;
      this.playerIdList = data.roles;
      this.selectCharacterWindow.getComponent(SelectCharacter).init({
        identity: this.identity,
        roles: (<unknown[]>data.roles) as CharacterType[],
        waitingSecond: data.waitingSecond,
      });
    });

    //收到初始化
    EventTarget.on(ProcessEvent.INIT_GAME, (data) => {
      this.init(data);
      this.selectCharacterWindow.getComponent(SelectCharacter).hide();
    });

    //收到phase数据
    EventTarget.on(ProcessEvent.GET_PHASE_DATA, (data: notify_phase_toc) => {
      this.turnPlayerId = data.currentPlayerId;
      this.gamePhase = (<unknown>data.currentPhase) as GamePhase;
    });

    //卡组数量变化
    EventTarget.on(ProcessEvent.SYNC_DECK_NUM, (data: sync_deck_num_toc) => {
      this._deckCardCount = data.num;
      if (data.shuffled) {
        //播放洗牌动画（如果做了的话）
      }
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
    this.playerList = [];

    //创建自己
    this.selfPlayer = new Player({
      name: data.names[0],
      character: createCharacterById((<unknown>data.roles[0]) as CharacterType),
    });
    this.identity = createIdentity(
      (<unknown>data.identity) as IdentityType,
      (<unknown>data.secretTask) as SecretTaskType
    );

    //创建其他人
    for (let i = 1; i < data.playerCount; i++) {
      this.playerList.push(
        new Player({
          name: data.names[i],
          character: createCharacterById((<unknown>data.roles[i]) as CharacterType),
        })
      );
    }

    //创建其他人UI
    const othersCount = data.playerCount - 1;
    const sideLength = Math.floor(othersCount / 3);

    for (let i = sideLength - 1; i >= 0; i--) {
      const character = instantiate(this.characterPrefab);
      this.rightPlayerNodeList.addChild(character);
    }

    for (let i = othersCount - sideLength - 1; i >= sideLength; i++) {
      const character = instantiate(this.characterPrefab);
      this.topPlayerNodeList.addChild(character);
    }

    for (let i = othersCount - sideLength; i < othersCount; i++) {
      const character = instantiate(this.characterPrefab);
      this.leftPlayerNodeList.addChild(character);
    }
  }

  drawCards(player, num: number) {}

  selectCard() {}

  playCard(player, card) {}

  sendMessage(player, card) {}
}
