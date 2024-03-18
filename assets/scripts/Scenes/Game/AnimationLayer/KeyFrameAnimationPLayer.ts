import { _decorator, Component, instantiate, Node, Prefab, tween, UITransform, Vec2 } from "cc";
const { ccclass, property } = _decorator;
import { KeyframeAnimation, KeyframeAnimationManager } from "./KeyFrameAnimation";
import { Player } from "../../../Components/Player/Player";
import { ActionLocation, CardActionLocation, MoveNodeParams } from "../../../Manager/type";
import { CardObject } from "../../../Components/Card/CardObject";
import { HandCardList } from "../../../Components/Container/HandCardList";
import config from "../../../config";

@ccclass("KeyFrameAnimationLayer")
export class KeyFrameAnimationPlayer extends Component {
  @property(Node)
  deckNode: Node | null = null;
  @property(Node)
  discardPileNode: Node | null = null;
  @property(Prefab)
  line: Prefab | null = null;

  public transmissionMessageObject: CardObject;
  public handCardList: HandCardList;

  private getLocation(location: CardActionLocation, player?: Player) {
    switch (location) {
      case CardActionLocation.DECK:
        return this.deckNode.worldPosition;
      case CardActionLocation.DISCARD_PILE:
        return this.discardPileNode.worldPosition;
      case CardActionLocation.PLAYER:
        return (
          player && player.gameObject && player.gameObject.node.getChildByPath("Border/CharacterPanting").worldPosition
        );
      case CardActionLocation.PLAYER_HAND_CARD:
        return player && player.gameObject && player.gameObject.node.worldPosition;
      case CardActionLocation.PLAYER_MESSAGE_ZONE:
        return player && player.gameObject && player.gameObject.node.getChildByPath("Border/Message").worldPosition;
      default:
        return this.node.worldPosition;
    }
  }

  private moveNode({ node, from, to, duration = config.animationDuration }: MoveNodeParams) {
    const fromPosition = this.getLocation(from.location, from.player);
    const toPosition = this.getLocation(to.location, to.player);
    KeyframeAnimationManager.playAnimation(node, [
      {
        attribute: "worldPosition",
        from: fromPosition,
        to: toPosition,
        duration,
      },
    ]);
  }

  showIndicantLine({
    from,
    to,
    duration = config.animationDuration,
  }: {
    from: ActionLocation;
    to: ActionLocation;
    duration?: number;
  }) {
    const line = instantiate(this.line);
    this.node.addChild(line);
    const fromPosition = this.getLocation(from.location, from.player);
    const toPosition = this.getLocation(to.location, to.player);
    const dx = toPosition.x - fromPosition.x;
    const dy = toPosition.y - fromPosition.y;

    line.worldPosition = fromPosition;
    const transform = line.getComponent(UITransform);
    transform.width = 0;
    const dir = new Vec2(dx, -dy);
    const degree = (dir.signAngle(new Vec2(1, 0)) / Math.PI) * 180;
    line.angle = degree;
    line.active = true;
    KeyframeAnimationManager.playAnimation(transform, [
      {
        attribute: "width",
        to: Math.sqrt(dx * dx + dy * dy),
        duration,
      },
    ]).then(() => {
      setTimeout(() => {
        this.node.removeChild(line);
      }, 1000);
    });
  }

  update(dt: number): void {
    KeyframeAnimationManager.apf();
  }
}
