import { _decorator, Component, Node, Label, Sprite, color } from "cc";
import { ActiveSkill, PassiveSkill, Skill } from "./Skill";
import { GameData } from "../../UI/Game/GameWindow/GameData";
import { HandCardContianer } from "../Container/HandCardContianer";
import { ProcessEventCenter } from "../../Event/EventTarget";
import { ProcessEvent } from "../../Event/type";
import { GameObject } from "../../GameObject";

const { ccclass } = _decorator;

@ccclass("SkillButton")
export class SkillButton extends GameObject<Skill> {
  private _useable: boolean = false;

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

  init(gameData: GameData, skill: Skill) {
    this.data = skill;
    this.node.getChildByName("Label").getComponent(Label).string = skill.name;
    if (skill instanceof PassiveSkill) {
      this.setPassiveStyle();
      this.useable = true;
    } else if (skill instanceof ActiveSkill) {
      this.useable = false;
      this.onClick(() => {
        gameData.gameObject.resetSelectPlayer();
        gameData.gameObject.selectedPlayers.limit = 0;
        gameData.gameObject.clearPlayerSelectable();
        gameData.gameObject.handCardList.selectedCards.limit = 0;
        (<HandCardContianer>gameData.gameObject.handCardList.gameObject).resetSelectCard();
        ProcessEventCenter.off(ProcessEvent.SELECT_HAND_CARD);
        ProcessEventCenter.off(ProcessEvent.CANCEL_SELECT_HAND_CARD);
        skill.onUse(gameData);
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
}
