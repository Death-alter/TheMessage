import { _decorator, Component, Node, UITransform, RichText, Button, ProgressBar, tween, instantiate } from "cc";
import { createCharacterById } from "../../Characters";
import { Character } from "../../Characters/Character";
import { CharacterType } from "../../Characters/type";
import { Identity } from "../../Identity/Identity";
import { MysteriousPerson } from "../../Identity/IdentityClass/MysteriousPerson";
import { CharacterPanting } from "../Character/CharacterPanting";

const { ccclass, property } = _decorator;

interface InitOption {
  identity: Identity;
  roles: CharacterType[];
  waitingSecond: number;
}

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

  @property(Button)
  confirmButton: Button | null = null;

  private characterList: Character[] = [];
  private selectedCharacter;

  onLoad() {
    for (let node of this.charcaterNodeList.children) {
      node.on(Node.EventType.TOUCH_END, (event) => {});
    }

    this.confirmButton.node.on(Node.EventType.TOUCH_END, (event) => {});
  }

  init(data: InitOption) {
    //生成提示文字
    const { identity, roles, waitingSecond } = data;
    let text = `你的身份是：<color=${identity.color}>${identity.name}</color>`;
    if (identity instanceof MysteriousPerson) {
      text += `\n机密任务：${identity.secretTaskText}`;
    }
    this.infoText.getComponent(RichText).string = text;

    //生成角色
    for (let i = 0; i < roles.length; i++) {
      const character = createCharacterById(roles[i]);
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
    this.playProgressAnimation(waitingSecond);
  }

  show() {
    this.node.active = true;
  }

  hide() {
    this.node.active = false;
  }

  //倒计时进度条动画
  playProgressAnimation(seconds) {
    return new Promise((reslove, reject) => {
      try {
        const bar = this.progress.node.getChildByName("Bar");
        const barTransform = bar.getComponent(UITransform);
        barTransform.width = this.progress.getComponent(UITransform).width;
        tween(barTransform)
          .to(
            seconds,
            { width: 0 },
            {
              onComplete: () => {
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
}
