import { _decorator, Component, AudioSource, Node, assert, SpriteFrame, Sprite } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BGMSwitchButton")
export class BGMSwitchButton extends Component {
  @property(SpriteFrame)
  onSprite: SpriteFrame = null;
  @property(SpriteFrame)
  offSprite: SpriteFrame = null;
  @property(AudioSource)
  private _audioSource: AudioSource = null;

  onLoad() {
    const audioSource = this.node.getComponent(AudioSource);
    assert(audioSource);
    this._audioSource = audioSource;
    this._audioSource.play();
    this.node.on(Node.EventType.TOUCH_END, (event) => {
      if (this._audioSource.playing) {
        this._audioSource.stop();
        this.getComponent(Sprite).spriteFrame = this.offSprite;
      } else {
        this._audioSource.play();
        this.getComponent(Sprite).spriteFrame = this.onSprite;
      }
    });
  }
}
