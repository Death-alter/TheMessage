import { _decorator, Node, Label, Sprite, color, Vec2, UITransform } from "cc";
import { ActiveSkill, PassiveSkill, Skill } from "./Skill";
import { GameObject } from "../../GameObject";
import { GameManager } from "../../Manager/GameManager";
import { UIEventCenter } from "../../Event/EventTarget";
import { UIEvent } from "../../Event/type";
import { PlayerAction } from "../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStepName } from "../../Utils/PlayerAction/type";

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
      sprite.material.setProperty("texSize", new Vec2(transform.width, transform.height));
      sprite.material.setProperty("worldPosition", new Vec2(this.node.worldPosition.x, this.node.worldPosition.y));
    }, 0);
  }

  init(gui: GameManager, skill: Skill) {
    this.data = skill;
    this.node.getChildByName("Label").getComponent(Label).string = skill.name;
    if (skill instanceof PassiveSkill) {
      this.setPassiveStyle();
      this.useable = true;
    } else if (skill instanceof ActiveSkill) {
      this.useable = false;
      this.onClick(() => {
        if (!this._locked) {
          UIEventCenter.emit(UIEvent.CANCEL_SELECT_HAND_CARD);
          UIEventCenter.emit(UIEvent.CANCEL_SELECT_PLAYER);
          if (this.isOn) {
            this.isOn = false;
            PlayerAction.switchToGroup("default");
          } else {
            this.isOn = true;
            PlayerAction.switchToGroup("UseSkill")
              .addStep({
                step: PlayerActionStepName.CONFIRM_USE_SKILL,
                data: {
                  tooltipText: `是否使用【${skill.name}】？`,
                  enabled: skill.canUse,
                },
              })
              .onCancel(() => {
                this.isOn = false;
              })
              .next();
            skill.onUse(gui);
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
