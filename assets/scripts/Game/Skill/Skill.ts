import { Character } from "../Character/Character";
import { SkillOption } from "./type";

export abstract class Skill {
  protected _name: string;
  protected _character: Character;
  protected _description: string;

  get name() {
    return this._name;
  }

  get character() {
    return this._character;
  }

  get description() {
    return this._description;
  }

  constructor(option: SkillOption) {
    this._name = option.name;
    this._character = option.character;
    this._description = option.description;
  }

  abstract init(): void;

  abstract dispose(): void;
}
