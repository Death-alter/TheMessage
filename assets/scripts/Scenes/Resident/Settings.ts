import { _decorator, Component, AudioSource, Node, assert, find, resources, AudioClip, Toggle, sys } from "cc";
import { AudioMgr } from "./AudioMgr";
const { ccclass, property } = _decorator;

@ccclass("Settings")
export class Settings extends Component {
  onLoad() {
    const bgmCheckBox = this.node.getChildByPath("List/BGM/Toggle");
    const soundCheckBox = this.node.getChildByPath("List/Sound/Toggle");
    if (sys.localStorage.getItem("bgm") === "0") {
      bgmCheckBox.getComponent(Toggle).isChecked = false;
    }
    if (sys.localStorage.getItem("sound") === "0") {
      soundCheckBox.getComponent(Toggle).isChecked = false;
    }

    bgmCheckBox.on("toggle", (toggle) => {
      const audio = find("Resident").getChildByName("Audio").getComponent(AudioSource);
      if (toggle.isChecked) {
        audio.play();
        sys.localStorage.setItem("bgm", "1");
      } else {
        audio.stop();
        sys.localStorage.setItem("bgm", "0");
      }
    });
    soundCheckBox.on("toggle", (toggle: Toggle) => {
      if (toggle.isChecked) {
        AudioMgr.inst.unMute();
        sys.localStorage.setItem("sound", "1");
      } else {
        AudioMgr.inst.mute();
        sys.localStorage.setItem("sound", "0");
      }
    });
    this.node.getChildByName("CloseButton").on(Node.EventType.TOUCH_END, (event) => {
      this.node.active = false;
    });
  }
}
