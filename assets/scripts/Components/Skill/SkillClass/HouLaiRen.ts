import { ActiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { skill_hou_lai_ren_a_toc, skill_hou_lai_ren_b_toc, wait_for_cheng_qing_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter, UIEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent, UIEvent } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { GameManager } from "../../../Manager/GameManager";
import { CharacterStatus } from "../../Chatacter/type";
import { CardColor } from "../../Card/type";
import { WaitingType } from "../../../Manager/type";
import { createCharacterById } from "../../Chatacter";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";

export class HouLaiRen extends ActiveSkill {
  constructor(character: Character) {
    super({
      name: "后来人",
      character,
      description:
        "你濒死时，可以翻开此角色牌并将其移出游戏，弃置你情报区中的情报，直到剩下一张红色或蓝色情报为止，然后从角色牌堆顶秘密抽取三张牌，从中选择一张作为你的新角色牌（隐藏角色则面朝下），剩余的角色牌放回角色牌堆底。",
      useablePhase: [],
    });
  }

  get useable() {
    return this.character.status === CharacterStatus.FACE_DOWN;
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_HOU_LAI_REN_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_HOU_LAI_REN_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(NetworkEventToC.WAIT_FOR_CHENG_QING_TOC, this.onPlayerDying, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_HOU_LAI_REN_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_HOU_LAI_REN_B_TOC);
    NetworkEventCenter.off(NetworkEventToC.WAIT_FOR_CHENG_QING_TOC, this.onPlayerDying, this);
  }

  onPlayerDying(data: wait_for_cheng_qing_toc) {
    if (data.diePlayerId === 0 && this.gameObject) {
      this.gameObject.useable = true;
      ProcessEventCenter.once(ProcessEvent.STOP_COUNT_DOWN, () => {
        if (this.gameObject) {
          this.gameObject.useable = false;
        }
      });
    }
  }

  onUse(gui: GameManager) {
    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          const showCardsWindow = gui.showCardsWindow;
          showCardsWindow.show({
            title: "请选择一张红色或蓝色情报保留",
            limit: 1,
            cardList: gui.data.selfPlayer.getMessagesCopy(),
            buttons: [
              {
                text: "确定",
                onclick: () => {
                  const cardId = showCardsWindow.selectedCards.list[0].id;
                  showCardsWindow.hide();
                  next({ cardId });
                },
                enabled: () =>
                  showCardsWindow.selectedCards.list.length > 0 &&
                  showCardsWindow.selectedCards.list[0].color[0] !== CardColor.BLACK,
              },
            ],
          });
        },
      }),
    }).onComplete((data) => {
      NetworkEventCenter.emit(NetworkEventToS.SKILL_HOU_LAI_REN_A_TOS, {
        remainCardId: data[0].cardId,
        seq: gui.seq,
      });
    });
  }

  onEffectA(gameData: GameData, { playerId, remainCardId, roles, waitingSecond, seq }: skill_hou_lai_ren_a_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    //移除情报
    const messages = [];
    for (let card of player.getMessagesCopy()) {
      if (card.id !== remainCardId) {
        messages.push(player.removeMessage(card.id));
      }
    }
    GameEventCenter.emit(GameEvent.PLAYER_REMOVE_MESSAGE, { player, messageList: messages });

    if (playerId === 0) {
      UIEventCenter.emit(UIEvent.START_CHOOSE_CHARACTER, {
        characterIdList: roles,
        waitingSecond: waitingSecond,
        confirm: (role) => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_HOU_LAI_REN_B_TOS, {
            role,
            seq,
          });
        },
      });
    } else {
      ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
        playerId: playerId,
        second: waitingSecond,
        type: WaitingType.HANDLE_SKILL,
        seq: seq,
      });
    }

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【后来人】，弃置${messages.length}张情报`));

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }

  onEffectB(gameData: GameData, { playerId, role }: skill_hou_lai_ren_b_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    UIEventCenter.emit(UIEvent.STOP_CHOOSE_CHARACTER);

    for (let skill of player.character.skills) {
      skill.dispose();
    }

    const character = createCharacterById(<number>role);
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}把角色更换为【${character.name}】`));
    player.character = character;

    for (let skill of character.skills) {
      skill.init(gameData, player);
    }

    UIEventCenter.emit(UIEvent.UPDATE_SKILL_BUTTONS);

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
