import EventTarget from "../Event/EventTarget";
import { error_code } from "../../Protobuf/proto.js";
import { NetworkEvent, SystemEvent } from "../Event/types";
import { _decorator, Component, director } from "cc";

const Protos = {};

//error
Protos[NetworkEvent.ERROR_CODE_TOC] = (data) => {
  switch (data.code) {
    case error_code.client_version_not_match:
      console.log(`客户端版本号不匹配,服务器版本号为${data.int_params[0]}`);
      break;
    case error_code.no_more_room:
      console.log("没有更多的房间了");
      break;
    case error_code.record_not_exists:
      console.log("录像不存在");
      break;
    case error_code.load_record_failed:
      console.log("读取录像失败");
      break;
    case error_code.record_version_not_match:
      console.log(`录像的版本号不匹配,服务器版本号为${data.int_params[0]}`);
      break;
    case error_code.name_too_long:
      console.log("玩家名字过长");
      break;
    case error_code.join_room_too_fast:
      console.log("加入房间的请求太快");
      break;
    case error_code.robot_not_allowed:
      console.log("禁止添加机器人");
      break;
    case error_code.already_online:
      console.log("你已经在线，不能重复登录");
      break;
    case error_code.no_color_message_card:
      console.log("场上没有这种颜色的情报");
      break;
    case error_code.login_failed:
      console.log("登录失败");
      break;
    default:
      console.log("未知错误");
  }
};

//fengsheng
Protos[NetworkEvent.PAUSE_RECORD_TOC] = (data) => {};
Protos[NetworkEvent.GET_RECORD_LIST_TOC] = (data) => {};
Protos[NetworkEvent.ADD_ORDER_TOC] = (data) => {
  EventTarget.emit("add_one_position_toc", data);
};
Protos[NetworkEvent.GET_ORDERS_TOC] = (data) => {};
Protos[NetworkEvent.HEART_TOC] = (data) => {};
Protos[NetworkEvent.ADD_ONE_POSITION_TOC] = (data) => {};
Protos[NetworkEvent.REMOVE_ONE_POSITION_TOC] = (data) => {
  EventTarget.emit("remove_one_position_toc", data);
};
Protos[NetworkEvent.DISPLAY_RECORD_END_TOC] = (data) => {};
Protos[NetworkEvent.SAVE_RECORD_SUCCESS_TOC] = (data) => {};
Protos[NetworkEvent.GET_ROOM_INFO_TOC] = (data) => {
  director.loadScene("room", (e) => {
    EventTarget.emit("get_room_info_toc", data);
  });
};
Protos[NetworkEvent.JOIN_ROOM_TOC] = (data) => {
  EventTarget.emit("join_room_toc", data);
};
Protos[NetworkEvent.LEAVE_ROOM_TOC] = (data) => {
  EventTarget.emit("leave_room_toc", data);
};
Protos[NetworkEvent.WAIT_FOR_SELECT_ROLE_TOC] = (data) => {};
Protos[NetworkEvent.AUTO_PLAY_TOC] = (data) => {};
Protos[NetworkEvent.SELECT_ROLE_TOC] = (data) => {};
Protos[NetworkEvent.INIT_TOC] = (data) => {
  director.loadScene("game", (e) => {
    EventTarget.emit("init_toc", data);
  });
};
Protos[NetworkEvent.NOTIFY_ROLE_UPDATE_TOC] = (data) => {};
Protos[NetworkEvent.ADD_CARD_TOC] = (data) => {};
Protos[NetworkEvent.USE_SHI_TAN_TOC] = (data) => {};
Protos[NetworkEvent.SHOW_SHI_TAN_TOC] = (data) => {};
Protos[NetworkEvent.EXECUTE_SHI_TAN_TOC] = (data) => {};
Protos[NetworkEvent.SYNC_DECK_NUM_TOC] = (data) => {};
Protos[NetworkEvent.DISCARD_CARD_TOC] = (data) => {};
Protos[NetworkEvent.NOTIFY_PHASE_TOC] = (data) => {};
Protos[NetworkEvent.USE_LI_YOU_TOC] = (data) => {};
Protos[NetworkEvent.USE_PING_HENG_TOC] = (data) => {};
Protos[NetworkEvent.WEI_BI_WAIT_FOR_GIVE_CARD_TOC] = (data) => {};
Protos[NetworkEvent.WEI_BI_GIVE_CARD_TOC] = (data) => {};
Protos[NetworkEvent.WEI_BI_SHOW_HAND_CARD_TOC] = (data) => {};
Protos[NetworkEvent.USE_CHENG_QING_TOC] = (data) => {};
Protos[NetworkEvent.SEND_MESSAGE_CARD_TOC] = (data) => {};
Protos[NetworkEvent.CHOOSE_RECEIVE_TOC] = (data) => {};
Protos[NetworkEvent.NOTIFY_DYING_TOC] = (data) => {};
Protos[NetworkEvent.NOTIFY_DIE_TOC] = (data) => {};
Protos[NetworkEvent.NOTIFY_WINNER_TOC] = (data) => {};
Protos[NetworkEvent.WAIT_FOR_CHENG_QING_TOC] = (data) => {};
Protos[NetworkEvent.WAIT_FOR_DIE_GIVE_CARD_TOC] = (data) => {};
Protos[NetworkEvent.NOTIFY_DIE_GIVE_CARD_TOC] = (data) => {};
Protos[NetworkEvent.USE_PO_YI_TOC] = (data) => {};
Protos[NetworkEvent.PO_YI_SHOW_TOC] = (data) => {};
Protos[NetworkEvent.USE_JIE_HUO_TOC] = (data) => {};
Protos[NetworkEvent.USE_DIAO_BAO_TOC] = (data) => {};
Protos[NetworkEvent.USE_WU_DAO_TOC] = (data) => {};
Protos[NetworkEvent.USE_FENG_YUN_BIAN_HUAN_TOC] = (data) => {};
Protos[NetworkEvent.WAIT_FOR_FENG_YUN_BIAN_HUAN_CHOOSE_CARD_TOC] = (data) => {};
Protos[NetworkEvent.FENG_YUN_BIAN_HUAN_CHOOSE_CARD_TOC] = (data) => {};

