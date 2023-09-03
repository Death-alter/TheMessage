import { _decorator, Component, Node, EditBox, sys } from "cc";
import { ProcessEventCenter, NetworkEventCenter } from "../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../Event/type";
import { ReplayList } from "./ReplayList";
import config from "../../config";
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

  private logining: boolean = false;

  onEnable() {
    const name = sys.localStorage.getItem("userName");
    if (name) {
      this.userName.string = name;
      this.password.string = sys.localStorage.getItem("password");
    }

    //login按钮
    this.node.getChildByName("Login").on(Node.EventType.TOUCH_END, (event) => {
      if (this.logining) return;
      if (this.userName.string) {
        const name = this.userName.string;
        const password = this.password.string;
        sys.localStorage.setItem("userName", name);
        sys.localStorage.setItem("password", password);
        NetworkEventCenter.emit(NetworkEventToS.JOIN_ROOM_TOS, {
          version: config.version,
          name,
          password: password ? md5.Md5.hashStr(password) : "",
          device: md5.Md5.hashStr(this.userName.string),
        });
        this.logining = true;
        this.scheduleOnce(() => {
          this.logining = false;
        }, 0.5);
      } else {
        ProcessEventCenter.emit(ProcessEvent.NETWORK_ERROR, { msg: "请输入用户名" });
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
    this.node.getChildByName("Reply").on(Node.EventType.TOUCH_END, (event) => {
      NetworkEventCenter.emit(NetworkEventToS.GET_RECORD_LIST_TOS, {
        version: config.version,
      });

      NetworkEventCenter.on(NetworkEventToC.GET_RECORD_LIST_TOC, this.showReplayList, this);
    });
  }

  onDisable() {
    NetworkEventCenter.off(NetworkEventToC.GET_RECORD_LIST_TOC, this.showReplayList, this);
  }

  showReplayList(data) {
    this.replyListNode.active = true;
    this.replyListNode.getComponent(ReplayList).renderRecordList(data);
  }
}
