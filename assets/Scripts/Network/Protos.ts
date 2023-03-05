import EventTarget from "../Event/EventTarget";
import { error_code } from "../../Protobuf/proto.js";
import { _decorator, Component, director } from "cc";

const Protos = {
  //error
  error_code_toc(data) {
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
  },

  //fengsheng
  pause_record_toc() {},
  get_record_list_toc() {},
  add_order_toc() {},
  get_orders_toc() {},
  heart_toc() {},
  add_one_position_toc(data) {
    EventTarget.emit("add_one_position_toc", data);
  },
  remove_one_position_toc(data) {
    EventTarget.emit("remove_one_position_toc", data);
  },
  display_record_end_toc() {},
  save_record_success_toc() {},
  get_room_info_toc(data) {
    director.loadScene("room", (e) => {
      EventTarget.emit("get_room_info_toc", data);
    });
  },
  join_room_toc(data) {
    EventTarget.emit("join_room_toc", data);
  },
  leave_room_toc(data) {
    EventTarget.emit("leave_room_toc", data);
  },
  wait_for_select_role_toc() {},
  auto_play_toc() {},
  select_role_toc() {},
  init_toc(data) {
    director.loadScene("game", (e) => {
      EventTarget.emit("init_toc", data);
    });
  },
  notify_role_update_toc() {},
  add_card_toc() {},
  use_shi_tan_toc() {},
  show_shi_tan_toc() {},
  execute_shi_tan_toc() {},
  sync_deck_num_toc() {},
  discard_card_toc() {},
  notify_phase_toc() {},
  use_li_you_toc() {},
  use_ping_heng_toc() {},
  wei_bi_wait_for_give_card_toc() {},
  wei_bi_give_card_toc() {},
  wei_bi_show_hand_card_toc() {},
  use_cheng_qing_toc() {},
  send_message_card_toc() {},
  choose_receive_toc() {},
  notify_dying_toc() {},
  notify_die_toc() {},
  notify_winner_toc() {},
  wait_for_cheng_qing_toc() {},
  wait_for_die_give_card_toc() {},
  notify_die_give_card_toc() {},
  use_po_yi_toc() {},
  po_yi_show_toc() {},
  use_jie_huo_toc() {},
  use_diao_bao_toc() {},
  use_wu_dao_toc() {},
  use_feng_yun_bian_huan_toc() {},
  wait_for_feng_yun_bian_huan_choose_card_toc() {},
  feng_yun_bian_huan_choose_card_toc() {},

  //role

  //毛不拔【奇货可居】
  skill_qi_huo_ke_ju_toc() {},

  //肥原龙川【诡诈】
  skill_gui_zha_toc() {},

  //王魁【以牙还牙】
  skill_yi_ya_huan_ya_toc() {},

  //韩梅【移花接木】
  skill_yi_hua_jie_mu_toc() {},

  //鄭文先
  //【偷天】
  skill_tou_tian_toc() {},
  //【换日】
  skill_huan_ri_toc() {},

  //鬼脚【急送】
  skill_ji_song_toc() {},

  //邵秀【绵里藏针】
  skill_mian_li_cang_zhen_toc() {},

  //金生火【谨慎】
  skill_jin_shen_toc() {},

  //白菲菲【怜悯】
  skill_lian_min_toc() {},

  //广播使用【腹黑】
  skill_fu_hei_toc() {},

  //端木静【新思潮】
  skill_xin_si_chao_toc() {},

  //【视死】
  skill_shi_si_toc() {},

  //老汉【如归】
  skill_wait_for_ru_gui_toc() {},
  skill_ru_gui_toc() {},
  skill_wait_for_zhuan_jiao_toc() {},

  //白小年【转交】
  skill_zhuan_jiao_toc() {},
  //【明饵】
  skill_ming_er_toc() {},

  //顾小梦
  //【集智】
  skill_ji_zhi_toc() {},
  //【承志】
  skill_wait_for_cheng_zhi_toc() {},
  skill_cheng_zhi_toc() {},

  //【就计】
  skill_jiu_ji_a_toc() {},
  skill_jiu_ji_b_toc() {},

  //【城府】
  skill_cheng_fu_toc() {},

  //李宁玉【遗信】
  skill_wait_for_yi_xin_toc() {},
  skill_yi_xin_toc() {},

  //【知音】
  skill_zhi_yin_toc() {},

  //程小蝶【惊梦】
  skill_jing_meng_a_toc() {},
  skill_jing_meng_b_toc() {},

  //商玉【借刀杀人】
  skill_jie_dao_sha_ren_a_toc() {},
  skill_jie_dao_sha_ren_b_toc() {},

  //裴玲【交际】
  skill_jiao_ji_a_toc() {},
  skill_jiao_ji_b_toc() {},

  //连鸢【妙笔巧辩】
  skill_miao_bi_qiao_bian_a_toc() {},
  skill_miao_bi_qiao_bian_b_toc() {},

  //王田香【禁闭】
  skill_jin_bi_a_toc() {},
  skill_jin_bi_b_toc() {},

  //阿芙罗拉【妙手】
  skill_miao_shou_a_toc() {},
  skill_miao_shou_b_toc() {},

  //玄青子【金口一开】
  skill_jin_kou_yi_kai_a_toc() {},
  skill_jin_kou_yi_kai_b_toc() {},

  // 王富贵【江湖令】
  skill_wait_for_jiang_hu_ling_a_toc() {},
  skill_jiang_hu_ling_a_toc() {},
  skill_wait_for_jiang_hu_ling_b_toc() {},
  skill_jiang_hu_ling_b_toc() {},

  //SP顾小梦【羁绊】
  skill_ji_ban_a_toc() {},
  skill_ji_ban_b_toc() {},

  //【诱导】
  skill_you_dao_toc() {},

  //白沧浪【博爱】
  skill_bo_ai_a_toc() {},
  skill_bo_ai_b_toc() {},

  //小九【广发报】
  skill_guang_fa_bao_a_toc() {},
  skill_wait_for_guang_fa_bao_b_toc() {},
  skill_guang_fa_bao_b_toc() {},

  //【强令】
  skill_wait_for_qiang_ling_toc() {},
  skill_qiang_ling_toc() {},

  //吴志国【坚韧】
  skill_jian_ren_a_toc() {},
  skill_jian_ren_b_toc() {},

  //李醒【搜辑】
  skill_sou_ji_a_toc() {},
  skill_sou_ji_b_toc() {},

  //黄济仁【对症下药】
  skill_dui_zheng_xia_yao_a_toc() {},
  skill_dui_zheng_xia_yao_b_toc() {},
  skill_dui_zheng_xia_yao_c_toc() {},

  //白昆山【毒计】
  skill_du_ji_a_toc() {},
  skill_wait_for_du_ji_b_toc() {},
  skill_du_ji_b_toc() {},
  skill_du_ji_c_toc() {},
};
export default Protos;
