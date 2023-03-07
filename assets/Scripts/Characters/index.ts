import { WuZhiGuo } from "./CharacterClass/WuZhiGuo";

const CharactersArray = [null, WuZhiGuo];

export function createCharacterById(id) {
  return new CharactersArray[id]();
}
