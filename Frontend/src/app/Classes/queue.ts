import { Part } from "./part";

export class Queue extends Part {

    private width = 80;
    private height = 50;
    remaining: number = 0;
    isEndQueue: boolean = false;

    constructor(x: number, y: number, id: number) {
        super();
        this.x = x;
        this.y = y;
        this.id = id;
    }

    override update(ctx: CanvasRenderingContext2D): void {
        this.colour = 'rgba(255, 255, 148, 255)'
        this.renderArrow(ctx);
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'rgba(0, 0, 0, 255)'; //black
        ctx.beginPath();
        ctx.strokeRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 255)';
        ctx.font = '24px Arial'
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"
        ctx.fillText('Q' + this.id + ': ' + this.remaining, this.x, this.y);
    }
    override isMouseInside(mouseX: number, mouseY: number): boolean {
        return mouseX >= this.x - this.width / 2 && mouseX <= this.x + this.width / 2 && mouseY >= this.y - this.height / 2 && mouseY <= this.y + this.height / 2;
    }
}