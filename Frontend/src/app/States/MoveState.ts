import { CanvasComponent } from "../canvas/canvas.component";
import { Node } from "../Classes/Node";
import { NormalState } from "./NormalState";
import { State } from "./State";

export class MoveState extends State {

    constructor(
        canvas: CanvasComponent,
        private node: Node,
        private oldMouseX: number,
        private oldMouseY: number
    ) { super(canvas); }

    override mouseUp(): void {
        this.canvas.state = new NormalState(this.canvas);
    }

    override mouseMove(e: MouseEvent): void {
        let diffX = e.x - this.oldMouseX;
        let diffY = e.y - 52 - this.oldMouseY;

        if (this.node) {
            this.node.x += diffX;
            this.node.y += diffY;
        }

        this.oldMouseX = e.x;
        this.oldMouseY = e.y - 52;
        this.canvas.update();
    }

    mouseDown(e: MouseEvent): void {
        throw new Error("Method not implemented.");
    }

}