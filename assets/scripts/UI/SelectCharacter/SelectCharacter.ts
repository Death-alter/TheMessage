import { _decorator, Component, Node, UITransform, RichText, tween, ProgressBar, instantiate } from "cc";
import { IdentifyType, SecretTaskType } from "../../Game/type";
import { createCharacterById } from "../../Characters";
import { Character } from "../../Characters/Character";
import { CharacterType } from "../../Characters/types";
import { wait_for_select_role_toc } from "../../../protobuf/proto";
import { CharacterPanting } from "../Character/CharacterPanting";

const { ccclass, property } = _decorator;

@ccclass("SelectCharacter")
export class SelectCharacter extends Component {
  @property(RichText)
  infoText: RichText | null = null;

  @property(ProgressBar)
  progress: ProgressBar | null = null;

  @property(Node)
  charcaterPanting: Node | null = null;

  @property(Node)
  charcaterNodeList: Node | null = null;

  private characterList: Character[] = [];

  init(data: wait_for_select_role_toc) {
    //生成提示文字
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
    this.infoText.getComponent(RichText).string = text;

    //生成角色
    for (let i = 0; i < data.roles.length; i++) {
      const character = createCharacterById(data.roles[i] as unknown as CharacterType);
      this.characterList.push(character);
      if (i === 0) {
        this.charcaterPanting.getComponent(CharacterPanting).character = character;
      } else {
        const node = instantiate(this.charcaterPanting);
        node.getComponent(CharacterPanting).character = character;
        this.charcaterNodeList.addChild(node);
      }
    }

    this.show();
    this.startCountDown(data.waitingSecond);
  }

  show() {
    this.node.active = true;
  }

  hide() {
    this.node.active = false;
  }

  //倒计时进度条动画
  startCountDown(seconds) {
    const bar = this.progress.node.getChildByName("Bar");
    const barTransform = bar.getComponent(UITransform);
    barTransform.width = this.progress.getComponent(UITransform).width;
    tween(barTransform).to(seconds, { width: 0 }).start();
  }
}
