import { CharacterEntity } from "./CharacterEntity";

export const enum CharacterStatus {
  FACE_DOWN = 0,
  FACE_UP = 1,
}

export const enum Sex {
  MALE = 0,
  FAMALE = 1,
  UNKNOWN = 2,
}

export interface CharacterOptions {
  id: number;
  name: string;
  sprite: string;
  status?: CharacterStatus;
  sex: Sex;
  entity?: CharacterEntity;
}
