import { CharacterObject } from "./CharacterObject";

export const enum CharacterType {
  UNKNOWN = 0, // 未知角色
  WU_ZHI_GUO = 1, // 吴志国
  CHENG_XIAO_DIE = 2, // 程小蝶
  LIAN_YUAN = 3, // 连鸢
  MAO_BU_BA = 4, // 毛不拔
  ZHANG_YI_TING = 5, // 张一挺
  BAI_CANG_LANG = 6, // 白沧浪
  FEI_YUAN_LONG_CHUAN = 7, // 肥原龙川
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
  MA_LI_YA = 31, // 玛利亚
  QIAN_MIN = 32, // 钱敏
  CHI_JING_HAI = 33, // 池镜海
  QIN_YUAN_YUAN = 34, // 秦圆圆
  SHENG_LAO_BAN = 35, // 盛老板
  GAO_QIAO_ZHI_ZI = 36, // 高桥智子
  JIAN_XIAN_SHENG = 37, // 简先生
  LAO_HU = 38, // 老虎
  SU_JI_YUAN = 39, // 速记员
  YA_PAO = 40, // 哑炮
  LAO_QIAN = 41, // 老千
  SP_CHENG_XIAO_DIE = 1002, // SP程小蝶
  SP_LIAN_YUAN = 1003, // SP连鸢
  SP_HAN_MEI = 1014, // SP韩梅
  SP_GU_XIAO_MENG = 1020, // SP顾小梦
  SP_DUAN_MU_JING = 1022, // SP端木静
  SP_XIAO_JIU = 1027, // SP小九
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
  gameObject?: CharacterObject;
}
