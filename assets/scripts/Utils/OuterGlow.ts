import { _decorator, Component, Node, UITransform, Graphics, Color, color, CCInteger, Material } from "cc";
import radiusMask from "./radiusMask";
const { ccclass, property } = _decorator;

@ccclass("OuterGlow")
export class OuterGlow extends Component {
  @property({ type: CCInteger })
  glowWidth: number = 0;

  @property(Color)
  color: Color = color(0, 0, 0);

  start() {
    const grap = this.getComponent(Graphics);
    grap.rect(-50, -70, 50, 70);
    grap.stroke();
    grap.fill();

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

    // const mat = new Material();
    // mat.initialize({
    //   // 通过 effect 名指定材质使用的着色器资源
    //   effectName: "outerglow",
    //   defines: {
    //     USE_TEXTURE: true,
    //     SAMPLE_FROM_RT: true,
    //     SHOW_OUTTER_GLOW: true,
    //   },
    // });
    // mat.setProperty("lightColor", this.color);
    // mat.setProperty("glowColorSize", this.glowWidth / nodeTransform.width);
    // grap.customMaterial = mat;
  }

  update(deltaTime: number) {}
}
