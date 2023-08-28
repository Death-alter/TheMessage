import { CardDirection } from "../../Card/type";
import { PassiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { GameEvent, NetworkEventToS, UIEvent } from "../../../Event/type";
import { GameEventCenter, NetworkEventCenter, UIEventCenter } from "../../../Event/EventTarget";
import { GameData } from "../../../Manager/GameData";

export class LianLuo extends PassiveSkill {
  doSendMessage: Function;

  constructor(character: Character) {
    super({
      name: "联络",
      character,
      description: "你传出情报时，可以将情报牌上的箭头视作任意方向。",
    });
  }

  init(gameData: GameData, player) {
    GameEventCenter.on(GameEvent.GAME_INIT, () => {
      if (player.id === 0) {
        gameData.gameObject.uiLayer.createDoSendMessageAction = function () {
          const c = this.selectedHandCards.list[0];
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
                        resolve(CardDirection.LEFT);
                      },
                    },
                    {
                      text: "上",
                      onclick: () => {
                        resolve(CardDirection.UP);
                      },
                    },
                    {
                      text: "右",
                      onclick: () => {
                        resolve(CardDirection.RIGHT);
                      },
                    },
                  ]);
                }),
            },
            {
              name: "selectTarget",
              handler: (direction: CardDirection) =>
                new Promise((resolve, reject) => {
                  const card = this.selectedHandCards.list[0] || c;
                  const data: any = {
                    cardId: card.id,
                    lockPlayerId: [],
                    cardDir: direction == null ? card.direction : direction,
                    seq: this.seq,
                    lockable: card.lockable,
                  };
                  let i;
                  switch (data.cardDir) {
                    case CardDirection.LEFT:
                      i = this.manager.data.playerList.length - 1;
                      while (!this.manager.data.playerList[i].isAlive) {
                        --i;
                      }
                      data.targetPlayerId = i;
                      resolve(data);
                      break;
                    case CardDirection.RIGHT:
                      i = 1;
                      while (!this.manager.data.playerList[i].isAlive) {
                        ++i;
                      }
                      data.targetPlayerId = i;
                      resolve(data);
                      break;
                    case CardDirection.UP:
                      this.tooltip.setText("请选择要传递情报的目标");
                      this.tooltip.buttons.setButtons([]);
                      UIEventCenter.emit(UIEvent.START_SELECT_PLAYER, {
                        num: 1,
                        filter: (player) => {
                          return player.id !== 0;
                        },
                        onSelect: (player) => {
                          data.targetPlayerId = player.id;
                          resolve(data);
                        },
                      });
                      break;
                  }
                }),
            },
            {
              name: "confirmLock",
              handler: (data) =>
                new Promise((resolve, reject) => {
                  if (data.lockable) {
                    switch (data.cardDir) {
                      case CardDirection.LEFT:
                      case CardDirection.RIGHT:
                        this.tooltip.setText("请选择一名角色锁定");
                        UIEventCenter.emit(UIEvent.START_SELECT_PLAYER, {
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
                          switch (data.cardDir) {
                            case CardDirection.LEFT:
                            case CardDirection.RIGHT:
                              data.lockPlayerId = [this.selectedPlayers.list[0].id];
                              break;
                            case CardDirection.UP:
                              data.lockPlayerId = [data.targetPlayerId];
                              break;
                          }
                          resolve(data);
                        },
                        enabled: () => {
                          return this.selectedPlayers.list.length === 1;
                        },
                      },
                      {
                        text: "不锁定",
                        onclick: () => {
                          resolve(data);
                        },
                      },
                    ]);
                  } else {
                    resolve(data);
                  }
                }),
            },
          ];
          return new PlayerAction({
            actions,
            complete: (data) => {
              NetworkEventCenter.emit(NetworkEventToS.SEND_MESSAGE_CARD_TOS, {
                cardId: data.cardId,
                lockPlayerId: data.lockPlayerId,
                targetPlayerId: data.targetPlayerId,
                cardDir: data.cardDir,
                seq: data.seq,
              });

              this.scheduleOnce(() => {
                UIEventCenter.emit(UIEvent.CANCEL_SELECT_HAND_CARD);
                UIEventCenter.emit(UIEvent.CANCEL_SELECT_PLAYER);
              }, 0);
            },
          });
        };
      }
    });
  }

  dispose() {
    GameEventCenter.off(GameEvent.GAME_INIT);
  }

  replaceDefault() {}
}
