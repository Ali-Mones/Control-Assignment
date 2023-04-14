export class Node {

    id!: number;
    x!: number;
    y!: number;
    radius: number = 40;
    colour: string = 'rgba(125, 125, 125, 255)';
    next: Node[] = [];
    prev: Node[] = [];

    line: Node[] = [];
    arc: Node[] = [];

    constructor(x: number, y: number, id: number) {
        this.x = x;
        this.y = y;
        this.id = id;
    }

    update(ctx: CanvasRenderingContext2D) {
        this.renderArrows(ctx);
        ctx.strokeStyle = 'rgba(0, 0, 0, 255)'; //black
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 360);
        ctx.stroke();
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.fillStyle = 'rgba(0, 0, 0, 255)';
        ctx.font = '15px Arial'
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"
        ctx.fillText('Node ' + this.id, this.x, this.y);
    }

    isMouseInside(mouseX: number, mouseY: number) {
        return (mouseX - this.x) * (mouseX - this.x) + (mouseY - this.y) * (mouseY - this.y) <= this.radius * this.radius;
    }

    addPrev(prev: Node): void {
        if (!this.prev.includes(prev))
            this.prev.push(prev);
    }

    addNext(next: Node) {
        if (next != this && !this.next.includes(next))
            this.next.push(next);
    }

    unlink(node: Node) {
        if (this.next.includes(node))
            this.next.splice(this.next.indexOf(node), 1);
        if (this.prev.includes(node))
            this.prev.splice(this.prev.indexOf(node), 1);
    }

    unlinkAll() {
        this.next.forEach((next) => {
            next.unlink(this);
        });
        this.prev.forEach((prev) => {
            prev.unlink(this);
        });
        this.next = [];
        this.prev = [];
    }

    private renderArrows(ctx: CanvasRenderingContext2D) {
        this.arc.forEach((node, index) => {
            if (this.id % 2 == 0) {
                if (index % 2 == 0)
                    this.drawArc(ctx, node.x, node.y, true);
                else
                    this.drawArc(ctx, node.x, node.y, false);
            }
            else {
                if (index % 2 == 0)
                    this.drawArc(ctx, node.x, node.y, false);
                else
                    this.drawArc(ctx, node.x, node.y, true);
            }
        });

        this.line.forEach((node) => {
            this.drawLine(ctx, node.x, node.y);
        });
    }

    private drawArc(ctx: CanvasRenderingContext2D, tox: number, toy: number, up: boolean) {
        let angle = Math.atan2(toy - this.y, tox - this.x);

        if (up) {
            var starty = this.y - this.radius;
            toy = toy - this.radius;
        }
        else {
            starty = this.y + this.radius;
            toy = toy + this.radius;
        }

        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.moveTo(this.x, starty);
        if (up)
            ctx.bezierCurveTo(this.x, starty - 200, tox, toy - 200, tox, toy);
        else
            ctx.bezierCurveTo(this.x, starty + 200, tox, toy + 200, tox, toy);
        ctx.stroke();

        let headlen = 10;
        ctx.beginPath();
        if (up) {
            ctx.moveTo((this.x + tox) * 0.5, (starty + toy) * 0.5 - 0.75 * 200);
            ctx.lineTo((this.x + tox) * 0.5 - headlen * Math.cos(angle - Math.PI / 7), (starty + toy) * 0.5 - 0.75 * 200 - headlen * Math.sin(angle - Math.PI / 7));
            ctx.lineTo((this.x + tox) * 0.5 - headlen * Math.cos(angle - Math.PI / 7), (starty + toy) * 0.5 - 0.75 * 200 - headlen * Math.sin(angle + Math.PI / 7));
            ctx.lineTo((this.x + tox) * 0.5, (starty + toy) * 0.5 - 0.75 * 200);
            ctx.lineTo((this.x + tox) * 0.5 - headlen * Math.cos(angle - Math.PI / 7), (starty + toy) * 0.5 - 0.75 * 200 - headlen * Math.sin(angle - Math.PI / 7));
        }
        else {
            ctx.moveTo((this.x + tox) * 0.5, (starty + toy) * 0.5 + 0.75 * 200);
            ctx.lineTo((this.x + tox) * 0.5 - headlen * Math.cos(angle - Math.PI / 7), (starty + toy) * 0.5 + 0.75 * 200 - headlen * Math.sin(angle - Math.PI / 7));
            ctx.lineTo((this.x + tox) * 0.5 - headlen * Math.cos(angle - Math.PI / 7), (starty + toy) * 0.5 + 0.75 * 200 - headlen * Math.sin(angle + Math.PI / 7));
            ctx.lineTo((this.x + tox) * 0.5, (starty + toy) * 0.5 + 0.75 * 200);
            ctx.lineTo((this.x + tox) * 0.5 - headlen * Math.cos(angle - Math.PI / 7), (starty + toy) * 0.5 + 0.75 * 200 - headlen * Math.sin(angle - Math.PI / 7));
        }
        ctx.stroke();
        ctx.restore();
    }

    private drawLine(ctx: CanvasRenderingContext2D, tox: number, toy: number) {
        //variables to be used when creating the arrow
        let headlen = 10;
        let angle = Math.atan2(toy - this.y, tox - this.x);

        let startX: number = this.x + 50 * Math.cos(angle);
        let startY: number = this.y + 50 * Math.sin(angle);

        tox = tox - 55 * Math.cos(angle);
        toy = toy - 55 * Math.sin(angle);

        ctx.save();
        ctx.strokeStyle = 'rgba(0, 0, 0, 255)';

        //starting path of the arrow from the start square to the end square
        //and drawing the stroke
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(tox, toy);
        ctx.lineWidth = 5;
        ctx.stroke();

        //starting a new path from the head of the arrow to one of the sides of
        //the point
        ctx.beginPath();
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));

        //path from the side point of the arrow, to the other side point
        ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7), toy - headlen * Math.sin(angle + Math.PI / 7));

        //path from the side point back to the tip of the arrow, and then
        //again to the opposite side point
        ctx.lineTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));

        //draws the paths created above
        ctx.stroke();
        ctx.restore();
    }
}