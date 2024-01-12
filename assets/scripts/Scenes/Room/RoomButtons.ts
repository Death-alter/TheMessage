import { _decorator, Component, Node, director, find } from "cc";
import { NetworkEventCenter } from "../../Event/EventTarget";
import { NetworkEventToS } from "../../Event/type";
import { NetworkManager } from "../../Network/NetworkManager";
const { ccclass, property } = _decorator;

@ccclass("RoomButtons")
export class RoomButtons extends Component {
  onLoad() {
    //绑定按钮点击事件
    this.node.getChildByName("AddRobot").on(Node.EventType.TOUCH_END, (event) => {
      NetworkEventCenter.emit(NetworkEventToS.ADD_ROBOT_TOS);
    });
    this.node.getChildByName("RemoveRobot").on(Node.EventType.TOUCH_END, (event) => {
      NetworkEventCenter.emit(NetworkEventToS.REMOVE_ROBOT_TOS);
    });
    this.node.getChildByName("AddRoomPostion").on(Node.EventType.TOUCH_END, (event) => {
      NetworkEventCenter.emit(NetworkEventToS.ADD_ONE_POSITION_TOS);
    });
    this.node.getChildByName("RemoveRoomPostion").on(Node.EventType.TOUCH_END, (event) => {
      NetworkEventCenter.emit(NetworkEventToS.REMOVE_ONE_POSITION_TOS);
    });
    this.node.getChildByName("LeaveRoom").on(Node.EventType.TOUCH_END, (event) => {
      director.loadScene("login", () => {
        find("Resident").getComponent(NetworkManager).reconnect();
      });
    });
  }
}
