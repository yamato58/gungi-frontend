export class MovePiece {
    id: number;
    nextX: number;
    nextY: number;
    nextZ: number;
    isPlayer: boolean;
    isGet: boolean;


    constructor(id: number, x: number, y: number, z: number, player: boolean, get: boolean) {
        this.id = id;
        this.nextX = x;
        this.nextY = y;
        this.nextZ = z;
        this.isPlayer = player;
        this.isGet = get;
    }
}