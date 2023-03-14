import { _decorator, Component, Node, Prefab, instantiate, Label, resources, Layout } from "cc";
import { SelectCharacter } from "../UI/Game/SelectCharacter/SelectCharacter";
import { GamePhase } from "./type";
import {
  wait_for_select_role_toc,
  init_toc,
  notify_phase_toc,
  sync_deck_num_toc,
  add_card_toc,
  notify_role_update_toc,
  discard_card_toc,
  use_shi_tan_toc,
  show_shi_tan_toc,
  execute_shi_tan_toc,
  use_ping_heng_toc,
  wei_bi_wait_for_give_card_toc,
  wei_bi_show_hand_card_toc,
  wei_bi_give_card_toc,
  use_cheng_qing_toc,
  send_message_card_toc,
  choose_receive_toc,
  notify_dying_toc,
  notify_die_toc,
  wait_for_cheng_qing_toc,
  wait_for_die_give_card_toc,
  notify_winner_toc,
  use_po_yi_toc,
  po_yi_show_toc,
  use_jie_huo_toc,
  use_diao_bao_toc,
  use_wu_dao_toc,
  use_feng_yun_bian_huan_toc,
  wait_for_feng_yun_bian_huan_choose_card_toc,
  feng_yun_bian_huan_choose_card_toc,
} from "../../protobuf/proto.d";
import EventTarget from "../Event/EventTarget";
import { ProcessEvent, GameEvent } from "../Event/type";
import { Card } from "../Data/Cards/Card";
import { GameCard } from "../Data/Cards/type";
import { createIdentity } from "../Data/Identity";
import { Identity } from "../Data/Identity/Identity";
import { IdentityType, SecretTaskType } from "../Data/Identity/type";
import { CharacterStatus, CharacterType } from "../Data/Characters/type";
import Player from "../Data/Player/Player";
import { createCharacterById } from "../Data/Characters";
import { PlayerUI } from "../UI/Game/Player/PlayerUI";
import { createCard, createUnknownCard } from "../Data/Cards";
import { CardUsage } from "../Data/Cards/type";
import { HandCardUI } from "../UI/Game/UIContainer/HandCardUI";
import { ProgressControl } from "../Utils/ProgressControl";
import { CardUI } from "../UI/Game/Card/CardUI";
import { HandCardList } from "../Data/DataContainer/HandCardList";
import { CardGroup } from "../Data/DataContainer/CardGroup";
import { CardGroupNode } from "../UI/Game/UIContainer/CardGroupNode";
import { DataContainer } from "../Data/DataContainer/DataContainer";

