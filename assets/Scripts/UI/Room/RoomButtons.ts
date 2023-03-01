import { _decorator, Component, Node } from "cc";
import ws from "../../Utils/WebSocket";
const { ccclass, property } = _decorator;

@ccclass("RoomButtons")
export class RoomButtons extends Component {
  onLoad() {
    //绑定按钮点击事件
    this.node.getChildByName("AddRobot").on(Node.EventType.TOUCH_END, (event) => {
      ws.send("add_robot_tos");
    });
    this.node.getChildByName("RemoveRobot").on(Node.EventType.TOUCH_END, (event) => {
      ws.send("remove_robot_tos");
    });
    this.node.getChildByName("ViewOrders").on(Node.EventType.TOUCH_END, (event) => {
      ws.send("get_orders_tos");
    });
    this.node.getChildByName("AddOrder").on(Node.EventType.TOUCH_END, (event) => {
      ws.send("add_order_toc");
    });
    this.node.getChildByName("AddRoomPostion").on(Node.EventType.TOUCH_END, (event) => {
      ws.send("add_one_position_tos");
    });
    this.node.getChildByName("RemoveRoomPostion").on(Node.EventType.TOUCH_END, (event) => {
      ws.send("remove_one_position_tos");
    });
  }
}
