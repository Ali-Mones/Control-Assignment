import { Machine } from "./machine";
import { Part } from "./part";
import { Queue } from "./queue";

export type MachineInfo = {
    ID: number;
    fromQueues: number[];
    toQueue: number;
}

export type returnMachine = {
    id: number;
    color: string;
}

export type QueueInfo = {
    ID: number;
    isEndQueue: boolean;
}

export type returnQueue = {
    id: number;
    numberOfProducts: number;
}

export type CircuitInfo = {
    productsNum: number;
    machines: returnMachine[];
    queues: returnQueue[];
}

export class Adapter {

    static toMachineInfo(m: Machine) {
        let fromIDs: number[] = [];
        m.prev.forEach((part) => {
            fromIDs.push(part.id);
        });
        let info: MachineInfo = {
            ID: m.id,
            fromQueues: fromIDs,
            toQueue: m.next[0].id
        };
        return info;
    }

    static toQueueInfo(q: Queue) {
        if (q.next.length == 0)
            q.isEndQueue = true;
        let info: QueueInfo = {
            ID: q.id,
            isEndQueue: q.isEndQueue
        };
        return info;
    }

    static adapt(parts: Part[], circuitInfo: CircuitInfo) {
        circuitInfo.machines.forEach((returnMachine) => {
            parts.forEach((part) => {
                if (part instanceof Machine && part.id == returnMachine.id) {
                    part.colour = returnMachine.color;
                }
            });
        });

        circuitInfo.queues.forEach((returnQueue) => {
            parts.forEach((part) => {
                if (part instanceof Queue && part.id == returnQueue.id) {
                    part.remaining = returnQueue.numberOfProducts;
                }
            });
        });
    }
}