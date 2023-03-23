import { _decorator, Sprite, Label, resources, SpriteFrame } from "cc";
import { Character } from "../Character/Character";
import { GameObject } from "../../GameObject";
import { CharacterStatus } from "../Character/type";
const { ccclass } = _decorator;

@ccclass("CharacterObject")
export class CharacterObject extends GameObject<Character> {
  private sprite: Sprite = null;

  get data() {
    return this._data;
  }

  set data(data: Character) {
    super.data = data;
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

  onLoad() {
    this.sprite = this.node.getChildByPath("Mask/Image").getComponent(Sprite);
  }

  showCover() {
    this.node.getChildByPath("Mask/Cover").active = true;
  }

  hideCover() {
    this.node.getChildByPath("Mask/Cover").active = false;
  }

  loadSprite() {
    resources.load(this._data.sprite + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
      if (!err && spriteFrame) {
        spriteFrame.addRef(); // 计数加1
        this.sprite.spriteFrame = spriteFrame;
      }
    });
    this.node.getChildByName("Name").getComponent(Label).string = this._data.name;
  }

  releaseSprite() {
    if (this.sprite && this.sprite.spriteFrame) {
      this.sprite.spriteFrame.decRef();
      this.sprite.spriteFrame = null;
    }
  }
}
