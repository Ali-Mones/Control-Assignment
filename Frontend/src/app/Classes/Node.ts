export class Node {

    id!: number;
    x!: number;
    y!: number;
    radius: number = 40;
    colour: string = 'rgba(125, 125, 125, 255)';
    next: {node: Node, gain: number, arc: boolean}[] = [];

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

    addNext(next: Node, gain: number, arc: boolean) {
        let exists = this.next.filter((obj) => {
            return obj.node == next;
        })[0];

        if (next != this && !exists)
            this.next.push({node: next, gain: gain, arc: arc});
    }

    unlink(node: Node) {
        let exists = this.next.filter((obj) => {
            return obj.node == node;
        })[0];

        if (exists)
            this.next.splice(this.next.indexOf(exists), 1);
    }

    private renderArrows(ctx: CanvasRenderingContext2D) {
        this.next.forEach((obj, index) => {
            if (obj.arc) {
                if ((this.id + index) % 2 == 0)
                    this.drawArc(ctx, obj, true);
                else
                    this.drawArc(ctx, obj, false);
            }
            else
                this.drawLine(ctx, obj);
        });
    }

    private drawArc(ctx: CanvasRenderingContext2D, to: {node: Node, gain: number, arc: boolean}, up: boolean) {
        let tox = to.node.x;
        let toy = to.node.y;

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
        
        ctx.font = '15px Arial';

        let headlen = 10;
        ctx.beginPath();

        if (up) {
            ctx.fillText(to.gain.toString(), (this.x + tox) * 0.5, (starty + toy) * 0.5 - 0.75 * 200 - 20);

            ctx.moveTo((this.x + tox) * 0.5, (starty + toy) * 0.5 - 0.75 * 200);
            ctx.lineTo((this.x + tox) * 0.5 - headlen * Math.cos(angle - Math.PI / 7), (starty + toy) * 0.5 - 0.75 * 200 - headlen * Math.sin(angle - Math.PI / 7));
            ctx.lineTo((this.x + tox) * 0.5 - headlen * Math.cos(angle - Math.PI / 7), (starty + toy) * 0.5 - 0.75 * 200 - headlen * Math.sin(angle + Math.PI / 7));
            ctx.lineTo((this.x + tox) * 0.5, (starty + toy) * 0.5 - 0.75 * 200);
            ctx.lineTo((this.x + tox) * 0.5 - headlen * Math.cos(angle - Math.PI / 7), (starty + toy) * 0.5 - 0.75 * 200 - headlen * Math.sin(angle - Math.PI / 7));
        }
        else {
            ctx.fillText(to.gain.toString(), (this.x + tox) * 0.5, (starty + toy) * 0.5 + 0.75 * 200 + 20);

            ctx.moveTo((this.x + tox) * 0.5, (starty + toy) * 0.5 + 0.75 * 200);
            ctx.lineTo((this.x + tox) * 0.5 - headlen * Math.cos(angle - Math.PI / 7), (starty + toy) * 0.5 + 0.75 * 200 - headlen * Math.sin(angle - Math.PI / 7));
            ctx.lineTo((this.x + tox) * 0.5 - headlen * Math.cos(angle - Math.PI / 7), (starty + toy) * 0.5 + 0.75 * 200 - headlen * Math.sin(angle + Math.PI / 7));
            ctx.lineTo((this.x + tox) * 0.5, (starty + toy) * 0.5 + 0.75 * 200);
            ctx.lineTo((this.x + tox) * 0.5 - headlen * Math.cos(angle - Math.PI / 7), (starty + toy) * 0.5 + 0.75 * 200 - headlen * Math.sin(angle - Math.PI / 7));
        }
        ctx.stroke();
        ctx.restore();
    }

    private drawLine(ctx: CanvasRenderingContext2D, to: {node: Node, gain: number, arc: boolean}) {
        //variables to be used when creating the arrow
        let headlen = 10;
        let angle = Math.atan2(to.node.y - this.y, to.node.x - this.x);

        let startX: number = this.x + 50 * Math.cos(angle);
        let startY: number = this.y + 50 * Math.sin(angle);
        
        let tox = to.node.x - 55 * Math.cos(angle);
        let toy = to.node.y - 55 * Math.sin(angle);
        

        ctx.font = '15px Arial';
        ctx.fillText(to.gain.toString(), (this.x + tox) * 0.5, (this.y + toy) * 0.5 - 20);

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
