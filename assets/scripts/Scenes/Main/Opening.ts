import { _decorator, Component, VideoPlayer, director, NodeEventType } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Opening")
export class PlayerList extends Component {
  start() {
    director.preloadScene("login");
    this.node.on(VideoPlayer.EventType.COMPLETED, () => {
      director.loadScene("login");
    });
    this.node.on(VideoPlayer.EventType.CLICKED, () => {
      director.loadScene("login");
    });
  }
}
