import { _decorator, Component, Node, RichText, Button, instantiate, Sprite, color, sys } from "cc";
import { Character } from "../../../Components/Character/Character";
import { Identity } from "../../../Components/Identity/Identity";
import { ProcessEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { createCharacterById } from "../../../Components/Character";
import { CharacterEntity } from "../../../Components/Character/CharacterEntity";
import { CharacterStatus } from "../../../Components/Character/type";
import { MysteriousPerson } from "../../../Components/Identity/IdentityClass/MysteriousPerson";
import { CharacterInfoWindow } from "./CharacterInfoWindow";
import { ProgressControl } from "../../../Components/Utils/ProgressControl";

const { ccclass, property } = _decorator;

interface InitOption {
  playerCount: number;
  identity?: Identity;
  roles: number[];
  waitingSecond: number;
  secretTaskList: Identity[];
}

@ccclass("SelectCharacter")
export class SelectCharacter extends Component {
  @property(RichText)
  infoText: RichText | null = null;

  @property(Node)
  charcaterNode: Node | null = null;

  @property(Node)
  charcaterNodeList: Node | null = null;

  @property(Node)
  characterInfoWindow: Node | null = null;

  @property(Button)
  confirmButton: Button | null = null;

  private characterTypes: number[];
  private characterList: Character[] = [];
  private selectedCharacterIndex: number;

  init(data: InitOption, confirm) {
    //生成提示文字
    const { playerCount, identity, roles, waitingSecond, secretTaskList } = data;
    if (identity) {
      let text;
      if (secretTaskList.length < 7) {
        text = "本局游戏中可能出现的神秘人身份有：";
        for (const identity of secretTaskList) {
          text += `【<color=${identity.color}>${identity.name}</color>】`;
        }
      } else {
        text = "本局游戏中可能出现所有神秘人身份";
      }

      text += `\n本局游戏共${playerCount}名玩家，你的身份是：<color=${identity.color}>${identity.name}</color>`;
      if (identity instanceof MysteriousPerson) {
        text += `\n机密任务：${identity.secretTaskText}`;
      }
      this.infoText.getComponent(RichText).string = text;
      // Ensure proper layout refresh for RichText components on Android devices
      this.scheduleOnce(() => {
        this.infoText.getComponent(RichText).updateRenderData(true);
      }, 0.1);
    } else {
      this.infoText.getComponent(RichText).string = "请选择一名角色";
      // Ensure proper layout refresh for RichText components on Android devices
      this.scheduleOnce(() => {
        this.infoText.getComponent(RichText).updateRenderData(true);
      }, 0.1);
    }

    //生成角色
    this.characterTypes = roles;
    this.charcaterNodeList.removeAllChildren();
    this.selectedCharacterIndex = -1;
    for (let i = 0; i < roles.length; i++) {
      const character = createCharacterById(roles[i]);
      character.status = CharacterStatus.FACE_UP;
      this.characterList.push(character);

      const node = instantiate(this.charcaterNode);
      character.entity = node.getChildByName("CharacterPanting").getComponent(CharacterEntity);
      this.charcaterNodeList.addChild(node);

      const characterInfoWindowComponent = this.characterInfoWindow.getComponent(CharacterInfoWindow);
      if (sys.isMobile) {
        character.entity.node.on("longtap", (event) => {
          this.characterInfoWindow.active = true;
          const character = (<Node>(<unknown>event.target)).getComponent(CharacterEntity).data;
          characterInfoWindowComponent.getComponent(CharacterInfoWindow).setCharacterInfo(character);
          characterInfoWindowComponent.setPosition(event);

          this.node.once(Node.EventType.TOUCH_START, () => {
            this.characterInfoWindow.active = false;
          });
        });
      } else {
        character.entity.node.on(Node.EventType.MOUSE_ENTER, (event: MouseEvent) => {
          this.characterInfoWindow.active = true;
          const character = (<Node>(<unknown>event.target)).getComponent(CharacterEntity).data;
          characterInfoWindowComponent.getComponent(CharacterInfoWindow).setCharacterInfo(character);
        });
        character.entity.node.on(
          Node.EventType.MOUSE_MOVE,
          characterInfoWindowComponent.setPosition,
          characterInfoWindowComponent
        );
        character.entity.node.on(Node.EventType.MOUSE_LEAVE, (event: MouseEvent) => {
          this.characterInfoWindow.active = false;
        });
      }
    }

    //给角色绑定点击事件
    for (let i = 0; i < this.charcaterNodeList.children.length; i++) {
      const node = this.charcaterNodeList.children[i];
      node.on(Node.EventType.TOUCH_END, (event) => {
        if (i === this.selectedCharacterIndex) {
          return;
        } else {
          this.selectedCharacterIndex = i;
        }
        //清除选择
        for (let i = 0; i < this.charcaterNodeList.children.length; i++) {
          const sprite = this.charcaterNodeList.children[i].getChildByName("CharacterBorder").getComponent(Sprite);
          sprite.color = color(0, 0, 0);
        }
        node.getChildByName("CharacterBorder").getComponent(Sprite).color = color(0, 255, 0);
      });
    }

    //按钮绑定点击事件
    this.confirmButton.node.on(Node.EventType.TOUCH_END, (event) => {
      if (typeof this.selectedCharacterIndex !== "number" || this.selectedCharacterIndex < 0) return;
      confirm(this.characterTypes[this.selectedCharacterIndex]);
    });

    //显示窗口并开始倒计时
    this.show();
    this.node.getChildByName("Progress").getComponent(ProgressControl).startCountDown(waitingSecond);
  }

  show() {
    this.node.active = true;
    this.confirmButton.node.active = true;
    ProcessEventCenter.on(ProcessEvent.CONFIRM_SELECT_CHARACTER, (data) => {
      for (let i = 0; i < this.charcaterNodeList.children.length; i++) {
        const node = this.charcaterNodeList.children[i];
        node.off(Node.EventType.TOUCH_END);
      }
      this.confirmButton.node.off(Node.EventType.TOUCH_END);
      this.confirmButton.node.active = false;
    });
  }

  hide() {
    this.node.getChildByName("Progress").getComponent(ProgressControl).stopCountDown();
    ProcessEventCenter.off(ProcessEvent.CONFIRM_SELECT_CHARACTER);
    this.node.active = false;
  }

  //倒计时进度条动画
  confirmCharacter(role) {
    NetworkEventCenter.emit(NetworkEventToS.SELECT_ROLE_TOS, {
      role,
    });
  }
}
