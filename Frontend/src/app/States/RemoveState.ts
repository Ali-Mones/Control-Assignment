import { NormalState } from "./NormalState";
import { State } from "./State";

export class RemoveState extends State {

    mouseUp(e: MouseEvent): void {
        this.canvas.nodes.forEach((part) => {
            if (part.isMouseInside(e.x, e.y - 52)) {
                part.unlinkAll();
                this.canvas.nodes.splice(this.canvas.nodes.indexOf(part), 1);
                this.canvas.update();
                this.canvas.state = new NormalState(this.canvas);
            }
        });
    }
    mouseDown(e: MouseEvent): void {}
    mouseMove(e: MouseEvent): void {}
    
}