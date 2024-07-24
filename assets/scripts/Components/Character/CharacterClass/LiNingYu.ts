import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { JiuJi } from "../../Skill/SkillClass/JiuJi";
import { ChengFu } from "../../Skill/SkillClass/ChengFu";
import { YiXin } from "../../Skill/SkillClass/YiXin";

export class LiNingYu extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 28,
      name: "李宁玉",
      codeName: "译电科科长",
      sprite: "images/characters/LiNingYu",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FEMALE,
      entity: entity,
    });
    this.setSkills([new JiuJi(this), new ChengFu(this), new YiXin(this)]);
  }
}
