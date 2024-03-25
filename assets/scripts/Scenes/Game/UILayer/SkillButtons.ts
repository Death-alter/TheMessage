import { _decorator, Component, Prefab, instantiate } from "cc";
import { Skill } from "../../../Components/Skill/Skill";
import { SkillButton } from "../../../Components/Skill/SkillButton";
import { GameManager } from "../../../Manager/GameManager";

const { ccclass, property } = _decorator;

@ccclass("SkillButtons")
export class SkillButtons extends Component {
  @property(Prefab)
  skillButtonPrefab: Prefab | null = null;

  public list: SkillButton[] = [];

  init(gui: GameManager, skills: Skill[]) {
    this.node.removeAllChildren();
    this.list = [];
    for (const skill of skills) {
      const button = instantiate(this.skillButtonPrefab);
      const skillButton = button.getComponent(SkillButton);
      skillButton.init(gui, skill);
      this.list.push(skillButton);
      this.node.addChild(button);
    }
  }
}
