import { Node } from "../Classes/Node";
import { NormalState } from "./NormalState";
import { State } from "./State";

export class UnlinkState extends State {

    private first!: Node;
    private second!: Node;

    mouseUp(e: MouseEvent): void {
        this.canvas.nodes.forEach((node) => {
            if (node.isMouseInside(e.x, e.y - 52)) {
                if (!this.first) {
                    this.first = node;
                }
                else {
                    this.second = node;
                    this.first.unlink(this.second);
                    this.second.unlink(this.first);
                    this.canvas.update();
                    this.canvas.state = new NormalState(this.canvas);
                }
            }
        });
    }
    mouseDown(e: MouseEvent): void {}
    mouseMove(e: MouseEvent): void {}
    
}