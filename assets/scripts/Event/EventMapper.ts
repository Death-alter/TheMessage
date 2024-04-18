import { DataEventCenter, NetworkEventCenter, ProcessEventCenter, UIEventCenter } from "./EventTarget";
import * as ProtobufType from "../../protobuf/proto.d";
import { DataEvent, NetworkEventToC, ProcessEvent, UIEvent } from "./type";
import { _decorator, director } from "cc";
import { WaitingType } from "../Manager/type";
import { CardType } from "../Components/Card/type";

//把网络协议映射为程序事件

export class EventMapper {
  public static init() {
    //error
    NetworkEventCenter.on(NetworkEventToC.ERROR_MESSAGE_TOC, (data: ProtobufType.error_message_toc) => {
      ProcessEventCenter.emit(ProcessEvent.NETWORK_ERROR, { msg: data.msg });
    });

    //流程
    NetworkEventCenter.on(NetworkEventToC.PAUSE_RECORD_TOC, (data: ProtobufType.pause_record_toc) => {
      ProcessEventCenter.emit(ProcessEvent.RECORD_STATUS_CHANGE, { paused: data.pause });
    });
    NetworkEventCenter.on(NetworkEventToC.GET_RECORD_LIST_TOC, (data: ProtobufType.get_record_list_toc) => {
      ProcessEventCenter.emit(ProcessEvent.GET_RECORD_LIST, { records: data.records });
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
            gameCount: data.gameCounts[i],
            rank: data.ranks[i],
            score: data.scores[i],
          });
        }
        ProcessEventCenter.emit(ProcessEvent.CREATE_ROOM, {
          myPosition: data.myPosition,
          onlineCount: data.onlineCount,
          notice: data.notice,
          players,
        });
      });
    });
    NetworkEventCenter.on(NetworkEventToC.RECONNECT_TOC, (data: ProtobufType.reconnect_toc) => {
      if (data.isEnd) {
        ProcessEventCenter.emit(ProcessEvent.RECONNECT_SYNC_END);
      } else {
        ProcessEventCenter.emit(ProcessEvent.RECONNECT_SYNC_START);
      }
    });
    NetworkEventCenter.on(NetworkEventToC.JOIN_ROOM_TOC, (data: ProtobufType.join_room_toc) => {
      ProcessEventCenter.emit(ProcessEvent.JOIN_ROOM, {
        name: data.name,
        position: data.position,
        winCount: data.winCount,
        gameCount: data.gameCount,
        rank: data.rank,
        score: data.score,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.LEAVE_ROOM_TOC, (data: ProtobufType.leave_room_toc) => {
      ProcessEventCenter.emit(ProcessEvent.LEAVE_ROOM, { position: data.position });
    });
    NetworkEventCenter.on(NetworkEventToC.GAME_START_TOC, () => {
      ProcessEventCenter.emit(ProcessEvent.START_LOAD_GAME_SCENE);
    });
    NetworkEventCenter.on(NetworkEventToC.WAIT_FOR_SELECT_ROLE_TOC, (data: ProtobufType.wait_for_select_role_toc) => {
      UIEventCenter.emit(UIEvent.START_CHOOSE_CHARACTER, {
        playerCount: data.playerCount,
        identity: data.identity,
        secretTask: data.secretTask,
        secretTaskList: data.possibleSecretTask,
        characterIdList: data.roles,
        waitingSecond: data.waitingSecond,
        position: data.position,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.AUTO_PLAY_TOC, (data: ProtobufType.auto_play_toc) => {
      ProcessEventCenter.emit(ProcessEvent.GET_AUTO_PLAY_STATUS, { enable: data.enable });
    });
    NetworkEventCenter.on(NetworkEventToC.NOTIFY_PLAYER_UPDATE_TOC, (data: ProtobufType.notify_player_update_toc) => {
      ProcessEventCenter.emit(ProcessEvent.PLAYER_NETWORK_STATUS_CHANGE, {
        playerId: data.playerId,
        isAuto: data.isAuto,
        isOffline: data.isOffline,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.SELECT_ROLE_TOC, (data: ProtobufType.select_role_toc) => {
      ProcessEventCenter.emit(ProcessEvent.CONFIRM_SELECT_CHARACTER, {
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
        secretTaskList: data.possibleSecretTask,
        players,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.NOTIFY_ROLE_UPDATE_TOC, (data: ProtobufType.notify_role_update_toc) => {
      DataEventCenter.emit(DataEvent.UPDATE_CHARACTER_STATUS, {
        playerId: data.playerId,
        characterId: data.role,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.ADD_CARD_TOC, (data: ProtobufType.add_card_toc) => {
      DataEventCenter.emit(DataEvent.DRAW_CARDS, {
        playerId: data.playerId,
        cards: data.cards,
        unknownCardCount: data.unknownCardCount,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.SYNC_DECK_NUM_TOC, (data: ProtobufType.sync_deck_num_toc) => {
      DataEventCenter.emit(DataEvent.SYNC_DECK_NUM, {
        number: data.num,
        shuffled: data.shuffled,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.DISCARD_CARD_TOC, (data: ProtobufType.discard_card_toc) => {
      DataEventCenter.emit(DataEvent.DISCARD_CARDS, {
        playerId: data.playerId,
        cards: data.cards,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.NOTIFY_PHASE_TOC, (data: ProtobufType.notify_phase_toc) => {
      DataEventCenter.emit(DataEvent.SYNC_PHASE_DATA, {
        currentPlayerId: data.currentPlayerId,
        currentPhase: data.currentPhase,
        messagePlayerId: data.messagePlayerId,
        messageDirection: data.messageCardDir,
        messageInTransmit: data.messageCard,
        senderId: data.senderId,
        needWaiting: data.waitingSecond > 0,
      });

      if (data.waitingSecond > 0) {
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
          case ProtobufType.phase.Receive_Phase:
            type = WaitingType.USE_SKILL;
            break;
          default:
            type = WaitingType.UNKNOWN;
        }

        UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
          playerId: data.waitingPlayerId,
          second: data.waitingSecond,
          type,
          seq: data.seq,
          params: {
            messageInTransmit: data.messageCard,
          },
        });
      }
    });
    NetworkEventCenter.on(NetworkEventToC.SEND_MESSAGE_CARD_TOC, (data: ProtobufType.send_message_card_toc) => {
      DataEventCenter.emit(DataEvent.SEND_MESSAGE, {
        cardId: data.cardId,
        senderId: data.senderId,
        targetPlayerId: data.targetPlayerId,
        lockPlayerIds: data.lockPlayerIds,
        direction: data.cardDir,
        fromHand: true,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.CHOOSE_RECEIVE_TOC, (data: ProtobufType.choose_receive_toc) => {
      DataEventCenter.emit(DataEvent.CHOOSE_RECEIVE_MESSAGE, {
        playerId: data.playerId,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.WAIT_FOR_CHENG_QING_TOC, (data: ProtobufType.wait_for_cheng_qing_toc) => {
      UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
        playerId: data.waitingPlayerId,
        second: data.waitingSecond,
        type: WaitingType.PLAYER_DYING,
        params: {
          diePlayerId: data.diePlayerId,
        },
        seq: data.seq,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.NOTIFY_DYING_TOC, (data: ProtobufType.notify_dying_toc) => {
      DataEventCenter.emit(DataEvent.PLAYER_BEFORE_DEATH, {
        playerId: data.playerId,
        loseGame: data.loseGame,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.NOTIFY_DIE_TOC, (data: ProtobufType.notify_die_toc) => {
      DataEventCenter.emit(DataEvent.PLAYER_DIE, {
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
          isDeclarer: data.declarePlayerIds.indexOf(i) !== -1,
          addScore: data.addScore[i],
          score: data.newScore[i],
          rank: data.newRank[i],
        });
      }
      DataEventCenter.emit(DataEvent.PLAYER_WIN, { players });
    });
    NetworkEventCenter.on(
      NetworkEventToC.WAIT_FOR_DIE_GIVE_CARD_TOC,
      (data: ProtobufType.wait_for_die_give_card_toc) => {
        UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
          playerId: data.playerId,
          second: data.waitingSecond,
          type: WaitingType.GIVE_CARD,
          seq: data.seq,
        });
      },
    );
    NetworkEventCenter.on(NetworkEventToC.NOTIFY_DIE_GIVE_CARD_TOC, (data: ProtobufType.notify_die_give_card_toc) => {
      DataEventCenter.emit(DataEvent.PLAYER_DIE_GIVE_CARD, {
        playerId: data.playerId,
        targetPlayerId: data.targetPlayerId,
        cards: data.card,
        unknownCardCount: data.unknownCardCount,
      });
    });

    //卡牌

    //试探
    NetworkEventCenter.on(NetworkEventToC.USE_SHI_TAN_TOC, (data: ProtobufType.use_shi_tan_toc) => {
      DataEventCenter.emit(DataEvent.CARD_PLAYED, {
        userId: data.playerId,
        cardId: data.cardId,
        cardType: CardType.SHI_TAN,
        isActual: true,
        targetPlayerId: data.targetPlayerId,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.SHOW_SHI_TAN_TOC, (data: ProtobufType.show_shi_tan_toc) => {
      UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
        playerId: data.targetPlayerId,
        second: data.waitingSecond,
        type: WaitingType.HANDLE_CARD,
        seq: data.seq,
      });
      DataEventCenter.emit(DataEvent.CARD_IN_PROCESS, {
        handler: "onShow",
        data: {
          userId: data.playerId,
          targetPlayerId: data.targetPlayerId,
          card: data.card,
        },
      });
    });
    NetworkEventCenter.on(NetworkEventToC.EXECUTE_SHI_TAN_TOC, (data: ProtobufType.execute_shi_tan_toc) => {
      DataEventCenter.emit(DataEvent.CARD_IN_PROCESS, {
        data: {
          targetPlayerId: data.playerId,
          flag: data.isDrawCard,
        },
      });
    });

    //利诱
    NetworkEventCenter.on(NetworkEventToC.USE_LI_YOU_TOC, (data: ProtobufType.use_li_you_toc) => {
      DataEventCenter.emit(DataEvent.CARD_PLAYED, {
        card: data.liYouCard,
        cardType: CardType.LI_YOU,
        userId: data.playerId,
        isActual: data.liYouCard !== null,
        targetPlayerId: data.targetPlayerId,
      });
      DataEventCenter.emit(DataEvent.CARD_IN_PROCESS, {
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
      DataEventCenter.emit(DataEvent.CARD_PLAYED, {
        card: data.pingHengCard,
        cardType: CardType.PING_HENG,
        isActual: data.pingHengCard !== null,
        userId: data.playerId,
        targetPlayerId: data.targetPlayerId,
      });
      DataEventCenter.emit(DataEvent.CARD_IN_PROCESS, {
        data: {
          userId: data.playerId,
          targetPlayerId: data.targetPlayerId,
        },
      });
    });

    //澄清
    NetworkEventCenter.on(NetworkEventToC.USE_CHENG_QING_TOC, (data: ProtobufType.use_cheng_qing_toc) => {
      DataEventCenter.emit(DataEvent.CARD_PLAYED, {
        card: data.card,
        cardType: CardType.CHENG_QING,
        userId: data.playerId,
        isActual: data.card !== null,
        targetPlayerId: data.targetPlayerId,
      });
      DataEventCenter.emit(DataEvent.CARD_IN_PROCESS, {
        data: {
          targetPlayerId: data.targetPlayerId,
          targetCardId: data.targetCardId,
        },
      });
    });

    //破译
    NetworkEventCenter.on(NetworkEventToC.USE_PO_YI_TOC, (data: ProtobufType.use_po_yi_toc) => {
      DataEventCenter.emit(DataEvent.CARD_PLAYED, {
        card: data.card,
        cardType: CardType.PO_YI,
        isActual: data.card !== null,
        userId: data.playerId,
      });
      if (data.waitingSecond > 0) {
        UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
          playerId: data.playerId,
          second: data.waitingSecond,
          type: WaitingType.HANDLE_CARD,
          seq: data.seq,
        });
        DataEventCenter.emit(DataEvent.CARD_IN_PROCESS, {
          data: {
            userId: data.playerId,
            targetCard: data.messageCard,
          },
        });
      }
    });
    NetworkEventCenter.on(NetworkEventToC.PO_YI_SHOW_TOC, (data: ProtobufType.po_yi_show_toc) => {
      const eventData: any = {
        userId: data.playerId,
        flag: data.show,
      };
      if (data.show) {
        eventData.targetCard = data.messageCard;
      }
      DataEventCenter.emit(DataEvent.CARD_IN_PROCESS, {
        handler: "onShow",
        data: eventData,
      });
    });

    //截获
    NetworkEventCenter.on(NetworkEventToC.USE_JIE_HUO_TOC, (data: ProtobufType.use_jie_huo_toc) => {
      DataEventCenter.emit(DataEvent.CARD_PLAYED, {
        card: data.card,
        cardType: CardType.JIE_HUO,
        isActual: data.card !== null,
        userId: data.playerId,
      });
    });

    //调包
    NetworkEventCenter.on(NetworkEventToC.USE_DIAO_BAO_TOC, (data: ProtobufType.use_diao_bao_toc) => {
      DataEventCenter.emit(DataEvent.CARD_PLAYED, {
        cardId: data.cardId,
        cardType: CardType.DIAO_BAO,
        isActual: true,
        userId: data.playerId,
      });
      DataEventCenter.emit(DataEvent.CARD_IN_PROCESS, {
        data: {
          cardId: data.cardId,
          oldMessageCard: data.oldMessageCard,
        },
      });
    });

    //误导
    NetworkEventCenter.on(NetworkEventToC.USE_WU_DAO_TOC, (data: ProtobufType.use_wu_dao_toc) => {
      DataEventCenter.emit(DataEvent.CARD_PLAYED, {
        card: data.card,
        cardType: CardType.WU_DAO,
        isActual: data.card !== null,
        userId: data.playerId,
        targetPlayerId: data.targetPlayerId,
      });
    });

    //威逼
    NetworkEventCenter.on(
      NetworkEventToC.WEI_BI_WAIT_FOR_GIVE_CARD_TOC,
      (data: ProtobufType.wei_bi_wait_for_give_card_toc) => {
        UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
          playerId: data.targetPlayerId,
          second: data.waitingSecond,
          type: WaitingType.HANDLE_CARD,
          seq: data.seq,
        });
        DataEventCenter.emit(DataEvent.CARD_PLAYED, {
          card: data.card,
          cardType: CardType.WEI_BI,
          userId: data.playerId,
          isActual: data.card !== null,
          targetPlayerId: data.targetPlayerId,
        });
        DataEventCenter.emit(DataEvent.CARD_IN_PROCESS, {
          data: {
            userId: data.playerId,
            targetPlayerId: data.targetPlayerId,
            wantType: data.wantType,
          },
        });
      },
    );
    NetworkEventCenter.on(NetworkEventToC.WEI_BI_GIVE_CARD_TOC, (data: ProtobufType.wei_bi_give_card_toc) => {
      const params: any = { userId: data.playerId, targetPlayerId: data.targetPlayerId };
      if (data.card) {
        params.card = data.card;
      }

      DataEventCenter.emit(DataEvent.CARD_IN_PROCESS, {
        handler: "onGiveCard",
        data: params,
      });
    });
    NetworkEventCenter.on(NetworkEventToC.WEI_BI_SHOW_HAND_CARD_TOC, (data: ProtobufType.wei_bi_show_hand_card_toc) => {
      DataEventCenter.emit(DataEvent.CARD_PLAYED, {
        card: data.card,
        cardType: CardType.WEI_BI,
        userId: data.playerId,
        isActual: data.card !== null,
        targetPlayerId: data.targetPlayerId,
        wantType: data.wantType,
      });
      DataEventCenter.emit(DataEvent.CARD_IN_PROCESS, {
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
        DataEventCenter.emit(DataEvent.CARD_PLAYED, {
          card: data.card,
          cardType: CardType.FENG_YUN_BIAN_HUAN,
          isActual: data.card !== null,
          userId: data.playerId,
        });
        DataEventCenter.emit(DataEvent.CARD_IN_PROCESS, {
          handler: "onShowCards",
          data: {
            cards: data.showCards,
          },
        });
      },
    );
    NetworkEventCenter.on(
      NetworkEventToC.WAIT_FOR_FENG_YUN_BIAN_HUAN_CHOOSE_CARD_TOC,
      (data: ProtobufType.wait_for_feng_yun_bian_huan_choose_card_toc) => {
        UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
          playerId: data.playerId,
          second: data.waitingSecond,
          type: WaitingType.HANDLE_CARD,
          seq: data.seq,
        });
        DataEventCenter.emit(DataEvent.CARD_IN_PROCESS, {
          handler: "waitingForChooseCard",
          data: {
            playerId: data.playerId,
          },
        });
      },
    );
    NetworkEventCenter.on(
      NetworkEventToC.FENG_YUN_BIAN_HUAN_CHOOSE_CARD_TOC,
      (data: ProtobufType.feng_yun_bian_huan_choose_card_toc) => {
        DataEventCenter.emit(DataEvent.CARD_IN_PROCESS, {
          handler: "onChooseCard",
          data: {
            playerId: data.playerId,
            cardId: data.cardId,
            asMessageCard: data.asMessageCard,
          },
        });
      },
    );

    //密令
    NetworkEventCenter.on(NetworkEventToC.USE_MI_LING_TOC, (data: ProtobufType.use_mi_ling_toc) => {
      DataEventCenter.emit(DataEvent.CARD_PLAYED, {
        card: data.card,
        cardType: CardType.MI_LING,
        userId: data.playerId,
        isActual: true,
        targetPlayerId: data.targetPlayerId,
      });
      if (data.hasColor) {
        UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
          playerId: data.targetPlayerId,
          second: data.waitingSecond,
          type: WaitingType.HANDLE_CARD,
          seq: data.seq,
        });
      } else {
        UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
          playerId: data.playerId,
          second: data.waitingSecond,
          type: WaitingType.HANDLE_CARD,
          seq: data.seq,
        });
      }

      DataEventCenter.emit(DataEvent.CARD_IN_PROCESS, {
        data: {
          playerId: data.playerId,
          targetPlayerId: data.targetPlayerId,
          secret: data.secret,
          card: data.card,
          hasColor: data.hasColor,
          handCards: data.handCards,
        },
      });
    });

    NetworkEventCenter.on(NetworkEventToC.MI_LING_CHOOSE_CARD_TOC, (data: ProtobufType.mi_ling_choose_card_toc) => {
      UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
        playerId: data.targetPlayerId,
        second: data.waitingSecond,
        type: WaitingType.HANDLE_CARD,
        seq: data.seq,
      });
      DataEventCenter.emit(DataEvent.CARD_IN_PROCESS, {
        handler: "onChooseCard",
        data: {
          playerId: data.playerId,
          targetPlayerId: data.targetPlayerId,
          card: data.card,
        },
      });
    });

    //调虎离山
    NetworkEventCenter.on(NetworkEventToC.USE_DIAO_HU_LI_SHAN_TOC, (data: ProtobufType.use_diao_hu_li_shan_toc) => {
      DataEventCenter.emit(DataEvent.CARD_PLAYED, {
        card: data.card,
        cardType: CardType.DIAO_HU_LI_SHAN,
        isActual: data.card !== null,
        userId: data.playerId,
        targetPlayerId: data.targetPlayerId,
      });
      DataEventCenter.emit(DataEvent.CARD_IN_PROCESS, {
        data: {
          playerId: data.playerId,
          targetPlayerId: data.targetPlayerId,
          card: data.card,
          isSkill: data.isSkill,
        },
      });
    });

    //欲擒故纵
    NetworkEventCenter.on(NetworkEventToC.USE_YU_QIN_GU_ZONG_TOC, (data: ProtobufType.use_yu_qin_gu_zong_toc) => {
      DataEventCenter.emit(DataEvent.CARD_PLAYED, {
        card: data.card,
        cardType: CardType.YU_QIN_GU_ZONG,
        isActual: data.card !== null,
        userId: data.playerId,
      });
      DataEventCenter.emit(DataEvent.CARD_IN_PROCESS, {
        data: {
          card: data.card,
          playerId: data.playerId,
          targetPlayerId: data.targetPlayerId,
          messageCardId: data.messageCardId,
          lockPlayerIds: data.lockPlayerIds,
          cardDir: data.cardDir,
        },
      });
    });
    NetworkEventCenter.on(NetworkEventToC.UNKNOWN_WAITING_TOC, (data: ProtobufType.unknown_waiting_toc) => {
      UIEventCenter.emit(UIEvent.STOP_COUNT_DOWN);
      if (data.waitingSecond > 0) {
        UIEventCenter.emit(UIEvent.UNKNOWN_WAITING, data.waitingSecond);
      }
    });
    //添加情报
    NetworkEventCenter.on(NetworkEventToC.ADD_MESSAGE_CARD_TOC, (data: ProtobufType.add_message_card_toc) => {
      DataEventCenter.emit(DataEvent.GM_ADD_MESSAGE, {
        targetPlayerId: data.targetPlayerId,
        messageCard: data.messageCard,
      });
    });
  }
}
