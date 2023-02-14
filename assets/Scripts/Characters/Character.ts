import { CharacterStatus, Sex } from "../Types/enum";
import { Skill } from "./Skill"

export class Character {
  private _id: string;
  private _name: string;
  private _spirit: string;
  private _status: number;
  private _sex: number;
  private skills: Skill[];

  constructor() {}
}
