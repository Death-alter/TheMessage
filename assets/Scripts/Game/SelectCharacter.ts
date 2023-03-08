import { _decorator, Component, Node, UITransform, RichText, tween } from "cc";
import { IdentifyType, SecretTaskType } from "./type";
import { wait_for_select_role_toc } from "../../Protobuf/proto";
const { ccclass, property } = _decorator;

@ccclass("SelectCharacter")
export class SelectCharacter extends Component {
  private _infoText: Node | null = null;
  private _progress: Node | null = null;
  private _bar: Node | null = null;

  start() {
    this._infoText = this.node.getChildByName("InfoText");
    this._progress = this.node.getChildByName("Progress");
    this._bar = this._progress.getChildByName("Bar");
  }

  init(data: wait_for_select_role_toc) {
    let text = "你的身份是：";
    switch (data.identity as unknown as IdentifyType) {
      case IdentifyType.RED:
        text += "<color=#ff0000>潜伏战线</color>";
        break;
      case IdentifyType.BLUE:
        text += "<color=#0000ff>特工机关</color>";
        break;
      case IdentifyType.GREEN:
        switch (data.secretTask as unknown as SecretTaskType) {
          case SecretTaskType.KILLER:
            text += "<color=#00ff00>镇压者</color>\n机密任务：你的回合中，一名红色和蓝色情报合计不少于2张的人死亡";
            break;
          case SecretTaskType.STEALER:
            text += "<color=#00ff00>簒夺者</color>\n机密任务：你的回合中，有人宣胜，则你代替他胜利";
            break;
          case SecretTaskType.COLLECTOR:
            text += "<color=#00ff00>双重间谍</color>\n机密任务：你获得3张红色情报或者3张蓝色情报";
            break;
          case SecretTaskType.MUTATOR:
            text +=
              "<color=#00ff00>诱变者</color>\n机密任务：当一名角色收集了三张红色情报或三张蓝色情报后，若其没有宣告胜利，则你胜利";
            break;
          case SecretTaskType.PIONEER:
            text += "<color=#00ff00>先行者</color>\n机密任务：你死亡时，已收集了至少一张红色情报或蓝色情报";
            break;
          default:
            text += "<color=#00ff00>神秘人</color>";
        }
        break;
      default:
    }
    this._infoText.getComponent(RichText).string = text;
    const bar = this._bar.getComponent(UITransform);
    bar.width = this._progress.getComponent(UITransform).width;
    this.show();
    tween(bar).to(data.waitingSecond, { width: 0 }).start();
  }

  show() {
    this.node.active = true;
  }

  hide() {
    this.node.active = false;
  }
}