//role

//毛不拔【奇货可居】
Protos[NetworkEvent.SKILL_QI_HUO_KE_JU_TOC] = (data) => {};

//肥原龙川【诡诈】
Protos[NetworkEvent.SKILL_GUI_ZHA_TOC] = (data) => {};

//王魁【以牙还牙】
Protos[NetworkEvent.SKILL_YI_YA_HUAN_YA_TOC] = (data) => {};

//韩梅【移花接木】
Protos[NetworkEvent.SKILL_YI_HUA_JIE_MU_TOC] = (data) => {};

//鄭文先
//【偷天】
Protos[NetworkEvent.SKILL_TOU_TIAN_TOC] = (data) => {};
//【换日】
Protos[NetworkEvent.SKILL_HUAN_RI_TOC] = (data) => {};

//鬼脚【急送】
Protos[NetworkEvent.SKILL_JI_SONG_TOC] = (data) => {};

//邵秀【绵里藏针】
Protos[NetworkEvent.SKILL_MIAN_LI_CANG_ZHEN_TOC] = (data) => {};

//金生火【谨慎】
Protos[NetworkEvent.SKILL_JIN_SHEN_TOC] = (data) => {};

//白菲菲【怜悯】
Protos[NetworkEvent.SKILL_LIAN_MIN_TOC] = (data) => {};

//广播使用【腹黑】
Protos[NetworkEvent.SKILL_FU_HEI_TOC] = (data) => {};

//端木静【新思潮】
Protos[NetworkEvent.SKILL_XIN_SI_CHAO_TOC] = (data) => {};

//【视死】
Protos[NetworkEvent.SKILL_SHI_SI_TOC] = (data) => {};

//老汉【如归】
Protos[NetworkEvent.SKILL_WAIT_FOR_RU_GUI_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_RU_GUI_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_WAIT_FOR_ZHUAN_JIAO_TOC] = (data) => {};

//白小年【转交】
Protos[NetworkEvent.SKILL_ZHUAN_JIAO_TOC] = (data) => {};
//【明饵】
Protos[NetworkEvent.SKILL_MING_ER_TOC] = (data) => {};

