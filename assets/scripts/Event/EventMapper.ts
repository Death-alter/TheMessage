import { NetworkEventCenter, ProcessEventCenter } from "./EventTarget";
import * as ProtobufType from "../../protobuf/proto.d";
import { NetworkEventToC, ProcessEvent } from "./type";
import { _decorator, director } from "cc";
import { CardType } from "../Game/Card/type";
import { WaitingType } from "../GameManager/type";

//把网络协议映射为程序事件

export class EventMapper {
  public static init() {
    //error
    NetworkEventCenter.on(NetworkEventToC.ERROR_CODE_TOC, (data: ProtobufType.error_code_toc) => {
      let error_message;
      switch (data.code) {
        case ProtobufType.error_code.client_version_not_match:
          error_message = `客户端版本号不匹配,服务器版本号为${data.intParams[0]}`;
          break;
        case ProtobufType.error_code.no_more_room:
          error_message = "没有更多的房间了";
          break;
        case ProtobufType.error_code.record_not_exists:
          error_message = "录像不存在";
          break;
        case ProtobufType.error_code.load_record_failed:
          error_message = "读取录像失败";
          break;
        case ProtobufType.error_code.record_version_not_match:
          error_message = `录像的版本号不匹配,服务器版本号为${data.intParams[0]}`;
          break;
        case ProtobufType.error_code.name_too_long:
          error_message = "玩家名字过长";
          break;
        case ProtobufType.error_code.join_room_too_fast:
          error_message = "加入房间的请求太快";
          break;
        case ProtobufType.error_code.robot_not_allowed:
          error_message = "禁止添加机器人";
          break;
        case ProtobufType.error_code.already_online:
          error_message = "你已经在线，不能重复登录";
          break;
        case ProtobufType.error_code.no_color_message_card:
          error_message = "场上没有这种颜色的情报";
          break;
        case ProtobufType.error_code.login_failed:
          error_message = "密码错误";
          break;
        default:
          error_message = "未知错误";
      }
      console.log(error_message);
      ProcessEventCenter.emit(ProcessEvent.NETWORK_ERROR, { code: data.code, msg: error_message });
    });

    //流程
    NetworkEventCenter.on(NetworkEventToC.PAUSE_RECORD_TOC, (data: ProtobufType.pause_record_toc) => {
      ProcessEventCenter.emit(ProcessEvent.RECORD_STATUS_CHANGE, { paused: data.pause });
    });
    NetworkEventCenter.on(NetworkEventToC.GET_RECORD_LIST_TOC, (data: ProtobufType.get_record_list_toc) => {
      ProcessEventCenter.emit(ProcessEvent.GET_RECORD_LIST, { records: data.records });
    });
    NetworkEventCenter.on(NetworkEventToC.ADD_ORDER_TOC, () => {
      ProcessEventCenter.emit(ProcessEvent.ADD_ORDER_SUCCESS);
    });
    NetworkEventCenter.on(NetworkEventToC.GET_ORDERS_TOC, (data: ProtobufType.get_orders_toc) => {
      ProcessEventCenter.emit(ProcessEvent.GET_ORDERS, { orders: data.orders });
    });
    NetworkEventCenter.on(NetworkEventToC.HEART_TOC, (data: ProtobufType.heart_toc) => {
      ProcessEventCenter.emit(ProcessEvent.UPDATE_ONLINE_COUNT, { onlineCount: data.onlineCount });
    });
    NetworkEventCenter.on(NetworkEventToC.ADD_ONE_POSITION_TOC, () => {
      ProcessEventCenter.emit(ProcessEvent.ADD_ROOM_POSITION);
    });
    NetworkEventCenter.on(NetworkEventToC.REMOVE_ONE_POSITION_TOC, (data: ProtobufType.remove_one_position_toc) => {
      ProcessEventCenter.emit(ProcessEvent.REMOVE_ROOM_POSITION, { position: data.position });
    });
    NetworkEventCenter.on(NetworkEventToC.DISPLAY_RECORD_END_TOC, () => {
      ProcessEventCenter.emit(ProcessEvent.DISPLAY_RECORD_END);
    });
    NetworkEventCenter.on(NetworkEventToC.SAVE_RECORD_SUCCESS_TOC, (data: ProtobufType.save_record_success_toc) => {
      ProcessEventCenter.emit(ProcessEvent.SAVE_RECORD_SUCCESS, { recordId: data.recordId });
    });
    NetworkEventCenter.on(NetworkEventToC.GET_ROOM_INFO_TOC, (data: ProtobufType.get_room_info_toc) => {
      director.loadScene("room", (e) => {
        const players = [];
        for (let i = 0; i < data.names.length; i++) {
          players.push({
            id: i,
            name: data.names[i],
            winCount: data.winCounts[i],
          });
        }
        ProcessEventCenter.emit(ProcessEvent.CREATE_ROOM, {
          myPosition: data.myPosition,
          onlineCount: data.onlineCount,
          players,
        });
      });
    });
    NetworkEventCenter.on(NetworkEventToC.JOIN_ROOM_TOC, (data: ProtobufType.join_room_toc) => {
      ProcessEventCenter.emit(ProcessEvent.JOIN_ROOM, {
        name: data.name,
        position: data.position,
        winCount: data.winCount,
        gameCount: data.gameCount,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.LEAVE_ROOM_TOC, (data: ProtobufType.leave_room_toc) => {
      ProcessEventCenter.emit(ProcessEvent.LEAVE_ROOM, { position: data.position });
    });
    NetworkEventCenter.on(NetworkEventToC.WAIT_FOR_SELECT_ROLE_TOC, (data: ProtobufType.wait_for_select_role_toc) => {
      director.loadScene("game", (e) => {
        ProcessEventCenter.emit(ProcessEvent.START_SELECT_CHARACTER, {
          playerCount: data.playerCount,
          identity: data.identity,
          secretTask: data.secretTask,
          characterIdList: data.roles,
          waitingSecond: data.waitingSecond,
        });
      });
    });
    NetworkEventCenter.on(NetworkEventToC.AUTO_PLAY_TOC, (data: ProtobufType.auto_play_toc) => {
      ProcessEventCenter.emit(ProcessEvent.GET_AUTO_PLAY_STATUS, { enable: data.enable });
    });
    NetworkEventCenter.on(NetworkEventToC.SELECT_ROLE_TOC, (data: ProtobufType.select_role_toc) => {
      ProcessEventCenter.emit(ProcessEvent.CONFORM_SELECT_CHARACTER, {
        characterId: data.role,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.INIT_TOC, (data: ProtobufType.init_toc) => {
      const players = [];
      for (let i = 0; i < data.names.length; i++) {
        players.push({
          id: i,
          name: data.names[i],
          characterId: data.roles[i],
        });
      }
      ProcessEventCenter.emit(ProcessEvent.INIT_GAME, {
        playerCount: data.playerCount,
        identity: data.identity,
        secretTask: data.secretTask,
        players,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.NOTIFY_ROLE_UPDATE_TOC, (data: ProtobufType.notify_role_update_toc) => {
      ProcessEventCenter.emit(ProcessEvent.UPDATE_CHARACTER_STATUS, {
        playerId: data.playerId,
        characterId: data.role,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.ADD_CARD_TOC, (data: ProtobufType.add_card_toc) => {
      ProcessEventCenter.emit(ProcessEvent.DRAW_CARDS, {
        playerId: data.playerId,
        cards: data.cards,
        unknownCardCount: data.unknownCardCount,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.SYNC_DECK_NUM_TOC, (data: ProtobufType.sync_deck_num_toc) => {
      ProcessEventCenter.emit(ProcessEvent.SYNC_DECK_NUM, {
        number: data.num,
        shuffled: data.shuffled,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.DISCARD_CARD_TOC, (data: ProtobufType.discard_card_toc) => {
      ProcessEventCenter.emit(ProcessEvent.DISCARD_CARDS, {
        playerId: data.playerId,
        cards: data.cards,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.NOTIFY_PHASE_TOC, (data: ProtobufType.notify_phase_toc) => {
      ProcessEventCenter.emit(ProcessEvent.GET_PHASE_DATA, {
        currentPlayerId: data.currentPlayerId,
        currentPhase: data.currentPhase,
        messagePlayerId: data.messagePlayerId,
        messageDirection: data.messageCardDir,
        messageInTransmit: data.messageCard,
        senderId: data.senderId,
        needWaiting: data.waitingSecond !== 0,
      });
      let type;
      switch (data.currentPhase) {
        case ProtobufType.phase.Main_Phase:
        case ProtobufType.phase.Fight_Phase:
          type = WaitingType.PLAY_CARD;
          break;
        case ProtobufType.phase.Send_Start_Phase:
          type = WaitingType.SEND_MESSAGE;
          break;
        case ProtobufType.phase.Send_Phase:
          type = WaitingType.RECEIVE_MESSAGE;
          break;
        default:
          type = WaitingType.UNKNOWN;
      }

      ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
        playerId: data.waitingPlayerId,
        second: data.waitingSecond,
        type,
        seq: data.seq,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.SEND_MESSAGE_CARD_TOC, (data: ProtobufType.send_message_card_toc) => {
      ProcessEventCenter.emit(ProcessEvent.SEND_MESSAGE, {
        cardId: data.cardId,
        senderId: data.playerId,
        targetPlayerId: data.targetPlayerId,
        lockPlayerIds: data.lockPlayerIds,
        direction: data.cardDir,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.CHOOSE_RECEIVE_TOC, (data: ProtobufType.choose_receive_toc) => {
      ProcessEventCenter.emit(ProcessEvent.CHOOSE_RECEIVE, {
        playerId: data.playerId,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.WAIT_FOR_CHENG_QING_TOC, (data: ProtobufType.wait_for_cheng_qing_toc) => {
      ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
        playerId: data.waitingPlayerId,
        second: data.waitingSecond,
        type: WaitingType.PLAYER_DYING,
        seq: data.seq,
      });
      ProcessEventCenter.emit(ProcessEvent.PLAYER_DYING, {
        playerId: data.diePlayerId,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.NOTIFY_DYING_TOC, (data: ProtobufType.notify_dying_toc) => {
      ProcessEventCenter.emit(ProcessEvent.PLAYER_BEFORE_DEATH, {
        playerId: data.playerId,
        loseGame: data.loseGame,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.NOTIFY_DIE_TOC, (data: ProtobufType.notify_die_toc) => {
      ProcessEventCenter.emit(ProcessEvent.PLAYER_DIE, {
        playerId: data.playerId,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.NOTIFY_WINNER_TOC, (data: ProtobufType.notify_winner_toc) => {
      const players = [];
      for (let i = 0; i < data.secretTasks.length; i++) {
        players.push({
          playerId: i,
          identity: data.identity[i],
          secretTask: data.secretTasks[i],
          isWinner: data.winnerIds.indexOf(i) !== -1,
          isDeclarer: data.declarePlayerIds.indexOf(1) !== -1,
        });
      }
      ProcessEventCenter.emit(ProcessEvent.PLAYER_WIN, { players });
    });
    NetworkEventCenter.on(
      NetworkEventToC.WAIT_FOR_DIE_GIVE_CARD_TOC,
      (data: ProtobufType.wait_for_die_give_card_toc) => {
        ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
          playerId: data.playerId,
          second: data.waitingSecond,
          type: WaitingType.GIVE_CARD,
          seq: data.seq,
        });
      }
    );
    NetworkEventCenter.on(NetworkEventToC.NOTIFY_DIE_GIVE_CARD_TOC, (data: ProtobufType.notify_die_give_card_toc) => {
      ProcessEventCenter.emit(ProcessEvent.PLAYER_DIE_GIVE_CARD, {
        playerId: data.playerId,
        targetPlayerId: data.targetPlayerId,
        cards: data.card,
        unknownCardCount: data.unknownCardCount,
      });
    });

    //卡牌

    //试探
    NetworkEventCenter.on(NetworkEventToC.USE_SHI_TAN_TOC, (data: ProtobufType.use_shi_tan_toc) => {
      ProcessEventCenter.emit(ProcessEvent.CARD_PLAYED, {
        userId: data.playerId,
        cardId: data.cardId,
        cardType: CardType.SHI_TAN,
        targetPlayerId: data.targetPlayerId,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.SHOW_SHI_TAN_TOC, (data: ProtobufType.show_shi_tan_toc) => {
      ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
        playerId: data.playerId,
        second: data.waitingSecond,
        type: WaitingType.HNADLER_CARD,
        seq: data.seq,
      });
      ProcessEventCenter.emit(ProcessEvent.CARD_IN_PROCESS, {
        handler: "onShow",
        data: {
          userId: data.playerId,
          targetPlayerId: data.targetPlayerId,
          card: data.card,
        },
      });
    });
    NetworkEventCenter.on(NetworkEventToC.EXECUTE_SHI_TAN_TOC, (data: ProtobufType.execute_shi_tan_toc) => {
      ProcessEventCenter.emit(ProcessEvent.CARD_IN_PROCESS, {
        data: {
          userId: data.playerId,
          flag: data.isDrawCard,
        },
      });
    });

    //利诱
    NetworkEventCenter.on(NetworkEventToC.USE_LI_YOU_TOC, (data: ProtobufType.use_li_you_toc) => {
      ProcessEventCenter.emit(ProcessEvent.CARD_PLAYED, {
        card: data.liYouCard,
        cardType: CardType.LI_YOU,
        userId: data.playerId,
        targetPlayerId: data.targetPlayerId,
      });
      ProcessEventCenter.emit(ProcessEvent.CARD_IN_PROCESS, {
        data: {
          userId: data.playerId,
          targetPlayerId: data.targetPlayerId,
          targetCard: data.messageCard,
          flag: data.joinIntoHand,
        },
      });
    });

    //平衡
    NetworkEventCenter.on(NetworkEventToC.USE_PING_HENG_TOC, (data: ProtobufType.use_ping_heng_toc) => {
      ProcessEventCenter.emit(ProcessEvent.CARD_PLAYED, {
        card: data.pingHengCard,
        cardType: CardType.PING_HENG,
        userId: data.playerId,
        targetPlayerId: data.targetPlayerId,
      });
      ProcessEventCenter.emit(ProcessEvent.CARD_IN_PROCESS, {
        data: {
          userId: data.playerId,
          targetPlayerId: data.targetPlayerId,
        },
      });
    });

    //澄清
    NetworkEventCenter.on(NetworkEventToC.USE_CHENG_QING_TOC, (data: ProtobufType.use_cheng_qing_toc) => {
      ProcessEventCenter.emit(ProcessEvent.CARD_PLAYED, {
        card: data.card,
        cardType: CardType.CHENG_QING,
        userId: data.playerId,
        targetPlayerId: data.targetPlayerId,
      });
      ProcessEventCenter.emit(ProcessEvent.CARD_IN_PROCESS, {
        data: {
          targetPlayerId: data.targetPlayerId,
          targetCardId: data.targetCardId,
        },
      });
    });

    //破译
    NetworkEventCenter.on(NetworkEventToC.USE_PO_YI_TOC, (data: ProtobufType.use_po_yi_toc) => {
      ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
        playerId: data.playerId,
        second: data.waitingSecond,
        type: WaitingType.HNADLER_CARD,
        seq: data.seq,
      });
      ProcessEventCenter.emit(ProcessEvent.CARD_PLAYED, {
        card: data.card,
        cardType: CardType.PO_YI,
        userId: data.playerId,
      });
      ProcessEventCenter.emit(ProcessEvent.CARD_IN_PROCESS, {
        data: {
          userId: data.playerId,
          targetCard: data.messageCard,
        },
      });
    });
    NetworkEventCenter.on(NetworkEventToC.PO_YI_SHOW_TOC, (data: ProtobufType.po_yi_show_toc) => {
      const eventData: any = {
        userId: data.playerId,
        flag: data.show,
      };
      if (data.show) {
        eventData.targetCard = data.messageCard;
      }
      ProcessEventCenter.emit(ProcessEvent.CARD_IN_PROCESS, {
        handler: "onShow",
        data: eventData,
      });
    });

    //截获
    NetworkEventCenter.on(NetworkEventToC.USE_JIE_HUO_TOC, (data: ProtobufType.use_jie_huo_toc) => {
      ProcessEventCenter.emit(ProcessEvent.CARD_PLAYED, {
        card: data.card,
        cardType: CardType.JIE_HUO,
        userId: data.playerId,
      });
    });

    //调包
    NetworkEventCenter.on(NetworkEventToC.USE_DIAO_BAO_TOC, (data: ProtobufType.use_diao_bao_toc) => {
      ProcessEventCenter.emit(ProcessEvent.CARD_PLAYED, {
        cardId: data.cardId,
        cardType: CardType.DIAO_BAO,
        userId: data.playerId,
      });
      ProcessEventCenter.emit(ProcessEvent.CARD_IN_PROCESS, {
        data: {
          cardId: data.cardId,
          oldMessageCard: data.oldMessageCard,
        },
      });
    });

    //误导
    NetworkEventCenter.on(NetworkEventToC.USE_WU_DAO_TOC, (data: ProtobufType.use_wu_dao_toc) => {
      console.log(data.targetPlayerId);
      ProcessEventCenter.emit(ProcessEvent.CARD_PLAYED, {
        card: data.card,
        cardType: CardType.WU_DAO,
        userId: data.playerId,
      });
      ProcessEventCenter.emit(ProcessEvent.CARD_IN_PROCESS, {
        data: {
          targetPlayerId: data.targetPlayerId,
        },
      });
    });

    //威逼
    NetworkEventCenter.on(
      NetworkEventToC.WEI_BI_WAIT_FOR_GIVE_CARD_TOC,
      (data: ProtobufType.wei_bi_wait_for_give_card_toc) => {
        ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
          playerId: data.targetPlayerId,
          second: data.waitingSecond,
          type: WaitingType.HNADLER_CARD,
          seq: data.seq,
        });
        ProcessEventCenter.emit(ProcessEvent.CARD_PLAYED, {
          card: data.card,
          cardType: CardType.WEI_BI,
          userId: data.playerId,
          targetPlayerId: data.targetPlayerId,
          wantType: data.wantType,
        });
      }
    );
    NetworkEventCenter.on(NetworkEventToC.WEI_BI_GIVE_CARD_TOC, (data: ProtobufType.wei_bi_give_card_toc) => {
      ProcessEventCenter.emit(ProcessEvent.CARD_IN_PROCESS, {
        handler: "onGiveCard",
        data: {
          card: data.card,
          userId: data.playerId,
          targetPlayerId: data.targetPlayerId,
        },
      });
    });
    NetworkEventCenter.on(NetworkEventToC.WEI_BI_SHOW_HAND_CARD_TOC, (data: ProtobufType.wei_bi_show_hand_card_toc) => {
      ProcessEventCenter.emit(ProcessEvent.CARD_PLAYED, {
        card: data.card,
        cardType: CardType.WEI_BI,
        userId: data.playerId,
        targetPlayerId: data.targetPlayerId,
        wantType: data.wantType,
      });
      ProcessEventCenter.emit(ProcessEvent.CARD_IN_PROCESS, {
        handler: "onShowHandCard",
        data: {
          card: data.card,
          userId: data.playerId,
          targetPlayerId: data.targetPlayerId,
          wantType: data.wantType,
          cards: data.cards,
        },
      });
    });

    //风云变幻
    NetworkEventCenter.on(
      NetworkEventToC.USE_FENG_YUN_BIAN_HUAN_TOC,
      (data: ProtobufType.use_feng_yun_bian_huan_toc) => {
        ProcessEventCenter.emit(ProcessEvent.CARD_PLAYED, {
          card: data.card,
          cardType: CardType.FENG_YUN_BIAN_HUAN,
          userId: data.playerId,
        });
        ProcessEventCenter.emit(ProcessEvent.CARD_IN_PROCESS, {
          handler: "onShowCards",
          data: {
            cards: data.showCards,
          },
        });
      }
    );
    NetworkEventCenter.on(
      NetworkEventToC.WAIT_FOR_FENG_YUN_BIAN_HUAN_CHOOSE_CARD_TOC,
      (data: ProtobufType.wait_for_feng_yun_bian_huan_choose_card_toc) => {
        ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
          playerId: data.playerId,
          second: data.waitingSecond,
          type: WaitingType.HNADLER_CARD,
          seq: data.seq,
        });
        ProcessEventCenter.emit(ProcessEvent.CARD_IN_PROCESS, {
          handler: "waitingForChooseCard",
          data: {
            playerId: data.playerId,
          },
        });
      }
    );
    NetworkEventCenter.on(
      NetworkEventToC.FENG_YUN_BIAN_HUAN_CHOOSE_CARD_TOC,
      (data: ProtobufType.feng_yun_bian_huan_choose_card_toc) => {
        ProcessEventCenter.emit(ProcessEvent.CARD_IN_PROCESS, {
          handler: "onChooseCard",
          data: {
            playerId: data.playerId,
            cardId: data.cardId,
            asMessageCard: data.asMessageCard,
          },
        });
      }
    );

    //技能

    //毛不拔【奇货可居】
    NetworkEventCenter.on(NetworkEventToC.SKILL_QI_HUO_KE_JU_TOC, (data) => {});

    //肥原龙川【诡诈】
    NetworkEventCenter.on(NetworkEventToC.SKILL_GUI_ZHA_TOC, (data) => {});

    //王魁【以牙还牙】
    NetworkEventCenter.on(NetworkEventToC.SKILL_YI_YA_HUAN_YA_TOC, (data) => {});

    //韩梅【移花接木】
    NetworkEventCenter.on(NetworkEventToC.SKILL_YI_YA_HUAN_YA_TOC, (data) => {});

    //鄭文先
    //【偷天】
    NetworkEventCenter.on(NetworkEventToC.SKILL_TOU_TIAN_TOC, (data) => {});
    //【换日】
    NetworkEventCenter.on(NetworkEventToC.SKILL_HUAN_RI_TOC, (data) => {});

    //鬼脚【急送】
    NetworkEventCenter.on(NetworkEventToC.SKILL_JI_SONG_TOC, (data) => {});

    //邵秀【绵里藏针】
    NetworkEventCenter.on(NetworkEventToC.SKILL_MIAN_LI_CANG_ZHEN_TOC, (data) => {});

    //金生火【谨慎】
    NetworkEventCenter.on(NetworkEventToC.SKILL_JIN_SHEN_TOC, (data) => {});

    //白菲菲【怜悯】
    NetworkEventCenter.on(NetworkEventToC.SKILL_LIAN_MIN_TOC, (data) => {});

    //广播使用【腹黑】
    NetworkEventCenter.on(NetworkEventToC.SKILL_FU_HEI_TOC, (data) => {});

    //端木静【新思潮】
    NetworkEventCenter.on(NetworkEventToC.SKILL_XIN_SI_CHAO_TOC, (data) => {});

    //【视死】
    NetworkEventCenter.on(NetworkEventToC.SKILL_SHI_SI_TOC, (data) => {});

    //老汉【如归】
    NetworkEventCenter.on(NetworkEventToC.SKILL_WAIT_FOR_RU_GUI_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_RU_GUI_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_WAIT_FOR_ZHUAN_JIAO_TOC, (data) => {});

    //白小年【转交】
    NetworkEventCenter.on(NetworkEventToC.SKILL_ZHUAN_JIAO_TOC, (data) => {});
    //【明饵】
    NetworkEventCenter.on(NetworkEventToC.SKILL_MING_ER_TOC, (data) => {});

    //顾小梦
    //【集智】
    NetworkEventCenter.on(NetworkEventToC.SKILL_JI_ZHI_TOC, (data) => {});
    //【承志】
    NetworkEventCenter.on(NetworkEventToC.SKILL_WAIT_FOR_CHENG_ZHI_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_CHENG_ZHI_TOC, (data) => {});

    //【就计】
    NetworkEventCenter.on(NetworkEventToC.SKILL_JIU_JI_A_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_JIU_JI_B_TOC, (data) => {});

    //【城府】
    NetworkEventCenter.on(NetworkEventToC.SKILL_CHENG_FU_TOC, (data) => {});

    //李宁玉【遗信】
    NetworkEventCenter.on(NetworkEventToC.SKILL_WAIT_FOR_YI_XIN_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_YI_XIN_TOC, (data) => {});

    //【知音】
    NetworkEventCenter.on(NetworkEventToC.SKILL_ZHI_YIN_TOC, (data) => {});

    //程小蝶【惊梦】
    NetworkEventCenter.on(NetworkEventToC.SKILL_JING_MENG_A_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_JING_MENG_B_TOC, (data) => {});

    //商玉【借刀杀人】
    NetworkEventCenter.on(NetworkEventToC.SKILL_JIE_DAO_SHA_REN_A_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_JIE_DAO_SHA_REN_B_TOC, (data) => {});

    //裴玲【交际】
    NetworkEventCenter.on(NetworkEventToC.SKILL_JIAO_JI_A_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_JIAO_JI_B_TOC, (data) => {});

    //连鸢【妙笔巧辩】
    NetworkEventCenter.on(NetworkEventToC.SKILL_MIAO_BI_QIAO_BIAN_A_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_MIAO_BI_QIAO_BIAN_B_TOC, (data) => {});

    //王田香【禁闭】
    NetworkEventCenter.on(NetworkEventToC.SKILL_JIN_BI_A_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_JIN_BI_B_TOC, (data) => {});

    //阿芙罗拉【妙手】
    NetworkEventCenter.on(NetworkEventToC.SKILL_MIAO_SHOU_A_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_MIAO_SHOU_B_TOC, (data) => {});

    //玄青子【金口一开】
    NetworkEventCenter.on(NetworkEventToC.SKILL_JIN_KOU_YI_KAI_A_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_JIN_KOU_YI_KAI_B_TOC, (data) => {});

    // 王富贵【江湖令】
    NetworkEventCenter.on(NetworkEventToC.SKILL_WAIT_FOR_JIANG_HU_LING_A_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_JIANG_HU_LING_A_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_WAIT_FOR_JIANG_HU_LING_B_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_JIANG_HU_LING_B_TOC, (data) => {});

    //SP顾小梦【羁绊】
    NetworkEventCenter.on(NetworkEventToC.SKILL_JI_BAN_A_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_JI_BAN_B_TOC, (data) => {});

    //【诱导】
    NetworkEventCenter.on(NetworkEventToC.SKILL_YOU_DAO_TOC, (data) => {});

    //白沧浪【博爱】
    NetworkEventCenter.on(NetworkEventToC.SKILL_BO_AI_A_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_BO_AI_B_TOC, (data) => {});

    //小九【广发报】
    NetworkEventCenter.on(NetworkEventToC.SKILL_GUANG_FA_BAO_A_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_WAIT_FOR_GUANG_FA_BAO_B_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_GUANG_FA_BAO_B_TOC, (data) => {});

    //【强令】
    NetworkEventCenter.on(NetworkEventToC.SKILL_WAIT_FOR_QIANG_LING_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_QIANG_LING_TOC, (data) => {});

    //吴志国【坚韧】
    NetworkEventCenter.on(NetworkEventToC.SKILL_JIAN_REN_A_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_JIAN_REN_B_TOC, (data) => {});

    //李醒【搜辑】
    NetworkEventCenter.on(NetworkEventToC.SKILL_SOU_JI_A_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_SOU_JI_B_TOC, (data) => {});

    //黄济仁【对症下药】
    NetworkEventCenter.on(NetworkEventToC.SKILL_DUI_ZHENG_XIA_YAO_A_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_DUI_ZHENG_XIA_YAO_B_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_DUI_ZHENG_XIA_YAO_C_TOC, (data) => {});

    //白昆山【毒计】
    NetworkEventCenter.on(NetworkEventToC.SKILL_DU_JI_A_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_WAIT_FOR_DU_JI_B_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_DU_JI_B_TOC, (data) => {});
    NetworkEventCenter.on(NetworkEventToC.SKILL_DU_JI_C_TOC, (data) => {});
  }
}
