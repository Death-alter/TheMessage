import { _decorator, Node, Label, Sprite, color, Vec2, UITransform } from "cc";
import { ActiveSkill, PassiveSkill, Skill } from "./Skill";
import { GameData } from "../../UI/Game/GameWindow/GameData";
import { GameObject } from "../../GameObject";
import { GamePhase } from "../../GameManager/type";

const { ccclass } = _decorator;

@ccclass("SkillButton")
export class SkillButton extends GameObject<Skill> {
  private _useable: boolean = false;
  private _isOn: boolean = false;
  private _locked: boolean = false;

  set useable(flag) {
    flag = (<ActiveSkill>this.data).useable && flag;
    if (flag !== this._useable) {
      this._useable = flag;
      if (flag) {
        this.node.getChildByName("SkillBackground").getComponent(Sprite).color = color("#68FF4B");
      } else {
        this.node.getChildByName("SkillBackground").getComponent(Sprite).color = color("#CCCCCC");
      }
    }
  }
  get useable() {
    return this._useable;
  }

  set isOn(flag) {
    this._isOn = flag;
    this.node.getChildByName("SkillBorder").getComponent(Sprite).material.recompileShaders({ SHOW_OUTTER_GLOW: flag });
  }

  get isOn() {
    return this._isOn;
  }

  get locked() {
    return this._locked;
  }

  onLoad() {
    this.scheduleOnce(() => {
      const borderNode = this.node.getChildByName("SkillBorder");
      const sprite = borderNode.getComponent(Sprite);
      const transform = borderNode.getComponent(UITransform);
      sprite.customMaterial.setProperty("texSize", new Vec2(transform.width, transform.height));
      console.log(borderNode.worldPosition);
      sprite.customMaterial.setProperty(
        "worldPosition",
        new Vec2(borderNode.worldPosition.x, borderNode.worldPosition.y)
      );
    }, 0);
  }

  init(gameData: GameData, skill: Skill) {
    this.data = skill;
    this.node.getChildByName("Label").getComponent(Label).string = skill.name;
    if (skill instanceof PassiveSkill) {
      this.setPassiveStyle();
      this.useable = true;
    } else if (skill instanceof ActiveSkill) {
      this.useable = false;
      this.onClick(() => {
        if (!this._locked) {
          gameData.gameObject.stopSelectPlayer();
          gameData.gameObject.clearSelectedPlayers();
          gameData.gameObject.stopSelectHandCard();
          gameData.gameObject.clearSelectedHandCards();
          if (this.isOn) {
            this.isOn = false;
            switch (gameData.gamePhase) {
              case GamePhase.MAIN_PHASE:
                gameData.gameObject.promotUseHandCard("出牌阶段，请选择要使用的卡牌");
                break;
              case GamePhase.FIGHT_PHASE:
                gameData.gameObject.promotUseHandCard("争夺阶段，请选择要使用的卡牌");
                break;
            }
          } else {
            this.isOn = true;
            skill.onUse(gameData);
          }
        }
      });
    } else {
      this.useable = false;
    }
  }

  setPassiveStyle() {
    this.useable = false;
    this.node.getChildByName("SkillBackground").getComponent(Sprite).color = color("#E4E1A6");
  }

  onClick(callback: (...args) => void) {
    if (callback) {
      this.node.on(
        Node.EventType.TOUCH_END,
        () => {
          if (this.useable) {
            callback();
          }
        },
        this
      );
    } else {
      this.node.off(Node.EventType.TOUCH_END);
    }
  }

  lock() {
    this._locked = true;
  }

  unlock() {
    this._locked = false;
  }
}
