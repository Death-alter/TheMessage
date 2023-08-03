import { CardDirection } from "../../Card/type";
import { PassiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { PlayerAction } from "../../../UI/PlayerAction";
import { GameEvent, NetworkEventToS } from "../../../Event/type";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameData } from "../../../UI/Game/GameWindow/GameData";

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
        const that = this;
        this.doSendMessage = gameData.gameObject.doSendMessage.bind(gameData.gameObject);

        gameData.gameObject.doSendMessage = async function () {
          const direction = gameData.skillBanned
            ? null
            : await (() =>
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
                }))();

          that.doSendMessage(direction);
        };
      }
    });
  }

  dispose() {
    GameEventCenter.off(GameEvent.GAME_INIT);
  }
}
