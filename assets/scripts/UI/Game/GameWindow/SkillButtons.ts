import { _decorator, Component, Node, Prefab, instantiate, Label } from "cc";
import { ActiveSkill, Skill } from "../../../Game/Skill/Skill";
const { ccclass, property } = _decorator;

@ccclass("SkillButtons")
export class SkillButtons extends Component {
  @property(Prefab)
  skillButtonPrefab: Prefab | null = null;

  init(skills: Skill[]) {
    for (let skill of skills) {
      const button = instantiate(this.skillButtonPrefab);
      button.getChildByName("Label").getComponent(Label).string = skill.name;
    //   if (skill instanceof ActiveSkill) {
    //   }
      this.node.addChild(button);
    }
  }
}
