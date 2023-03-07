import { Skill } from "../Skills/Skill";

export enum CharacterStatus {
  FACE_DOWN = 0,
  FACE_UP = 1,
}

export enum Sex {
  MALE = 0,
  FAMALE = 1,
  UNKONWN = 2,
}

export interface CharacterOptions {
  id: number;
  name: string;
  spirit: string;
  status?: CharacterStatus;
  sex: Sex;
  skills: Skill[];
}
