import { Node } from "cc";

export function setNodeLayer(node: Node, layer: number) {
  const queue = [node];
  while (queue[0]) {
    if (queue[0].children) {
      queue[0].children.forEach((item) => {
        queue.push(item);
      });
    }
    queue[0].layer = layer;
    queue.shift();
  }
}
