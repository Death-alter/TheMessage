import { _decorator, Component, Node, UITransform, Graphics, Color, color, CCInteger, Material, Sprite } from "cc";
import radiusMask from "./radiusMask";
const { ccclass, property } = _decorator;

@ccclass("OuterGlow")
export class OuterGlow extends Component {
  @property({ type: CCInteger })
  glowWidth: number = 0;

  @property(Color)
  color: Color = color(0, 0, 0);

  @property(Material)
  material: Material = null;

  start() {
    // const grap = this.getComponent(Graphics);
    // const nodeTransform = this.node.getComponent(UITransform);
    // grap.rect(-nodeTransform.width / 2, -nodeTransform.height / 2, nodeTransform.width, nodeTransform.height);
    // grap.stroke();
    // grap.fill();

    // const glowNode = new Node("OuterGlow");
    // glowNode.addComponent(UITransform);
    // glowNode.addComponent(Graphics);
    // this.node.addChild(glowNode);
    // const nodeTransform = this.node.getComponent(UITransform);
    // const glowNodeTransform = glowNode.getComponent(UITransform);
    // glowNodeTransform.width = nodeTransform.width + this.glowWidth * 2;
    // glowNodeTransform.height = nodeTransform.height + this.glowWidth * 2;
    // const grap = glowNode.getComponent(Graphics);
    // const mask = this.node.getComponent(radiusMask);
    // if (mask) {
    //   grap.roundRect(
    //     -nodeTransform.width / 2,
    //     -nodeTransform.height / 2,
    //     nodeTransform.width,
    //     nodeTransform.height,
    //     mask.radius
    //   );
    //   grap.stroke();
    //   grap.fill();
    // } else {
    //   grap.rect(-nodeTransform.width / 2, -nodeTransform.height / 2, nodeTransform.width, nodeTransform.height);
    //   grap.stroke();
    //   grap.fill();
    // }

    const glowNode = new Node("OuterGlow");
    glowNode.addComponent(UITransform);
    glowNode.addComponent(Sprite);
    const nodeTransform = this.node.getComponent(UITransform);
    const glowNodeTransform = glowNode.getComponent(UITransform);
    glowNodeTransform.width = nodeTransform.width + this.glowWidth * 2;
    glowNodeTransform.height = nodeTransform.height + this.glowWidth * 2;
    const sprite = glowNode.getComponent(Sprite);

    this.material.setProperty("lightColor", Color.RED);
    // // mat.setProperty("glowColorSize", this.glowWidth / nodeTransform.width);
    sprite.customMaterial = this.material;
  }

  update(deltaTime: number) {}
}
