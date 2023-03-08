import EventTarget from "../Event/EventTarget";
import { error_code } from "../../Protobuf/proto.d";
import { NetworkEventToC, ProcessEvent } from "../Event/types";
import { _decorator, Component, director } from "cc";

//toc
const Protos = {};

//error
Protos[NetworkEventToC.ERROR_CODE_TOC] = (data) => {
  let error_message;
  switch (data.code) {
    case error_code.client_version_not_match:
      error_message = `客户端版本号不匹配,服务器版本号为${data.int_params[0]}`;
      break;
    case error_code.no_more_room:
      error_message = "没有更多的房间了";
      break;
    case error_code.record_not_exists:
      error_message = "录像不存在";
      break;
    case error_code.load_record_failed:
      error_message = "读取录像失败";
      break;
    case error_code.record_version_not_match:
      error_message = `录像的版本号不匹配,服务器版本号为${data.int_params[0]}`;
      break;
    case error_code.name_too_long:
      error_message = "玩家名字过长";
      break;
    case error_code.join_room_too_fast:
      error_message = "加入房间的请求太快";
      break;
    case error_code.robot_not_allowed:
      error_message = "禁止添加机器人";
      break;
    case error_code.already_online:
      error_message = "你已经在线，不能重复登录";
      break;
    case error_code.no_color_message_card:
      error_message = "场上没有这种颜色的情报";
      break;
    case error_code.login_failed:
      error_message = "密码错误";
      break;
    default:
      error_message = "未知错误";
  }
  console.log(error_message);
  EventTarget.emit(ProcessEvent.NETWORK_ERROR, { code: data.code, msg: error_message });
};

//fengsheng
Protos[NetworkEventToC.PAUSE_RECORD_TOC] = (data) => {};
Protos[NetworkEventToC.GET_RECORD_LIST_TOC] = (data) => {};
Protos[NetworkEventToC.ADD_ORDER_TOC] = (data) => {};
Protos[NetworkEventToC.GET_ORDERS_TOC] = (data) => {};
Protos[NetworkEventToC.HEART_TOC] = (data) => {};
Protos[NetworkEventToC.ADD_ONE_POSITION_TOC] = (data) => {
  EventTarget.emit(ProcessEvent.ADD_ROOM_POSITION, data);
};
Protos[NetworkEventToC.REMOVE_ONE_POSITION_TOC] = (data) => {
  EventTarget.emit(ProcessEvent.REMOVE_ROOM_POSITION, data);
};
Protos[NetworkEventToC.DISPLAY_RECORD_END_TOC] = (data) => {};
Protos[NetworkEventToC.SAVE_RECORD_SUCCESS_TOC] = (data) => {};
Protos[NetworkEventToC.GET_ROOM_INFO_TOC] = (data) => {
  director.loadScene("room", (e) => {
    EventTarget.emit(ProcessEvent.CREATE_ROOM, data);
  });
};
Protos[NetworkEventToC.JOIN_ROOM_TOC] = (data) => {
  EventTarget.emit(ProcessEvent.JOIN_ROOM, data);
};
Protos[NetworkEventToC.LEAVE_ROOM_TOC] = (data) => {
  EventTarget.emit(ProcessEvent.LEAVE_ROOM, data);
};
Protos[NetworkEventToC.WAIT_FOR_SELECT_ROLE_TOC] = (data) => {
  director.loadScene("game", (e) => {
    EventTarget.emit(ProcessEvent.START_SELECT_CHARACTER);
  });
};
Protos[NetworkEventToC.AUTO_PLAY_TOC] = (data) => {};
Protos[NetworkEventToC.SELECT_ROLE_TOC] = (data) => {};
Protos[NetworkEventToC.INIT_TOC] = (data) => {
  EventTarget.emit(ProcessEvent.INIT_GAME, data);
};
Protos[NetworkEventToC.NOTIFY_ROLE_UPDATE_TOC] = (data) => {};
Protos[NetworkEventToC.ADD_CARD_TOC] = (data) => {};
Protos[NetworkEventToC.USE_SHI_TAN_TOC] = (data) => {};
Protos[NetworkEventToC.SHOW_SHI_TAN_TOC] = (data) => {};
Protos[NetworkEventToC.EXECUTE_SHI_TAN_TOC] = (data) => {};
Protos[NetworkEventToC.SYNC_DECK_NUM_TOC] = (data) => {};
Protos[NetworkEventToC.DISCARD_CARD_TOC] = (data) => {};
Protos[NetworkEventToC.NOTIFY_PHASE_TOC] = (data) => {};
Protos[NetworkEventToC.USE_LI_YOU_TOC] = (data) => {};
Protos[NetworkEventToC.USE_PING_HENG_TOC] = (data) => {};
Protos[NetworkEventToC.WEI_BI_WAIT_FOR_GIVE_CARD_TOC] = (data) => {};
Protos[NetworkEventToC.WEI_BI_GIVE_CARD_TOC] = (data) => {};
Protos[NetworkEventToC.WEI_BI_SHOW_HAND_CARD_TOC] = (data) => {};
Protos[NetworkEventToC.USE_CHENG_QING_TOC] = (data) => {};
Protos[NetworkEventToC.SEND_MESSAGE_CARD_TOC] = (data) => {};
Protos[NetworkEventToC.CHOOSE_RECEIVE_TOC] = (data) => {};
Protos[NetworkEventToC.NOTIFY_DYING_TOC] = (data) => {};
Protos[NetworkEventToC.NOTIFY_DIE_TOC] = (data) => {};
Protos[NetworkEventToC.NOTIFY_WINNER_TOC] = (data) => {};
Protos[NetworkEventToC.WAIT_FOR_CHENG_QING_TOC] = (data) => {};
Protos[NetworkEventToC.WAIT_FOR_DIE_GIVE_CARD_TOC] = (data) => {};
Protos[NetworkEventToC.NOTIFY_DIE_GIVE_CARD_TOC] = (data) => {};
Protos[NetworkEventToC.USE_PO_YI_TOC] = (data) => {};
Protos[NetworkEventToC.PO_YI_SHOW_TOC] = (data) => {};
Protos[NetworkEventToC.USE_JIE_HUO_TOC] = (data) => {};
Protos[NetworkEventToC.USE_DIAO_BAO_TOC] = (data) => {};
Protos[NetworkEventToC.USE_WU_DAO_TOC] = (data) => {};
Protos[NetworkEventToC.USE_FENG_YUN_BIAN_HUAN_TOC] = (data) => {};
Protos[NetworkEventToC.WAIT_FOR_FENG_YUN_BIAN_HUAN_CHOOSE_CARD_TOC] = (data) => {};
Protos[NetworkEventToC.FENG_YUN_BIAN_HUAN_CHOOSE_CARD_TOC] = (data) => {};

