import { Character } from "./Character";
import { UnknownCharacter } from "./CharacterClass/UnknownCharacter";
import { WuZhiGuo } from "./CharacterClass/WuZhiGuo";
import { CharacterType } from "./types";

const CharactersMap: { [index: number]: { new (): Character } } = {};
CharactersMap[0] = UnknownCharacter;
CharactersMap[1] = WuZhiGuo;

export function createCharacterById(id: CharacterType): Character {
  if (CharactersMap[id]) {
    return new CharactersMap[id]();
  } else {
    return new CharactersMap[0]();
  }
}
