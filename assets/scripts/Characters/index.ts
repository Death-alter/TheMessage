import { Character } from "./Character";
import { UnknownCharacter } from "./CharacterClass/UnknownCharacter";
import { WuZhiGuo } from "./CharacterClass/WuZhiGuo";
import { CharacterType } from "./type";

const charactersMap: { [index: number]: { new (option?: any): Character } } = {};
charactersMap[0] = UnknownCharacter;
charactersMap[1] = WuZhiGuo;

export function createCharacterById(id: CharacterType): Character {
  if (charactersMap[id]) {
    return new charactersMap[id]();
  } else {
    return new charactersMap[0]();
  }
}