//role

//毛不拔【奇货可居】
Protos[NetworkEventToC.SKILL_QI_HUO_KE_JU_TOC] = (data) => {};

//肥原龙川【诡诈】
Protos[NetworkEventToC.SKILL_GUI_ZHA_TOC] = (data) => {};

//王魁【以牙还牙】
Protos[NetworkEventToC.SKILL_YI_YA_HUAN_YA_TOC] = (data) => {};

//韩梅【移花接木】
Protos[NetworkEventToC.SKILL_YI_HUA_JIE_MU_TOC] = (data) => {};

//鄭文先
//【偷天】
Protos[NetworkEventToC.SKILL_TOU_TIAN_TOC] = (data) => {};
//【换日】
Protos[NetworkEventToC.SKILL_HUAN_RI_TOC] = (data) => {};

//鬼脚【急送】
Protos[NetworkEventToC.SKILL_JI_SONG_TOC] = (data) => {};

//邵秀【绵里藏针】
Protos[NetworkEventToC.SKILL_MIAN_LI_CANG_ZHEN_TOC] = (data) => {};

//金生火【谨慎】
Protos[NetworkEventToC.SKILL_JIN_SHEN_TOC] = (data) => {};

//白菲菲【怜悯】
Protos[NetworkEventToC.SKILL_LIAN_MIN_TOC] = (data) => {};

//广播使用【腹黑】
Protos[NetworkEventToC.SKILL_FU_HEI_TOC] = (data) => {};

//端木静【新思潮】
Protos[NetworkEventToC.SKILL_XIN_SI_CHAO_TOC] = (data) => {};

//【视死】
Protos[NetworkEventToC.SKILL_SHI_SI_TOC] = (data) => {};

//老汉【如归】
Protos[NetworkEventToC.SKILL_WAIT_FOR_RU_GUI_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_RU_GUI_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_WAIT_FOR_ZHUAN_JIAO_TOC] = (data) => {};

