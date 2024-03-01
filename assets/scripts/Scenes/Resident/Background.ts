import { _decorator, assert, AudioClip, AudioSource, Component, director, find, resources, sys } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Background")
export class Background extends Component {
  @property(AudioSource)
  private _audioSource: AudioSource = null;

  start() {
    director.addPersistRootNode(this.node);
    const audioSource = find("Resident").getChildByName("Audio").getComponent(AudioSource);
    assert(audioSource);
    this._audioSource = audioSource;

    if (!this._audioSource.clip) {
      resources.load(`audio/bgm2`, (err, clip: AudioClip) => {
        if (err) {
        } else {
          this._audioSource.clip = clip;
          if (sys.localStorage.getItem("bgm") !== "0") {
            this._audioSource.play();
          }
        }
      });
    }
  }
}
