import { Character } from "./Character";
import { CharacterType } from "./type";
import { GuXiaoMeng } from "./CharacterClass/GuXiaoMeng";
import { LiNingYu } from "./CharacterClass/LiNingYu";
import { GuXiaoMengSP } from "./CharacterClass/GuXiaoMengSP";
import { LiNingYuSP } from "./CharacterClass/LiNingYuSP";
import { UnknownCharacter } from "./CharacterClass/UnknownCharacter";
import { WuZhiGuo } from "./CharacterClass/WuZhiGuo";
import { ChengXiaoDie } from "./CharacterClass/ChengXiaoDie";
import { LianYuan } from "./CharacterClass/LianYuan";
import { MaoBuBa } from "./CharacterClass/MaoBuBa";
import { ZhangYiTing } from "./CharacterClass/ZhangYiTing";
import { BaiCangLang } from "./CharacterClass/BaiCangLang";
import { FeiYuanLongChuan } from "./CharacterClass/FeiYuanLongChuan";
import { PeiLing } from "./CharacterClass/PeiLing";
import { HuangJiRen } from "./CharacterClass/HuangJiRen";
import { WangTianXiang } from "./CharacterClass/WangTianXiang";
import { LiXing } from "./CharacterClass/LiXing";
import { WangKui } from "./CharacterClass/WangKui";
import { AFuLuoLa } from "./CharacterClass/AFuLuoLa";
import { HanMei } from "./CharacterClass/HanMei";
import { ZhengWenXian } from "./CharacterClass/ZhengWenXian";
import { XuanQingZi } from "./CharacterClass/XuanQingZi";
import { GuiJiao } from "./CharacterClass/GuiJiao";
import { ShaoXiu } from "./CharacterClass/ShaoXiu";
import { JinShengHuo } from "./CharacterClass/JinShengHuo";
import { BaiFeiFei } from "./CharacterClass/BaiFeiFei";
import { DuanMuJing } from "./CharacterClass/DuanMuJing";
import { WangFuGui } from "./CharacterClass/WangFuGui";
import { LaoHan } from "./CharacterClass/LaoHan";
import { BaiXiaoNian } from "./CharacterClass/BaiXiaoNian";
import { LaoBie } from "./CharacterClass/LaoBie";
import { XiaoJiu } from "./CharacterClass/XiaoJiu";
import { BaiKunShan } from "./CharacterClass/BaiKunShan";
import { ShangYu } from "./CharacterClass/ShangYu";
import { CharacterPanting } from "../../UI/Game/Character/CharacterPanting";

const charactersMap: { [index: number]: { new (option?: any): Character } } = {};
charactersMap[0] = UnknownCharacter;
charactersMap[1] = WuZhiGuo;
charactersMap[2] = ChengXiaoDie;
charactersMap[3] = LianYuan;
charactersMap[4] = MaoBuBa;
charactersMap[5] = ZhangYiTing;
charactersMap[6] = BaiCangLang;
charactersMap[7] = FeiYuanLongChuan;
charactersMap[8] = PeiLing;
charactersMap[9] = HuangJiRen;
charactersMap[10] = WangTianXiang;
charactersMap[11] = LiXing;
charactersMap[12] = WangKui;
charactersMap[13] = AFuLuoLa;
charactersMap[14] = HanMei;
charactersMap[15] = ZhengWenXian;
charactersMap[16] = XuanQingZi;
charactersMap[17] = GuiJiao;
charactersMap[18] = ShaoXiu;
charactersMap[19] = JinShengHuo;
charactersMap[20] = GuXiaoMeng;
charactersMap[21] = BaiFeiFei;
charactersMap[22] = DuanMuJing;
charactersMap[23] = WangFuGui;
charactersMap[24] = LaoHan;
charactersMap[25] = BaiXiaoNian;
charactersMap[26] = LaoBie;
charactersMap[27] = XiaoJiu;
charactersMap[28] = LiNingYu;
charactersMap[29] = BaiKunShan;
charactersMap[30] = ShangYu;
charactersMap[1020] = GuXiaoMengSP;
charactersMap[1028] = LiNingYuSP;

export function createCharacterById(id: CharacterType, UI?: CharacterPanting): Character {
  if (charactersMap[id]) {
    return new charactersMap[id](UI);
  } else {
    return new charactersMap[0](UI);
  }
}
