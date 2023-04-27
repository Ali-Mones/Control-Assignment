import { Node } from "../Classes/Node";
import { NormalState } from "./NormalState";
import { State } from "./State";

export class UnlinkState extends State {

    private first!: Node;
    private second!: Node;

    mouseUp(e: MouseEvent): void {

        let node = this.canvas.nodes.filter((node) => {
            return node.isMouseInside(e.x, e.y - 52);
        })[0];

        if (!node) {
            this.first.colour = 'rgba(125, 125, 125, 255)';
            this.canvas.update();
            this.canvas.state = new NormalState(this.canvas);
            return;
        }

        if (!this.first) {
            this.first = node;
            this.first.colour = 'rgba(0, 200, 120, 255)';
        } else {
            this.second = node;
            this.first.unlink(this.second);
            this.second.unlink(this.first);
            this.canvas.update();
            this.canvas.state = new NormalState(this.canvas);
        }
    }
    mouseDown(e: MouseEvent): void {}
    mouseMove(e: MouseEvent): void {}
    
}