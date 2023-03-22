import { _decorator, Component, Node, Prefab, instantiate, Label, resources, Layout, tween, Vec3, Game } from "cc";
import { SelectCharacter } from "../UI/Game/SelectCharacter";
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
  card,
  notify_die_give_card_toc,
} from "../../protobuf/proto";
import EventTarget, { ProcessEventCenter } from "../Event/EventTarget";
import { ProcessEvent, GameEvent } from "../Event/type";
import { Card, UnknownCard } from "../Game/Card/Card";
import { CardColor, CardDirection, CardStatus, CardType, GameCard } from "../Game/Card/type";
import { createIdentity } from "../Game/Identity";
import { Identity } from "../Game/Identity/Identity";
import { IdentityType, SecretTaskType } from "../Game/Identity/type";
import { CharacterStatus, CharacterType } from "../Game/Character/type";
import { Player } from "../Game/Player/Player";
import { createCharacterById } from "../Game/Character";
import { PlayerObject } from "../Game/Player/PlayerObject";
import { createCard, createUnknownCard } from "../Game/Card";
import { CardUsage } from "../Game/Card/type";
import { HandCardContianer } from "../Game/Container/HandCardContianer";
import { ProgressControl } from "../UI/Game/ProgressControl";
import { CardObject } from "../Game/Card/CardObject";
import { HandCardList } from "../Game/Container/HandCardList";
import { CardGroupObject } from "../Game/Container/CardGroupObject";
import { DataContainer } from "../Game/Container/DataContainer";
import GamePools from "./GamePools";
import { CardAction } from "./CardAction";
import { SkillType } from "../Game/Skill/type";
import { ActiveSkill } from "../Game/Skill/Skill";
import { Tooltip } from "./Tooltip";
import { TooltipText } from "./TooltipText";
import { GameData } from "./GameData";
import { GameEventCenter } from "../Event/EventTarget";
import * as GameEventType from "../Event/GameEventType";
import * as ProcessEventType from "../Event/ProcessEventType";

const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  @property(Node)
  selectCharacterWindow: Node | null = null;
  @property(Node)
  gameWindow: Node | null = null;

  public identity: Identity;
  public selfPlayer: Player;
  public playerCharacterIdList: number[];
  public cardAction: CardAction;
  public toolTip: Tooltip;
  public gameData: GameData;

  onLoad() {
    this.gameData = new GameData();
  }

  onEnable() {
    this.gameWindow.active = false;

    //开始选人
    ProcessEventCenter.on(ProcessEvent.START_SELECT_CHARACTER, (data: ProcessEventType.StartSelectCharacter) => {
      this.identity = createIdentity(
        (<unknown>data.identity) as IdentityType,
        (<unknown>data.secretTask) as SecretTaskType
      );
      this.playerCharacterIdList = data.characterIdList;
      this.selectCharacterWindow.getComponent(SelectCharacter).init({
        identity: this.identity,
        roles: (<unknown[]>data.characterIdList) as CharacterType[],
        waitingSecond: data.waitingSecond,
      });
    });

    //游戏初始化
    ProcessEventCenter.on(ProcessEvent.INIT_GAME, (data: ProcessEventType.InitGame) => {
      this.selectCharacterWindow.getComponent(SelectCharacter).hide();
      this.gameWindow.active = true;
      //预加载卡图
      resources.preloadDir("images/cards");
    });

    this.gameData.registerEvents();
  }

  onDisable() {
    //移除事件监听
    this.gameData.unregisterEvents();
  }
}
