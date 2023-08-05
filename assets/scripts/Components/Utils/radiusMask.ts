import { _decorator, Component, Graphics, CCInteger } from "cc";
const { ccclass, property } = _decorator;

@ccclass("radiusMask")
export default class radiusMask extends Component {
  @property({ type: CCInteger })
  width: number = 0;

  @property({ type: CCInteger })
  height: number = 0;

  @property({ type: CCInteger })
  radius: number = 0;

  onLoad() {
    this.drawMask();
  }

  drawMask() {
    const g = this.node.getComponent(Graphics);
    g.roundRect(-this.width / 2, -this.height / 2, this.width, this.height, this.radius);
    g.stroke();
    g.fill();
  }
}
