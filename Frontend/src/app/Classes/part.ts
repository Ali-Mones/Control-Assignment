export abstract class Part {

    x!: number;
    y!: number;
    id!: number;
    colour!: string;
    next: Part[] = [];
    prev: Part[] = [];

    abstract update(ctx: CanvasRenderingContext2D): void;
    abstract isMouseInside(mouseX: number, mouseY: number): boolean;

    public addNext(part: Part): void {
        if (!this.next.includes(part))
            this.next.push(part);
    }

    public addPrev(part: Part): void {
        if (!this.prev.includes(part))
            this.prev.push(part);
    }

    public unlink(second: Part): void {
        if (this.prev.includes(second)) {
            this.prev.splice(this.prev.indexOf(second), 1);
        }
        if (this.next.includes(second)) {
            this.next.splice(this.next.indexOf(second), 1);
        }
    }

    public unlinkAll() {
        this.prev.forEach((prev) => {
            prev.unlink(this);
        });
        this.next.forEach((next) => {
            next.unlink(this);
        });
        this.prev = [];
        this.next = [];
    }

    protected renderArrow(ctx: CanvasRenderingContext2D) {
        this.next.forEach((part) => {
            this.drawArrow(ctx, part.x, part.y);
        });
    }

    private drawArrow(ctx: CanvasRenderingContext2D, tox: number, toy: number) {
        //variables to be used when creating the arrow
        var headlen = 10;
        var angle = Math.atan2(toy - this.y, tox - this.x);

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