import { _decorator, Component, Material } from "cc";
import { createCard } from "../Game/Card";
import { CardObject } from "../Game/Card/CardObject";
import { CardType } from "../Game/Card/type";
const { ccclass, property } = _decorator;

@ccclass("test")
export class test extends Component {
  start() {
    const cardObject = this.node.getComponentInChildren(CardObject)
    cardObject.data = createCard({
      type: CardType.CHENG_QING,
    });
    // const mat = new Material()
    // mat.initialize({
    //     // 通过 effect 名指定材质使用的着色器资源
    //     effectName: 'test',
    //     defines: {
    //         USE_TEXTURE: true
    //     }
    // });
    // this.node.getChildByName("Card")
  }

  update(deltaTime: number) {}
}
