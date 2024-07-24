import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { BoAi } from "../../Skill/SkillClass/BoAi";

export class BaiCangLang extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 6,
      name: "白沧浪",
      codeName: "情场浪子",
      sprite: "images/characters/BaiCangLang",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new BoAi(this)]);
  }
}
