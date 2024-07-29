import { _decorator, Sprite, Label, resources, SpriteFrame } from "cc";
import { Entity } from "../../Entity";
import { Character } from "./Character";
import { CharacterStatus, Sex } from "./type";
const { ccclass } = _decorator;

@ccclass("CharacterEntity")
export class CharacterEntity extends Entity<Character> {
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
    const sexNode = this.node.getChildByName("Sex");
    if (this._data.status === CharacterStatus.FACE_UP) {
      sexNode.active = true;
      let sexIcon = "";
      if (this._data.sex === Sex.FEMALE) {
        sexIcon = "female";
      } else if (this._data.sex === Sex.MALE) {
        sexIcon = "male";
      }
      resources.load(`images/${sexIcon}/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
        if (!err && spriteFrame && this.node) {
          spriteFrame.addRef(); // 计数加1
          this.node.getChildByPath("Sex/Icon").getComponent(Sprite).spriteFrame = spriteFrame;
        }
      });
    } else {
      sexNode.active = false;
    }
    this.node.getChildByName("Name").getComponent(Label).string = this._data.name;
    this.node.getChildByName("CodeName").getComponent(Label).string = this._data.codeName;
  }

  releaseSprite() {
    const sprite = this.node.getChildByPath("Mask/Image").getComponent(Sprite);
    if (sprite && sprite.spriteFrame) {
      sprite.spriteFrame.decRef();
      sprite.spriteFrame = null;
    }
    const sexSprite = this.node.getChildByPath("Sex/Icon").getComponent(Sprite);
    if (sexSprite && sexSprite.spriteFrame) {
      sexSprite.spriteFrame.decRef();
      sexSprite.spriteFrame = null;
    }
  }
}
