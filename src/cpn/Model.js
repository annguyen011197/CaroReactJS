export class Winner {
    constructor(state) {
        this.state = state
    }
}

export class Postion {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    isInSize(size) {
        return this.x >= 0 && this.y >= 0
            && this.x < size && this.y < 20
    }
}