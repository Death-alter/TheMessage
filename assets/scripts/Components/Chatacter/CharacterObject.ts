import { _decorator, Sprite, Label, resources, SpriteFrame } from "cc";
import { GameObject } from "../../GameObject";
import { Character } from "./Character";
import { CharacterStatus } from "./type";
const { ccclass } = _decorator;

@ccclass("CharacterObject")
export class CharacterObject extends GameObject<Character> {
  get data() {
    return this._data;
  }

  set data(data: Character) {
    super.setData(data);
    if (data) {
      if (data.status === CharacterStatus.FACE_DOWN) {
        this.showCover();
      } else {
        this.hideCover();
      }
      this.releaseSprite();
      this.loadSprite();
    }
  }

  showCover() {
    this.node.getChildByPath("Mask/Cover").active = true;
  }

  hideCover() {
    this.node.getChildByPath("Mask/Cover").active = false;
  }

  loadSprite() {
    resources.load(this._data.sprite + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
      if (!err && spriteFrame && this.node) {
        spriteFrame.addRef(); // 计数加1
        this.node.getChildByPath("Mask/Image").getComponent(Sprite).spriteFrame = spriteFrame;
      }
    });
    this.node.getChildByName("Name").getComponent(Label).string = this._data.name;
  }

  releaseSprite() {
    const sprite = this.node.getChildByPath("Mask/Image").getComponent(Sprite);
    if (sprite && sprite.spriteFrame) {
      sprite.spriteFrame.decRef();
      sprite.spriteFrame = null;
    }
  }
}
