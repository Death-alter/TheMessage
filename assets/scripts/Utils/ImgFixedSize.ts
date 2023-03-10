import { _decorator, Component, Node, CCInteger, UITransform, Vec3 } from "cc";
const { ccclass, property } = _decorator;

/**
 * 图片限制尺寸
 */
@ccclass("ImgFixedSize")
export default class ImgFixedSize extends Component {
  @property({ type: CCInteger, tooltip: "固定尺寸" })
  fixedSize: number = 0;

  onLoad() {
    this.node.on(Node.EventType.SIZE_CHANGED, this.onSizeChanged, this);
    this.onSizeChanged();
  }

  /**当尺寸变化时，重置node节点大小 */
  onSizeChanged() {
    const transform = this.getComponent(UITransform);
    const width = transform.width;
    const height = transform.height;
    const value = this.fixedSize / Math.min(width, height);
    this.node.scale = new Vec3(value, value, 1);
  }
}
