import { _decorator, Component, AudioSource, Node, assert } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BGMSwitchButton")
export class BGMSwitchButton extends Component {
  @property(AudioSource)
  private _audioSource: AudioSource = null!;

  onLoad() {
    const audioSource = this.node.getComponent(AudioSource)!;
    assert(audioSource);
    this._audioSource = audioSource;
    this.node.on(
      Node.EventType.TOUCH_END,
      (event) => {
        if (this._audioSource.playing) {
          this._audioSource.stop();
        } else {
          this._audioSource.play();
        }
      },
      this
    );
  }
}
