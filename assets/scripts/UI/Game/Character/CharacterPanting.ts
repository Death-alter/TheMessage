import { _decorator, Component, Sprite, Label, resources, SpriteFrame } from "cc";
import { Character } from "../../../Data/Characters/Character";
import { CharacterStatus } from "../../../Data/Characters/type";
const { ccclass, property } = _decorator;

@ccclass("CharacterPanting")
export class CharacterPanting extends Component {
  private _character: Character;

  get character() {
    return this._character;
  }
  set character(character) {
    if (this._character === character) return;
    if (character) {
      this.releaseSprite();
      this._character = character;
      this._character.UI = this;
      if (character.status === CharacterStatus.FACE_UP) {
        this.hideCover();
      } else {
        this.showCover();
      }
      this.loadSprite();
    } else {
      this._character.UI = null;
      this._character = null;
    }
  }

  showCover() {
    this.node.getChildByPath("Mask/Cover").active = true;
  }

  hideCover() {
    this.node.getChildByPath("Mask/Cover").active = false;
  }

  loadSprite() {
    resources.load(this.character.sprite + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
      if (!err && spriteFrame) {
        spriteFrame.addRef(); // 计数加1
        this.node.getChildByPath("Mask/Image").getComponent(Sprite).spriteFrame = spriteFrame;
      }
    });
    this.node.getChildByName("Name").getComponent(Label).string = this.character.name;
  }

  releaseSprite() {
    const sprite = this.node.getChildByPath("Mask/Image").getComponent(Sprite);
    if (sprite && sprite.spriteFrame) {
      sprite.spriteFrame.decRef();
      sprite.spriteFrame = null;
    }
  }
}
