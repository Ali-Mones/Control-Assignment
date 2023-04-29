import { NormalState } from "./NormalState";
import { State } from "./State";

export class RemoveState extends State {

    mouseUp(e: MouseEvent): void {

        let removedNode = this.canvas.nodes.filter((node) => {
            return node.isMouseInside(e.x, e.y - 52);
        })[0];

        if (!removedNode) {
            this.canvas.state = new NormalState(this.canvas);
            return;
        }
        
        this.canvas.nodes.forEach((node) => {

            let exists = node.next.filter((obj) => {
                return obj.node == removedNode;
            })[0];

            if (exists)
                node.next.splice(node.next.indexOf(exists), 1);
        });

        this.canvas.nodes.splice(this.canvas.nodes.indexOf(removedNode), 1);
        this.canvas.update();
        this.canvas.state = new NormalState(this.canvas);
    }

    mouseDown(e: MouseEvent): void {}
    mouseMove(e: MouseEvent): void {}
    
}
