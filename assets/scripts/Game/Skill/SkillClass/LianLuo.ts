import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { CardDirection } from "../../Card/type";
import { Player } from "../../Player/Player";
import { PassiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { PlayerAction } from "../../../UI/PlayerAction";

export class LianLuo extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "联络",
      character,
      description: "你传出情报时，可以将情报牌上的箭头视作任意方向。",
    });
  }

  init(gameData: GameData, player: Player) {
    if (player.id === 0) {
      //自己拥有联络技能时修改默认传递情报方法
      gameData.gameObject.doSendMessage = async function () {
        const card = this.selectedHandCards.list[0];
        const data: any = {
          cardId: card.id,
          lockPlayerId: [],
          cardDir: card.direction,
          seq: this.seq,
        };
        this.selectedHandCards.lock();

        const actions = [
          {
            name: "selectDirection",
            handler: () =>
              new Promise((resolve, reject) => {
                this.tooltip.setText("请选择情报传递的方向");
                this.tooltip.buttons.setButtons([
                  {
                    text: "左",
                    onclick: () => {
                      data.cardDir = CardDirection.LEFT;
                      resolve(null);
                    },
                  },
                  {
                    text: "上",
                    onclick: () => {
                      data.cardDir = CardDirection.UP;
                      resolve(null);
                    },
                  },
                  {
                    text: "右",
                    onclick: () => {
                      data.cardDir = CardDirection.RIGHT;
                      resolve(null);
                    },
                  },
                ]);
              }),
          },
          {
            name: "selectTarget",
            handler: () =>
              new Promise((resolve, reject) => {
                switch (data.cardDir) {
                  case CardDirection.LEFT:
                    data.targetPlayerId = this.data.playerList.length - 1;
                    resolve(null);
                    break;
                  case CardDirection.RIGHT:
                    data.targetPlayerId = 1;
                    resolve(null);
                    break;
                  case CardDirection.UP:
                    this.tooltip.setText("请选择要传递情报的目标");
                    this.tooltip.buttons.setButtons([]);
                    this.startSelectPlayer({
                      num: 1,
                      filter: (player) => {
                        return player.id !== 0;
                      },
                      onSelect: (player) => {
                        data.targetPlayerId = player.id;
                        resolve(null);
                      },
                    });
                    break;
                }
              }),
          },
        ];
        if (card.lockable) {
          actions.push({
            name: "confirmLock",
            handler: () =>
              new Promise((resolve, reject) => {
                switch (card.direction) {
                  case CardDirection.LEFT:
                  case CardDirection.RIGHT:
                    this.tooltip.setText("请选择一名角色锁定");
                    this.startSelectPlayer({
                      num: 1,
                      filter: (player) => {
                        return player.id !== 0;
                      },
                    });
                    break;
                  case CardDirection.UP:
                    this.tooltip.setText("是否锁定该角色");
                    break;
                }
                this.tooltip.buttons.setButtons([
                  {
                    text: "锁定",
                    onclick: () => {
                      switch (card.direction) {
                        case CardDirection.LEFT:
                        case CardDirection.RIGHT:
                          data.lockPlayerId = [this.selectedPlayers.list[0].id];
                          break;
                        case CardDirection.UP:
                          data.lockPlayerId = [data.targetPlayerId];
                          break;
                      }
                      resolve(null);
                    },
                    enabled: () => {
                      return this.selectedPlayers.list.length === 1;
                    },
                  },
                  {
                    text: "不锁定",
                    onclick: () => {
                      resolve(null);
                    },
                  },
                ]);
              }),
          });
        }

        this.playerAction = new PlayerAction({
          actions,
          complete: () => {
            NetworkEventCenter.emit(NetworkEventToS.SEND_MESSAGE_CARD_TOS, data);

            this.scheduleOnce(() => {
              this.selectedPlayers.unlock();
              this.selectedHandCards.unlock();
              this.stopSelectHandCard();
              this.clearSelectedHandCards();
              this.stopSelectPlayer();
              this.clearSelectedPlayers();
            }, 0);
          },
        });

        this.playerAction.start();
      }.bind(gameData.gameObject);
    }
  }

  dispose() {}
}
