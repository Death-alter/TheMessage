import { _decorator, Component, Node, Prefab, instantiate, Label, director } from "cc";
import { NetworkEventCenter, ProcessEventCenter } from "../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../Event/type";
import config from "../../config";
const { ccclass, property } = _decorator;

@ccclass("ReplayList")
export class LoginButtons extends Component {
  @property(Prefab)
  replayPrefab: Prefab | null = null;

  onLoad(): void {
    NetworkEventCenter.on(NetworkEventToC.GET_RECORD_LIST_TOC, ({ records }) => {
      const viewContent = this.node.getChildByPath("ScrollView/view/content");
      viewContent.removeAllChildren();
      for (let item of records) {
        const recordId = item.slice(item.length - 6);
        const replay = instantiate(this.replayPrefab);
        replay.getChildByName("Label").getComponent(Label).string = item.slice(0, -7);
        replay.on(Node.EventType.TOUCH_END, () => {
          ProcessEventCenter.emit(ProcessEvent.START_LOAD_GAME_SCENE);
          director.loadScene("game", (e) => {
            NetworkEventCenter.emit(NetworkEventToS.DISPLAY_RECORD_TOS, {
              version: config.version,
              recordId,
            });
          });
        });
        viewContent.addChild(replay);
      }
    });

    this.node.getChildByName("CloseButton").on(Node.EventType.TOUCH_END, () => {
      this.node.active = false;
    });
  }

  onEnable() {
    NetworkEventCenter.emit(NetworkEventToS.GET_RECORD_LIST_TOS, {
      version: config.version,
    });
  }
}
