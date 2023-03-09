import { Character } from "./Character";
import { GuXiaoMeng } from "./CharacterClass/GuXiaoMeng";
import { LiNingYu } from "./CharacterClass/LiNingYu";
import { SPGuXiaoMeng } from "./CharacterClass/SPGuXiaoMeng";
import { SPLiNingYu } from "./CharacterClass/SPLiNingYu";
import { UnknownCharacter } from "./CharacterClass/UnknownCharacter";
import { WuZhiGuo } from "./CharacterClass/WuZhiGuo";
import { CharacterType } from "./type";

const charactersMap: { [index: number]: { new (option?: any): Character } } = {};
charactersMap[0] = UnknownCharacter;
charactersMap[1] = WuZhiGuo;
charactersMap[20] = GuXiaoMeng;
charactersMap[28] = LiNingYu;
charactersMap[1020] = SPGuXiaoMeng;
charactersMap[1028] = SPLiNingYu;

export function createCharacterById(id: CharacterType): Character {
  if (charactersMap[id]) {
    return new charactersMap[id]();
  } else {
    return new charactersMap[0]();
  }
}
