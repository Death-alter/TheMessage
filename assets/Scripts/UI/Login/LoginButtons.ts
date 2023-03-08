import { _decorator, Component, Node, EditBox, resources, ImageAsset, Texture2D, SpriteFrame } from "cc";
import EventTarget from "../../Event/EventTarget";
import { NetworkEventToS, ProcessEvent } from "../../Event/types";
import md5 from "ts-md5";
const { ccclass, property } = _decorator;

@ccclass("LoginButtons")
export class LoginButtons extends Component {
  @property(EditBox)
  userName: EditBox | null = null;

  @property(EditBox)
  password: EditBox | null = null;

  @property(Node)
  helpTextNode: Node | null = null;

  @property(Node)
  replyListNode: Node | null = null;

  onEnable() {
    //login按钮
    this.node.getChildByName("Login").on(Node.EventType.TOUCH_END, (event) => {
      if (this.userName.string) {
        EventTarget.emit(NetworkEventToS.JOIN_ROOM_TOS, {
          version: 1,
          name: this.userName.string,
          password: md5.Md5.hashStr(this.password.string),
          device: md5.Md5.hashStr(this.userName.string),
        });
      } else {
        EventTarget.emit(ProcessEvent.NETWORK_ERROR, { msg: "请输入用户名" });
      }
    });

    if (this.helpTextNode !== null) {
      //help按钮
      this.node.getChildByName("Help").on(Node.EventType.TOUCH_END, (event) => {
        this.helpTextNode.active = true;
      });
      //点击弹窗关闭
      this.helpTextNode.on(Node.EventType.TOUCH_END, (event) => {
        this.helpTextNode.active = false;
      });
    }

    //reply按钮
    this.node.getChildByName("Reply").on(Node.EventType.TOUCH_END, (event) => {});
  }

  onDisable() {}
}
