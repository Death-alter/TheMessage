import EventTarget from "../Event/EventTarget";
import proto from "../../Protobuf/proto.js";
import { _decorator, Component, director } from "cc";
const errorCode = proto.error_code;

const Protos = {
  error_code_toc(data) {
    switch (data.code) {
      case errorCode.client_version_not_match:
        console.log(`客户端版本号不匹配,服务器版本号为${data.int_params[0]}`);
        break;
      case errorCode.no_more_room:
        console.log("没有更多的房间了");
        break;
      case errorCode.record_not_exists:
        console.log("录像不存在");
        break;
      case errorCode.load_record_failed:
        console.log("读取录像失败");
        break;
      case errorCode.record_version_not_match:
        console.log(`录像的版本号不匹配,服务器版本号为${data.int_params[0]}`);
        break;
      case errorCode.name_too_long:
        console.log("玩家名字过长");
        break;
      case errorCode.join_room_too_fast:
        console.log("加入房间的请求太快");
        break;
      case errorCode.robot_not_allowed:
        console.log("禁止添加机器人");
        break;
      case errorCode.already_online:
        console.log("你已经在线，不能重复登录");
        break;
      case errorCode.no_color_message_card:
        console.log("场上没有这种颜色的情报");
        break;
      case errorCode.login_failed:
        console.log("登录失败");
        break;
      default:
        console.log("未知错误");
    }
  },
  get_room_info_toc(data) {
    director.loadScene("room", (e) => {
      EventTarget.emit("get_room_info_toc", data);
    });
  },
  add_one_position_toc(data) {
    EventTarget.emit("add_one_position_toc", data);
  },
  remove_one_position_toc(data) {
    EventTarget.emit("remove_one_position_toc", data);
  },
};
export default Protos;
