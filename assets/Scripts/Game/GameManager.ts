import { _decorator, Component, Node } from "cc";
import { Character } from "../Characters/Character";
import { phase, color, secret_task } from "../../Protobuf/proto";
import EventTarget from "../Event/EventTarget";
import { Card } from "../Cards/Card";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  @property(Node)
  public AudioPlayer: Node | null = null;

  public CharacterList: Character[];
  public identity: color;
  public secret_task: secret_task | null = null;

  private _gamePhase: phase;
  private _turnPlayer: number;
  private _messageInTransmit: Card | null = null;

  get gamePhase() {
    return this._gamePhase;
  }
  set gamePhase(phase: phase) {
    if (phase !== this._gamePhase) {
      this._gamePhase = phase;
      EventTarget.emit("game_phase_change", phase);
    }
  }

  get turnPlayer() {
    return this._turnPlayer;
  }
  set turnPlayer(playerId: number) {
    if (playerId !== this._turnPlayer) {
      this._turnPlayer = playerId;
      EventTarget.emit("game_turn_change", playerId);
    }
  }

  onEnable() {
    //收到初始化
    EventTarget.on("init_toc", (data) => {
      this.init(data);
    });
  }

  onDisable() {
    //移除事件监听
    EventTarget.off("init_toc");
  }

  init(data) {}

  drawCards(player, num: number) {}

  selectCard() {}

  playCard(player, card) {}

  sendMessage(player, card) {}
}
