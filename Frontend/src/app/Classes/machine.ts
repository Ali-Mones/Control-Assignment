import { Part } from "./part";

export class Machine extends Part {
    private radius: number = 40;

    constructor(x: number, y: number, id: number) {
        super();
        this.x = x;
        this.y = y;
        this.id = id;
        this.colour = 'rgba(187, 143, 206, 255)';
    }

    override update(ctx: CanvasRenderingContext2D) {
        this.renderArrow(ctx);
        ctx.strokeStyle = 'rgba(0, 0, 0, 255)'; //black
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 360);
        ctx.stroke();
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.fillStyle = 'rgba(0, 0, 0, 255)';
        ctx.font = '30px Arial'
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"
        ctx.fillText('M' + this.id, this.x, this.y);
    }

    override isMouseInside(mouseX: number, mouseY: number): boolean {
        return (mouseX - this.x) * (mouseX - this.x) + (mouseY - this.y) * (mouseY - this.y) <= this.radius * this.radius;
    }
}
