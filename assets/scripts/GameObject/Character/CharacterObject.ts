import { _decorator, Component, Sprite, Label, resources, SpriteFrame } from "cc";
import { Character } from "../../Data/Characters/Character";
import { CharacterStatus } from "../../Data/Characters/type";
import { GameObject } from "../GameObject";
const { ccclass, property } = _decorator;

@ccclass("CharacterObject")
export class CharacterObject extends GameObject<Character> {
  private sprite: Sprite = null;

  set data(data: Character) {
    if (data === this._data) return;
    if (data) {
      if (data.gameObject === this) {
        data.gameObject.data = null;
      }
      if (this._data.gameObject !== this) this._data.gameObject = this;
      this._data = data;
      this.releaseSprite();
      this.loadSprite();
      if (data.status === CharacterStatus.FACE_UP) {
        this.hideCover();
      } else {
        this.showCover();
      }
    } else if (this._data) {
      const data = this._data;
      this._data = null;
      data.gameObject = null;
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
    resources.load(this.data.sprite + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
      if (!err && spriteFrame) {
        spriteFrame.addRef(); // 计数加1
        this.sprite.spriteFrame = spriteFrame;
      }
    });
    this.node.getChildByName("Name").getComponent(Label).string = this.data.name;
  }

  releaseSprite() {
    if (this.sprite && this.sprite.spriteFrame) {
      this.sprite.spriteFrame.decRef();
      this.sprite.spriteFrame = null;
    }
  }
}
