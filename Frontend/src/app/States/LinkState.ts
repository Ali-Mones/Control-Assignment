import { Machine } from "../Classes/machine";
import { Part } from "../Classes/part";
import { Queue } from "../Classes/queue";
import { NormalState } from "./NormalState";
import { State } from "./State";

export class LinkState extends State {

    private to!: Part;
    private from!: Part;

    mouseUp(e: MouseEvent): void {
        this.canvas.parts.forEach((part) => {
            if (part.isMouseInside(e.x, e.y - 52)) {
                if (!this.from) {
                    this.from = part;
                }
                else {
                    this.to = part;
                    if (this.from instanceof Machine)
                        this.from.next[0] = this.to
                    else (this.from instanceof Queue)
                        this.from.addNext(this.to);
                    this.to.addPrev(this.from);
                    this.canvas.update();
                    this.canvas.state = new NormalState(this.canvas);
                }
            }
        });
    }
    mouseDown(e: MouseEvent): void {}
    mouseMove(e: MouseEvent): void {}
}