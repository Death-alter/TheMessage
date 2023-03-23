import { _decorator, Component, Node } from "cc";
import { NetworkEventCenter } from "../../Event/EventTarget";
import { NetworkEventToS } from "../../Event/type";
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
    this.node.getChildByName("ViewOrders").on(Node.EventType.TOUCH_END, (event) => {
      NetworkEventCenter.emit(NetworkEventToS.GET_ORDERS_TOS);
    });
    this.node.getChildByName("AddOrder").on(Node.EventType.TOUCH_END, (event) => {
      NetworkEventCenter.emit(NetworkEventToS.ADD_ORDER_TOS);
    });
    this.node.getChildByName("AddRoomPostion").on(Node.EventType.TOUCH_END, (event) => {
      NetworkEventCenter.emit(NetworkEventToS.ADD_ONE_POSITION_TOS);
    });
    this.node.getChildByName("RemoveRoomPostion").on(Node.EventType.TOUCH_END, (event) => {
      NetworkEventCenter.emit(NetworkEventToS.REMOVE_ONE_POSITION_TOS);
    });
  }
}
