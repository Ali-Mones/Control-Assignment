import { CanvasComponent } from "../canvas/canvas.component";

export abstract class State {

    constructor(protected canvas: CanvasComponent) {}

    abstract mouseUp(e: MouseEvent): void;
    abstract mouseDown(e: MouseEvent): void;
    abstract mouseMove(e: MouseEvent): void;
}