import { TriggerSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Character/Character";
import { skill_qiang_ling_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, UIEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, UIEvent } from "../../../Event/type";
import { WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { CardType } from "../../Card/type";
import { GameManager } from "../../../Manager/GameManager";

export class QiangLing extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "强令",
      character,
      description:
        "你传出情报后，或你决定接收情报后，可以宣言至多两个卡牌名称。本回合中，所有角色均不能使用被宣言的卡牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_QIANG_LING_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_WAIT_FOR_QIANG_LING_TOC,
      (data) => {
        UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
          playerId: data.playerId,
          second: data.waitingSecond,
          type: WaitingType.USE_SKILL,
          seq: data.seq,
          params: {
            skill: this,
          },
        });
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_QIANG_LING_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_WAIT_FOR_QIANG_LING_TOC);
  }

  onTrigger(gui: GameManager, params): void {
    const tooltip = gui.tooltip;
    const cardList = [
      gui.data.createCardByType(CardType.CHENG_QING),
      gui.data.createCardByType(CardType.PO_YI),
      gui.data.createCardByType(CardType.JIE_HUO),
      gui.data.createCardByType(CardType.DIAO_BAO),
      gui.data.createCardByType(CardType.WU_DAO),
    ];
    tooltip.setText(`是否使用【强令】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          const showCardsWindow = gui.showCardsWindow;
          showCardsWindow.show({
            title: "请选择至多两个卡牌类型",
            limit: 2,
            cardList,
            buttons: [
              {
                text: "确定",
                onclick: () => {
                  NetworkEventCenter.emit(NetworkEventToS.SKILL_QIANG_LING_TOS, {
                    enable: true,
                    types: showCardsWindow.selectedCards.list.map((card) => card.type),
                    seq: gui.seq,
                  });
                  showCardsWindow.hide();
                },
                enabled: () => showCardsWindow.selectedCards.list.length > 0,
              },
            ],
          });
        },
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_QIANG_LING_TOS, {
            enable: false,
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId, types }: skill_qiang_ling_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    const cards = types.map((type) => gameData.createCardByType(<number>type));

    for (const player of gameData.playerList) {
      player.banCardByType(<number[]>types);
    }

    let str = `${gameLog.formatPlayer(player)}宣言`;
    for (const card of cards) {
      str += gameLog.formatCard(card);
    }
    gameLog.addData(new GameLog(str));

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
