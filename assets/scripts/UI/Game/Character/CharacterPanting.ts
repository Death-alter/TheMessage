import { _decorator, Component, Sprite, Label, resources, SpriteFrame } from "cc";
import { Character } from "../../../Characters/Character";
const { ccclass, property } = _decorator;

@ccclass("CharacterPanting")
export class CharacterPanting extends Component {
  private _character: Character;

  get character() {
    return this._character;
  }
  set character(character) {
    this.releaseSprite();
    this._character = character;
    this.refresh();
  }

  refresh() {
    resources.load(this.character.sprite + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
      if (!err && spriteFrame) {
        spriteFrame.addRef(); // 计数加1
        this.node.getChildByName("Mask").getChildByName("Image").getComponent(Sprite).spriteFrame = spriteFrame;
      }
    });
    this.node.getChildByName("Name").getComponent(Label).string = this.character.name;
  }

  releaseSprite() {
    const sprite = this.node.getChildByName("Mask").getChildByName("Image").getComponent(Sprite);
    if (sprite && sprite.spriteFrame) {
      sprite.spriteFrame.decRef();
      sprite.spriteFrame = null;
    }
  }
}
