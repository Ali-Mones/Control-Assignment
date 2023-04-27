import { Node } from "../Classes/Node";
import { CanvasComponent } from "../canvas/canvas.component";
import { NormalState } from "./NormalState";
import { State } from "./State";

export class LinkState extends State {

    constructor(
        canvas: CanvasComponent,
        arc: boolean
    ) {
        super(canvas);
        this.arc = arc;
    }

    private to!: Node;
    private from!: Node;
    private arc: boolean = false;

    mouseUp(e: MouseEvent): void {

        let node = this.canvas.nodes.filter((node) => {
            return node.isMouseInside(e.x, e.y - 52);
        })[0];

        if (!node) {
            this.from.colour = 'rgba(125, 125, 125, 255)';
            this.canvas.update();
            this.canvas.state = new NormalState(this.canvas);
            return;
        }
        
        if (!this.from) {
            this.from = node;
            this.from.colour = 'rgba(0, 200, 120, 255)';
            this.canvas.update();
        } else {
            this.to = node;

            let gain = prompt("Enter the gain");

            if (!gain) {
                this.from.colour = 'rgba(125, 125, 125, 255)';
                this.canvas.update();
                this.canvas.state = new NormalState(this.canvas);
                return;
            }
            
            if (this.arc && !this.from.next.includes(this.to))
                this.from.arc.push(this.to);
            else if (!this.from.next.includes(this.to))
                this.from.line.push(this.to);
            this.from.addNext(this.to);
            
            
            this.from.gain.push(parseFloat(gain));
            this.from.colour = 'rgba(125, 125, 125, 255)';
            this.canvas.update();
            this.canvas.state = new NormalState(this.canvas);
        }
    }
    
    mouseDown(e: MouseEvent): void {}
    mouseMove(e: MouseEvent): void {}
}