//顾小梦
//【集智】
Protos[NetworkEvent.SKILL_JI_ZHI_TOC] = (data) => {};
//【承志】
Protos[NetworkEvent.SKILL_WAIT_FOR_CHENG_ZHI_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_CHENG_ZHI_TOC] = (data) => {};

//【就计】
Protos[NetworkEvent.SKILL_JIU_JI_A_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_JIU_JI_B_TOC] = (data) => {};

//【城府】
Protos[NetworkEvent.SKILL_CHENG_FU_TOC] = (data) => {};

//李宁玉【遗信】
Protos[NetworkEvent.SKILL_WAIT_FOR_YI_XIN_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_YI_XIN_TOC] = (data) => {};

//【知音】
Protos[NetworkEvent.SKILL_ZHI_YIN_TOC] = (data) => {};

//程小蝶【惊梦】
Protos[NetworkEvent.SKILL_JING_MENG_A_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_JING_MENG_B_TOC] = (data) => {};

//商玉【借刀杀人】
Protos[NetworkEvent.SKILL_JIE_DAO_SHA_REN_A_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_JIE_DAO_SHA_REN_B_TOC] = (data) => {};

//裴玲【交际】
Protos[NetworkEvent.SKILL_JIAO_JI_A_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_JIAO_JI_B_TOC] = (data) => {};

//连鸢【妙笔巧辩】
Protos[NetworkEvent.SKILL_MIAO_BI_QIAO_BIAN_A_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_MIAO_BI_QIAO_BIAN_B_TOC] = (data) => {};

//王田香【禁闭】
Protos[NetworkEvent.SKILL_JIN_BI_A_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_JIN_BI_B_TOC] = (data) => {};

//阿芙罗拉【妙手】
Protos[NetworkEvent.SKILL_MIAO_SHOU_A_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_MIAO_SHOU_B_TOC] = (data) => {};

//玄青子【金口一开】
Protos[NetworkEvent.SKILL_JIN_KOU_YI_KAI_A_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_JIN_KOU_YI_KAI_B_TOC] = (data) => {};

// 王富贵【江湖令】
Protos[NetworkEvent.SKILL_WAIT_FOR_JIANG_HU_LING_A_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_JIANG_HU_LING_A_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_WAIT_FOR_JIANG_HU_LING_B_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_JIANG_HU_LING_B_TOC] = (data) => {};

//SP顾小梦【羁绊】
Protos[NetworkEvent.SKILL_JI_BAN_A_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_JI_BAN_B_TOC] = (data) => {};

//【诱导】
Protos[NetworkEvent.SKILL_YOU_DAO_TOC] = (data) => {};

//白沧浪【博爱】
Protos[NetworkEvent.SKILL_BO_AI_A_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_BO_AI_B_TOC] = (data) => {};

//小九【广发报】
Protos[NetworkEvent.SKILL_GUANG_FA_BAO_A_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_WAIT_FOR_GUANG_FA_BAO_B_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_GUANG_FA_BAO_B_TOC] = (data) => {};

//【强令】
Protos[NetworkEvent.SKILL_WAIT_FOR_QIANG_LING_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_QIANG_LING_TOC] = (data) => {};

//吴志国【坚韧】
Protos[NetworkEvent.SKILL_JIAN_REN_A_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_JIAN_REN_B_TOC] = (data) => {};

//李醒【搜辑】
Protos[NetworkEvent.SKILL_SOU_JI_A_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_SOU_JI_B_TOC] = (data) => {};

//黄济仁【对症下药】
Protos[NetworkEvent.SKILL_DUI_ZHENG_XIA_YAO_A_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_DUI_ZHENG_XIA_YAO_B_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_DUI_ZHENG_XIA_YAO_C_TOC] = (data) => {};

//白昆山【毒计】
Protos[NetworkEvent.SKILL_DU_JI_A_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_WAIT_FOR_DU_JI_B_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_DU_JI_B_TOC] = (data) => {};
Protos[NetworkEvent.SKILL_DU_JI_C_TOC] = (data) => {};

export default Protos;
