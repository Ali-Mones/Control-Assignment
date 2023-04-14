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
}