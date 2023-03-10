import { _decorator, Component, Label, Node, UITransform, tween, Tween } from "cc";
const { ccclass, property } = _decorator;
import { CharacterPanting } from "../Character/CharacterPanting";
import Player from "../../Game/Player";
import EventTarget from "../../Event/EventTarget";
import { GameEvent } from "../../Event/type";

@ccclass("PlayerUI")
export class PlayerUI extends Component {
  @property(Node)
  characterPanting: Node | null = null;
  @property(Node)
  progress: Node | null = null;

  private _player: Player;
  private _progressAnimation: Tween<UITransform> | null = null;

  onEnable() {
    EventTarget.on(GameEvent.STOP_COUNT_DOWN, () => {
      this.stopCountDown();
    });
  }

  onDisable() {
    EventTarget.off(GameEvent.STOP_COUNT_DOWN);
  }

  init(player: Player) {
    this._player = player;
    this.characterPanting.getComponent(CharacterPanting).character = player.character;
    this.node.getChildByPath("Border/UserName/Label").getComponent(Label).string = player.name;
    this.progress.active = false;
  }

  setSeat(seatNumber: number) {
    this._player.seatNumber = seatNumber;
    this.node.getChildByName("SeatNumber").getComponent(Label).string = Player.seatNumberText[seatNumber];
  }

  startCoundDown(secondes) {
    this.progress.active = true;
    this.playProgressAnimation(secondes).then(() => {});
  }

  playProgressAnimation(seconds) {
    return new Promise((reslove, reject) => {
      try {
        const bar = this.progress.getChildByName("Bar");
        const barTransform = bar.getComponent(UITransform);
        barTransform.width = this.progress.getComponent(UITransform).width;
        this._progressAnimation = tween(barTransform)
          .to(
            seconds,
            { width: 0 },
            {
              onComplete: () => {
                this.progress.active = false;
                reslove(null);
              },
            }
          )
          .start();
      } catch (e) {
        reject(e);
      }
    });
  }

  stopCountDown() {
    if (this._progressAnimation) {
      this._progressAnimation.stop();
      this._progressAnimation = null;
      this.progress.active = false;
    }
  }

  setTurnPlayer(boolean) {
    this._player.isTurnPlayer = boolean;
  }
}
