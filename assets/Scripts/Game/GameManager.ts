import { _decorator, Component, Node, director, RichText, tween, UITransform } from "cc";
import { SelectCharacter } from "../UI/SelectCharacter/SelectCharacter";
import { Character } from "../Characters/Character";
import { IdentifyType, SecretTaskType } from "./type";
import { phase, color, secret_task } from "../../protobuf/proto";
import EventTarget from "../Event/EventTarget";
import { ProcessEvent, GameEvent } from "../Event/types";
import { Card } from "../Cards/Card";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  @property(Node)
  selectCharacterWindow: Node | null = null;

  public CharacterList: Character[];
  public identity: IdentifyType;
  public secretTask: SecretTaskType | null = null;
  public playerCount: number;

  private _gamePhase: phase;
  private _turnPlayer: number;
  private _messageInTransmit: Card | null = null;

  get gamePhase() {
    return this._gamePhase;
  }
  set gamePhase(phase: phase) {
    if (phase !== this._gamePhase) {
      this._gamePhase = phase;
      EventTarget.emit(GameEvent.GAME_PHASE_CHANGE, phase);
    }
  }

  get turnPlayer() {
    return this._turnPlayer;
  }
  set turnPlayer(playerId: number) {
    if (playerId !== this._turnPlayer) {
      this._turnPlayer = playerId;
      EventTarget.emit(GameEvent.GAME_TURN_CHANGE, playerId);
    }
  }

  onEnable() {
    //开始选人
    EventTarget.on(ProcessEvent.START_SELECT_CHARACTER, (data) => {
      this.identity = data.identity;
      this.secretTask = data.secretTask;
      this.playerCount = data.playerCount;
      this.selectCharacterWindow.getComponent(SelectCharacter).init(data);
    });
    //收到初始化
    EventTarget.on(ProcessEvent.INIT_GAME, (data) => {
      this.init(data);
    });
  }

  onDisable() {
    //移除事件监听
    EventTarget.off(ProcessEvent.INIT_GAME);
  }

  init(data) {}

  drawCards(player, num: number) {}

  selectCard() {}

  playCard(player, card) {}

  sendMessage(player, card) {}
}
