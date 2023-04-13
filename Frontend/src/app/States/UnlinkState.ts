import { Part } from "../Classes/part";
import { NormalState } from "./NormalState";
import { State } from "./State";

export class UnlinkState extends State {

    private first!: Part;
    private second!: Part;

    mouseUp(e: MouseEvent): void {
        this.canvas.parts.forEach((part) => {
            if (part.isMouseInside(e.x, e.y - 52)) {
                if (!this.first) {
                    this.first = part;
                }
                else {
                    this.second = part;
                    console.log(this.first, this.second);
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