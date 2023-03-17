import { CharacterObject } from "../../Game/Character/CharacterObject";
import { Skill } from "../Skill/Skill";

export const enum CharacterType {
  UNKNOWN = 0, // 未知角色
  WU_ZHI_GUO = 1, // 吴志国
  CHENG_XIAO_DIE = 2, // 程小蝶
  LIAN_YUAN = 3, // 连鸢
  MAO_BU_BA = 4, // 毛不拔
  ZHANG_YI_TING = 5, // 张一挺
  BAI_CANG_LANG = 6, // 白沧浪
  FEI_YUAN_LONG_CHUAN = 7, // 肥圆龙川
  PEI_LING = 8, // 裴玲
  HUANG_JI_REN = 9, // 黄济仁
  WANG_TIAN_XIANG = 10, // 王田香
  LI_XING = 11, // 李醒
  WANG_KUI = 12, // 王魁
  A_FU_LUO_LA = 13, // 阿芙罗拉
  HAN_MEI = 14, // 韩梅
  ZHENG_WEN_XIAN = 15, // 鄭文先
  XUAN_QING_ZI = 16, // 玄青子
  GUI_JIAO = 17, // 鬼脚
  SHAO_XIU = 18, // 邵秀
  JIN_SHENG_HUO = 19, // 金生火
  GU_XIAO_MENG = 20, // 顾小梦
  BAI_FEI_FEI = 21, // 白菲菲
  DUAN_MU_JING = 22, // 端木静
  WANG_FU_GUI = 23, // 王富贵
  LAO_HAN = 24, // 老汉
  BAI_XIAO_NIAN = 25, // 白小年
  LAO_BIE = 26, // 老鳖
  XIAO_JIU = 27, // 小九
  LI_NING_YU = 28, // 李宁玉
  BAI_KUN_SHAN = 29, // 白昆山
  SHANG_YU = 30, // 商玉
  SP_GU_XIAO_MENG = 1020, // SP顾小梦
  SP_LI_NING_YU = 1028, // SP李宁玉
}

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
  skills: Skill[];
  gameObject?: CharacterObject;
}
