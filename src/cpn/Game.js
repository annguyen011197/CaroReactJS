import React, { Component } from 'react'
import Board from './Board';

class Postion {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    isInSize(size) {
        return this.x >= 0 && this.y >= 0
            && this.x < size && this.y < 20
    }
}

export class Game extends Component {
    constructor(props) {
        super(props)
        this.size = 20
        this.state = {
            current: false,
            board: this.initBoard(this.size),
            currentPostion: new Postion(-1,-1)
        }
        this.onCellClick = this.onCellClick.bind(this)
    }

    onCellClick(col, row) {
        const { board: data, current } = this.state;
        if (data[row][col] !== "") return
        data[row][col] = current ? "x" : "o"
        let position = new Postion(col, row)
        this.setState({
            board: data,
            current: !current,
            currentPostion: position
        }, () => {
            if (this.checkWin()) {
                console.log(`win`)
            }
        })
    }

    checkRow(arr) {
        var currentState = ""
        var count = 0
        var startState = -1
        var endIndex = -1
        for (var i = 0; i < arr.length; i++) {
            let state = arr[i]
            if (state === "") continue
            if (currentState != state) {
                currentState = state
                count = 1
                startState = i - 1
            } else {
                count++
            }
            if (count === 5) {
                endIndex = i + 1
                if ((startState > 0 || endIndex < arr.length) &&
                    (arr[startState] === arr[endIndex]
                        && arr[startState] !== currentState)
                ) {
                    continue
                }
                return true
            }
        }
        return false
    }

    check2Head(data, current, startState, endState) {
        console.log("check2Head")
        if (startState.isInSize(20) && endState.isInSize(20)) {
            let start = data[startState.y][startState.x]
            let end = data[endState.y][endState.x]
            if (start === "") return false
            if (end === "") return false
            if (start === end && start !== current) return true
            else return false
        }
        return false
    }

    checkBoard(data, startIndexCal, endIndexCal, nextStep, prevStep) {
        let currentState = ""
        let count = ""
        var startState = new Postion(-1, -1)
        var endState = new Postion(-1, -1)
        var startIndex = startIndexCal()
        var endIndex = endIndexCal()
        let nextIndex = startIndex
        console.log(nextIndex)
        console.log(data[nextIndex.y])
        while (true) {
            let state = data[nextIndex.y][nextIndex.x]
            if (state !== "" && state != undefined) {
                if (currentState != state) {
                    currentState = state
                    count = 1
                    startState = prevStep(nextIndex)
                } else {
                    count++
                }
                if (count === 5) {
                    endState = nextStep(nextIndex)
                    if (!this.check2Head(data, currentState, startState, endState)) {
                        return true
                    }
                }
            }

            nextIndex = nextStep(nextIndex)
            console.log(nextIndex)
            if ((nextIndex.x === endIndex.x && nextIndex.y > endIndex.y)
                || nextIndex.x > endIndex.x) {
                break
            }
        }
        return false
    }

    checkWin() {
        const {board: data, currentPostion} = this.state
        let col = currentPostion.x
        let row = currentPostion.y
        let realSize = this.size - 1
        //Row
        console.log("Row")

        let checkRow = this.checkBoard(data, () => {
            return new Postion(0, row)
        }, () => {
            return new Postion(realSize, row)
        }, (index) => {
            return new Postion(index.x + 1, row)
        }, (index) => {
            return new Postion(index.x - 1, row)
        })

        //Column
        console.log("Column")
        let checkCol = this.checkBoard(data, () => {
            return new Postion(col, 0)
        }, () => {
            return new Postion(col, realSize)
        }, (index) => {
            return new Postion(col, index.y + 1)
        }, (index) => new Postion(col, index.y - 1))

        //LeftRightDown
        console.log("LeftRightDown")
        let checkDown = this.checkBoard(data, () => {
            if (col > row) {
                return new Postion(col - row, 0)
            } else {
                return new Postion(0, row - col)
            }
        }, () => {
            if (col > row) {
                return new Postion(realSize, row + realSize - col)
            } else {
                return new Postion(col + realSize - row, realSize)
            }
        }, (index) => {
            return new Postion(index.x + 1, index.y + 1)
        }, (index) => new Postion(index.x - 1, index.y - 1))

        //LeftRightUp
        console.log("LeftRightUp")

        let checkUp = this.checkBoard(data, () => {
            if (row > realSize - col) {
                return new Postion(realSize -1 , col + row - realSize)
            } else {
                return new Postion(0, col + row)
            }
        }, () => {
            if (row > realSize- col) {
                return new Postion(col + row - realSize, realSize- 1)
            } else {
                return new Postion(col + row, 0)
            }
        }, (index) => {
            return new Postion(index.x + 1, index.y - 1)
        }, (index) => {
            return new Postion(index.x - 1, index.y + 1)
        })
        return checkRow || checkCol || checkDown || checkUp
    }

    initBoard(size) {
        return Array(size).fill("").map(() => Array(size).fill(""))
    }

    render() {
        const { board } = this.state;
        return (
            <div>
                <Board
                    size={this.size}
                    data={board}
                    onCellClick={this.onCellClick} />
            </div>
        )
    }
}


export default Game
