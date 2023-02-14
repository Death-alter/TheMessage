import { _decorator, Component, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Background")
export class Background extends Component {
  onLoad() {
    director.addPersistRootNode(this.node);
  }
}
