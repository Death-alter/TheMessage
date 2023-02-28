import EventTarget from "../Event/EventTarget";
import { _decorator, Component, director } from "cc";

const Protos = {
  get_room_info_toc(data) {
    director.loadScene("room", () => {
      EventTarget.emit("get_room_info_toc", data);
    });
  },
};
export default Protos;
