import { NormalState } from "./NormalState";
import { State } from "./State";

export class RemoveState extends State {

    mouseUp(e: MouseEvent): void {

        let removedNode = this.canvas.nodes.filter((node) => {
            return node.isMouseInside(e.x, e.y - 52);
        })[0];

        if (!removedNode) {
            this.canvas.state = new NormalState(this.canvas);
            return;
        }
        
        this.canvas.nodes.forEach((node) => {

            let exists = node.next.filter((obj) => {
                return obj.node == removedNode;
            })[0];

            if (exists)
                node.next.splice(node.next.indexOf(exists), 1);

            // if (node.next.includes(removedNode)) {
            //     let index = node.next.indexOf(removedNode);
            //     node.next.splice(index, 1);
            // }

            // if (node.arc.includes(removedNode)) {
            //     let index = node.arc.indexOf(removedNode);
            //     node.arc.splice(index, 1);
            // }

            // if (node.line.includes(removedNode)) {
            //     let index = node.line.indexOf(removedNode);
            //     node.line.splice(index, 1);
            // }
            
            // let gain = node.gain.filter((gainObj) => {
            //     return gainObj.node.id == removedNode.id;
            // })[0];

            // if (gain)
            //     node.gain.splice(node.gain.indexOf(gain), 1);
        });

        this.canvas.nodes.splice(this.canvas.nodes.indexOf(removedNode), 1);
        this.canvas.update();
        this.canvas.state = new NormalState(this.canvas);
    }

    mouseDown(e: MouseEvent): void {}
    mouseMove(e: MouseEvent): void {}
    
}
