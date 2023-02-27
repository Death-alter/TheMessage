import { _decorator, Component, Node, EditBox } from "cc";
import ws from "../Utils/WebSocket";
import md5 from "ts-md5";
const { ccclass, property } = _decorator;

@ccclass("LoginButton")
export class LoginButton extends Component {
  @property(EditBox)
  userName: EditBox | null = null;

  @property(EditBox)
  password: EditBox | null = null;

  onLoad() {
    //点击事件
    this.node.on(Node.EventType.TOUCH_END, (event) => {
      if (this.userName.string && this.password.string) {
        ws.send("join_room_tos", {
          version: 1,
          name: this.userName.string,
          password: md5.Md5.hashStr(this.password.string),
          device: md5.Md5.hashStr(this.userName.string),
        });
      }
    });

    //注册回调
    ws.on("get_room_info_toc", (data) => {
      console.log("get_room_info_toc", data);
    });
  }

  onDestroy() {
    //移除回调
    ws.off("get_room_info_toc");
  }
}
