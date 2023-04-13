import { MoveState } from "./MoveState";
import { State } from "./State";

export class NormalState extends State {

    mouseUp(e: MouseEvent): void {
    }
    mouseDown(e: MouseEvent): void {
        this.canvas.parts.forEach((part) => {
            if (part.isMouseInside(e.x, e.y - 52)) {
                this.canvas.state = new MoveState(this.canvas, part, e.x, e.y - 52);
            }
        });
    }
    mouseMove(e: MouseEvent): void {
    }
    
}