//白小年【转交】
Protos[NetworkEventToC.SKILL_ZHUAN_JIAO_TOC] = (data) => {};
//【明饵】
Protos[NetworkEventToC.SKILL_MING_ER_TOC] = (data) => {};

//顾小梦
//【集智】
Protos[NetworkEventToC.SKILL_JI_ZHI_TOC] = (data) => {};
//【承志】
Protos[NetworkEventToC.SKILL_WAIT_FOR_CHENG_ZHI_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_CHENG_ZHI_TOC] = (data) => {};

//【就计】
Protos[NetworkEventToC.SKILL_JIU_JI_A_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_JIU_JI_B_TOC] = (data) => {};

//【城府】
Protos[NetworkEventToC.SKILL_CHENG_FU_TOC] = (data) => {};

//李宁玉【遗信】
Protos[NetworkEventToC.SKILL_WAIT_FOR_YI_XIN_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_YI_XIN_TOC] = (data) => {};

//【知音】
Protos[NetworkEventToC.SKILL_ZHI_YIN_TOC] = (data) => {};

//程小蝶【惊梦】
Protos[NetworkEventToC.SKILL_JING_MENG_A_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_JING_MENG_B_TOC] = (data) => {};

//商玉【借刀杀人】
Protos[NetworkEventToC.SKILL_JIE_DAO_SHA_REN_A_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_JIE_DAO_SHA_REN_B_TOC] = (data) => {};

//裴玲【交际】
Protos[NetworkEventToC.SKILL_JIAO_JI_A_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_JIAO_JI_B_TOC] = (data) => {};

//连鸢【妙笔巧辩】
Protos[NetworkEventToC.SKILL_MIAO_BI_QIAO_BIAN_A_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_MIAO_BI_QIAO_BIAN_B_TOC] = (data) => {};

//王田香【禁闭】
Protos[NetworkEventToC.SKILL_JIN_BI_A_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_JIN_BI_B_TOC] = (data) => {};

//阿芙罗拉【妙手】
Protos[NetworkEventToC.SKILL_MIAO_SHOU_A_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_MIAO_SHOU_B_TOC] = (data) => {};

//玄青子【金口一开】
Protos[NetworkEventToC.SKILL_JIN_KOU_YI_KAI_A_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_JIN_KOU_YI_KAI_B_TOC] = (data) => {};

// 王富贵【江湖令】
Protos[NetworkEventToC.SKILL_WAIT_FOR_JIANG_HU_LING_A_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_JIANG_HU_LING_A_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_WAIT_FOR_JIANG_HU_LING_B_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_JIANG_HU_LING_B_TOC] = (data) => {};

//SP顾小梦【羁绊】
Protos[NetworkEventToC.SKILL_JI_BAN_A_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_JI_BAN_B_TOC] = (data) => {};

//【诱导】
Protos[NetworkEventToC.SKILL_YOU_DAO_TOC] = (data) => {};

//白沧浪【博爱】
Protos[NetworkEventToC.SKILL_BO_AI_A_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_BO_AI_B_TOC] = (data) => {};

//小九【广发报】
Protos[NetworkEventToC.SKILL_GUANG_FA_BAO_A_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_WAIT_FOR_GUANG_FA_BAO_B_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_GUANG_FA_BAO_B_TOC] = (data) => {};

//【强令】
Protos[NetworkEventToC.SKILL_WAIT_FOR_QIANG_LING_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_QIANG_LING_TOC] = (data) => {};

//吴志国【坚韧】
Protos[NetworkEventToC.SKILL_JIAN_REN_A_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_JIAN_REN_B_TOC] = (data) => {};

//李醒【搜辑】
Protos[NetworkEventToC.SKILL_SOU_JI_A_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_SOU_JI_B_TOC] = (data) => {};

//黄济仁【对症下药】
Protos[NetworkEventToC.SKILL_DUI_ZHENG_XIA_YAO_A_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_DUI_ZHENG_XIA_YAO_B_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_DUI_ZHENG_XIA_YAO_C_TOC] = (data) => {};

//白昆山【毒计】
Protos[NetworkEventToC.SKILL_DU_JI_A_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_WAIT_FOR_DU_JI_B_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_DU_JI_B_TOC] = (data) => {};
Protos[NetworkEventToC.SKILL_DU_JI_C_TOC] = (data) => {};

export default Protos;
