import { Skill } from "./Skill";

export enum CharacterStatus {
  FACE_DOWN = 0,
  FACE_UP = 1,
}

export enum Sex {
  MALE = 0,
  FAMALE = 1,
}

export class Character {
  private _id: string;
  private _name: string;
  private _spirit: string;
  private _status: CharacterStatus;
  private _sex: Sex;
  private skills: Skill[];

  constructor() {}
}
