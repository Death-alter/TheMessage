import {
  _decorator,
  Component,
  Node,
  Vec2,
  UITransform,
  Color,
  color,
  CCInteger,
  Material,
  Sprite,
  resources,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("OuterGlow")
export class OuterGlow extends Component {
  @property({ type: CCInteger })
  glowWidth: number = 0;

  @property(Color)
  color: Color = color(0, 0, 0);

  private showOuterGlow: boolean = false;

  openOuterGlow(c?: string) {
    if (this.showOuterGlow) return;
    resources.load("material/rectOuterGlow", Material, (err, material) => {
      material.addRef();
      const transform = this.node.getComponent(UITransform);
      material.setProperty("texSize", new Vec2(transform.width, transform.height));
      material.setProperty("glowColorSize", parseFloat(this.glowWidth.toFixed(1)));
      if (c) {
        material.setProperty("lightColor", color(c));
      }
      this.node.getComponent(Sprite).customMaterial = material;
      this.showOuterGlow = true;
    });
  }

  refreshOuterGlow() {
    const material = this.node.getComponent(Sprite).material;
    const p = material.passes[0].getHandle("worldPosition");
    material.passes[0].setUniform(p, new Vec2(this.node.worldPosition.x, this.node.worldPosition.y));
  }

  closeOuterGlow() {
    this.node.getComponent(Sprite).customMaterial = null;
    this.showOuterGlow = false;
  }

  update() {
    if (this.showOuterGlow) {
      this.refreshOuterGlow();
    }
  }
}