const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  @property(Node)
  selectCharacterWindow: Node | null = null;
  @property(Node)
  gameWindow: Node | null = null;
  @property(Prefab)
  playerPrefab: Prefab | null = null;
  @property(Prefab)
  cardPrefab: Prefab | null = null;
  @property(Node)
  leftPlayerNodeList: Node | null = null;
  @property(Node)
  topPlayerNodeList: Node | null = null;
  @property(Node)
  rightPlayerNodeList: Node | null = null;
  @property(Node)
  deckText: Node | null = null;
  @property(Node)
  deckNode: Node | null = null;
  @property(Node)
  discardPileNode: Node | null = null;
  @property(Node)
  handCardUI: Node | null = null;
  @property(Node)
  cardGroupNode: Node | null = null;

  public identity: Identity;
  public playerCount: number;
  public selfPlayer: Player;
  public playerCharacterIdList: number[];
  public playerList: Player[];

  private _gamePhase: GamePhase;
  private _turnPlayerId: number;
  private _messageInTransmit: Card | null = null;
  private _deckCardCount: number;
  private _discardPile: Card[] = [];
  private _banishCards: Card[] = [];
  private _seq: number;
  private _handCardList: DataContainer<Card, CardUI>;
  private _cardGroupPool: DataContainer<GameCard, CardUI>[];

  get gamePhase() {
    return this._gamePhase;
  }
  set gamePhase(phase: GamePhase) {
    if (phase == null || phase !== this._gamePhase) return;
    this._gamePhase = phase;
    EventTarget.emit(GameEvent.GAME_PHASE_CHANGE, phase);
  }

  get turnPlayerId() {
    return this._turnPlayerId;
  }
  set turnPlayerId(playerId: number) {
    if (playerId == null || playerId !== this._turnPlayerId) return;
    this._turnPlayerId = playerId;
    Player.turnPlayerId = playerId;
    EventTarget.emit(GameEvent.GAME_TURN_CHANGE, playerId);
  }

  get deckCardCount() {
    return this._deckCardCount;
  }
  set deckCardCount(count) {
    if (count == null || count === this._deckCardCount) return;
    this._deckCardCount = count;
    this.deckText.getChildByName("Label").getComponent(Label).string = "牌堆剩余数量：" + count;
  }

  onEnable() {
    this.gameWindow.active = false;

    //开始选人
    EventTarget.on(ProcessEvent.START_SELECT_CHARACTER, (data: wait_for_select_role_toc) => {
      this.identity = createIdentity(
        (<unknown>data.identity) as IdentityType,
        (<unknown>data.secretTask) as SecretTaskType
      );
      this.playerCount = data.playerCount;
      this.playerCharacterIdList = data.roles;
      this.selectCharacterWindow.getComponent(SelectCharacter).init({
        identity: this.identity,
        roles: (<unknown[]>data.roles) as CharacterType[],
        waitingSecond: data.waitingSecond,
      });
    });

    //收到初始化
    EventTarget.on(ProcessEvent.INIT_GAME, (data) => {
      this.init(data);
      //预加载卡图
      resources.preloadDir("images/cards");
    });

    //设置座位号
    EventTarget.once(ProcessEvent.GET_PHASE_DATA, (data: notify_phase_toc) => {
      this.setPlayerSeats(data.currentPlayerId);
      this.selectCharacterWindow.getComponent(SelectCharacter).hide();
      this.gameWindow.active = true;
    });

    //收到phase数据
    EventTarget.on(ProcessEvent.GET_PHASE_DATA, (data: notify_phase_toc) => {
      EventTarget.emit(ProcessEvent.STOP_COUNT_DOWN);
      this.turnPlayerId = data.currentPlayerId;
      this.gamePhase = (<unknown>data.currentPhase) as GamePhase;
      if (data.waitingPlayerId === 0) {
        const progressStript = this.gameWindow.getChildByPath("Tooltip/Progress").getComponent(ProgressControl);

        progressStript.startCoundDown(data.waitingSecond);
      } else {
        this.playerList[data.waitingPlayerId].UI.startCoundDown(data.waitingSecond);
      }
      if (data.seq) this._seq = data.seq;
      //data.senderId
    });

    //卡组数量变化
    EventTarget.on(ProcessEvent.SYNC_DECK_NUM, (data: sync_deck_num_toc) => {
      this.deckCardCount = data.num;
      if (data.shuffled) {
        //播放洗牌动画（如果做了的话）
      }
    });

    //抽卡
    EventTarget.on(ProcessEvent.ADD_CARDS, (data: add_card_toc) => {
      this.drawCards(data);
    });

    //弃牌
    EventTarget.on(ProcessEvent.DISCARD_CARDS, (data: discard_card_toc) => {
      this.discardCards(data);
    });

    //收到角色更新
    EventTarget.on(ProcessEvent.UPDATE_CHARACTER, (data: notify_role_update_toc) => {
      if (data.role) {
        if (this.playerList[data.playerId].character.id === 0) {
          const ui = this.playerList[data.playerId].character.UI;
          const character = createCharacterById((<unknown>data.role) as CharacterType, ui);
          this.playerList[data.playerId].character = character;
        }
        this.playerList[data.playerId].character.status = CharacterStatus.FACE_UP;
      } else {
        this.playerList[data.playerId].character.status = CharacterStatus.FACE_DOWN;
      }
    });

    //有人传出情报
    EventTarget.on(ProcessEvent.SEND_MESSAGE, (data: send_message_card_toc) => {});

    //有人选择接收情报
    EventTarget.on(ProcessEvent.CHOOSE_RECEIVE, (data: choose_receive_toc) => {});

    //玩家濒死
    EventTarget.on(ProcessEvent.PLAYER_DYING, (data: notify_dying_toc) => {});

    //濒死求澄清
    EventTarget.on(ProcessEvent.WAIT_FOR_CHENG_QING, (data: wait_for_cheng_qing_toc) => {});

    //玩家死亡
    EventTarget.on(ProcessEvent.PLAYER_DIE, (data: notify_die_toc) => {});

    //死亡给牌
    EventTarget.on(ProcessEvent.WAIT_FOR_DIE_GIVE_CARD, (data: wait_for_die_give_card_toc) => {});

    //玩家获胜
    EventTarget.on(ProcessEvent.PLAYER_WIN, (data: notify_winner_toc) => {});

    //试探
    EventTarget.on(ProcessEvent.USE_SHI_TAN, (data: use_shi_tan_toc) => {});
    EventTarget.on(ProcessEvent.SHOW_SHI_TAN, (data: show_shi_tan_toc) => {});
    EventTarget.on(ProcessEvent.EXECUTE_SHI_TAN, (data: execute_shi_tan_toc) => {});

    //平衡
    EventTarget.on(ProcessEvent.USE_PING_HENG, (data: use_ping_heng_toc) => {});

    //威逼
    EventTarget.on(ProcessEvent.WEI_BI_WAIT_FOR_GIVE_CARD, (data: wei_bi_wait_for_give_card_toc) => {});
    EventTarget.on(ProcessEvent.WEI_BI_SHOW_HAND_CARD, (data: wei_bi_show_hand_card_toc) => {});
    EventTarget.on(ProcessEvent.WEI_BI_GIVE_CARD, (data: wei_bi_give_card_toc) => {});

    //澄清
    EventTarget.on(ProcessEvent.USE_CHENG_QING, (data: use_cheng_qing_toc) => {});

    //破译
    EventTarget.on(ProcessEvent.USE_PO_YI, (data: use_po_yi_toc) => {});
    EventTarget.on(ProcessEvent.PO_YI_SHOW_MESSAGE, (data: po_yi_show_toc) => {});

    //截获
    EventTarget.on(ProcessEvent.USE_JIE_HUO, (data: use_jie_huo_toc) => {});

    //调包
    EventTarget.on(ProcessEvent.USE_DIAO_BAO, (data: use_diao_bao_toc) => {});

    //误导
    EventTarget.on(ProcessEvent.USE_WU_DAO, (data: use_wu_dao_toc) => {});

    //风云变幻
    EventTarget.on(ProcessEvent.USE_FENG_YUN_BIAN_HUAN, (data: use_feng_yun_bian_huan_toc) => {});
    EventTarget.on(
      ProcessEvent.WAIT_FOR_FENG_YUN_BIAN_HUAN_CHOOSE_CARD,
      (data: wait_for_feng_yun_bian_huan_choose_card_toc) => {}
    );
    EventTarget.on(ProcessEvent.FENG_YUN_BIAN_HUAN_CHOOSE_CARD, (data: feng_yun_bian_huan_choose_card_toc) => {});
  }

  onDisable() {
    //移除事件监听
    EventTarget.off(ProcessEvent.START_SELECT_CHARACTER);
    EventTarget.off(ProcessEvent.INIT_GAME);
    EventTarget.off(ProcessEvent.GET_PHASE_DATA);
    EventTarget.off(ProcessEvent.SYNC_DECK_NUM);
    EventTarget.off(ProcessEvent.ADD_CARDS);
    EventTarget.off(ProcessEvent.UPDATE_CHARACTER);
  }

  init(data: init_toc) {
    this.playerCount = data.playerCount;
    this.playerList = [];

    //创建自己
    this.selfPlayer = new Player({
      id: 0,
      name: data.names[0],
      character: createCharacterById((<unknown>data.roles[0]) as CharacterType),
      UI: this.gameWindow.getChildByPath("Self/Player").getComponent(PlayerUI),
    });
    this.playerList.push(this.selfPlayer);
    this.identity = createIdentity(
      (<unknown>data.identity) as IdentityType,
      (<unknown>data.secretTask) as SecretTaskType
    );

    //隐藏人物进度条
    this.gameWindow.getChildByPath("Tooltip/Progress").active = false;

    //初始化手牌UI
    this._handCardList = new HandCardList(this.handCardUI.getComponent(HandCardUI));

    //创建cardGroupPool
    this.initCardGroupPool();

    //创建其他人
    for (let i = 1; i < data.playerCount; i++) {
      this.playerList.push(
        new Player({
          id: i,
          name: data.names[i],
          character: createCharacterById((<unknown>data.roles[i]) as CharacterType),
        })
      );
    }

    //创建其他人UI
    const othersCount = data.playerCount - 1;
    const sideLength = Math.floor(othersCount / 3);

    for (let i = 0; i < sideLength; i++) {
      const player = instantiate(this.playerPrefab);
      this.rightPlayerNodeList.addChild(player);
      this.playerList[i + 1].UI = player.getComponent(PlayerUI);
    }

    for (let i = sideLength; i < othersCount - sideLength; i++) {
      const player = instantiate(this.playerPrefab);
      this.topPlayerNodeList.addChild(player);
      this.playerList[i + 1].UI = player.getComponent(PlayerUI);
    }

    for (let i = othersCount - sideLength; i < othersCount; i++) {
      const player = instantiate(this.playerPrefab);
      this.leftPlayerNodeList.addChild(player);
      this.playerList[i + 1].UI = player.getComponent(PlayerUI);
    }
  }

  initCardGroupPool() {
    //根据玩家数创建cardGroup
    for (let i = 0; i < this.playerCount; i++) {
      this._cardGroupPool.push(new CardGroup(this.cardGroupNode.getComponent(CardGroupNode)));
    }
  }

  getCardGroup() {
    for (let i = 0; i < this._cardGroupPool.length; i++) {
      if (!(<CardGroupNode>this._cardGroupPool[i].UI).onAnimation) {
        return this._cardGroupPool[i];
      }
    }
    const cardGroup = new CardGroup(this.cardGroupNode.getComponent(CardGroupNode));
    this._cardGroupPool.push(cardGroup);
    return cardGroup;
  }

  drawCards(data: add_card_toc) {
    const cardGroup = this.getCardGroup();
    if (data.unknownCardCount) {
      for (let i = 0; i < data.unknownCardCount; i++) {
        const card = createUnknownCard(instantiate(this.cardPrefab).getComponent(CardUI));
        this.playerList[data.playerId].addCard(card);
        cardGroup.addData(card);
      }
    }
    if (data.cards && data.cards.length) {
      for (let item of data.cards) {
        const card = createCard({
          id: item.cardId,
          color: item.cardColor,
          type: item.cardType,
          direction: item.cardDir,
          drawCardColor: item.whoDrawCard,
          usage: CardUsage.HAND_CARD,
          lockable: item.canLock,
          UI: instantiate(this.cardPrefab).getComponent(CardUI),
        });
        this.playerList[data.playerId].addCard(card);
        cardGroup.addData(card);
        if (data.playerId === 0) {
          this._handCardList.addData(card as Card);
        }
      }
    }

    //抽卡动画
    (<CardGroupNode>cardGroup.UI)
      .move(this.deckNode.worldPosition, this.playerList[data.playerId].UI.node.worldPosition)
      .then(() => {
        //解绑UI并从cardGroup移除数据
        cardGroup.list.forEach((item) => {
          item.UI = null;
        });
        cardGroup.removeAllData();
      });
  }

  discardCards(data: discard_card_toc) {
    if (data.playerId === 0) {
      this.playerList[data.playerId].discardCard(data.cards);
    } else {
      this.playerList[data.playerId].discardCard(data.cards);
    }
  }

  selectCard() {}

  playCard(player, card) {}

  sendMessage(player, card) {}

  setPlayerSeats(fistPlayerId: number) {
    let i = fistPlayerId;
    let j = 0;
    do {
      this.playerList[i].seatNumber = j;
      i = (i + 1) % this.playerCount;
      ++j;
    } while (i !== fistPlayerId);
  }
}
