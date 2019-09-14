import React, { Component } from 'react'
import Square from './Square';

export class Board extends Component {
    renderBoard(size) {
        const { onCellClick, data } = this.props
        let board = []
        for (var i = 0; i < size; i++) {
            board.push(<Row
                size={size}
                index={i}
                row={data[i]}
                onCellClick={onCellClick}
            />)
        }
        return board
    }

    render() {
        const { size } = this.props
        console.log(this.props)
        return (
            <div>
                {this.renderBoard(size)}
            </div>
        )
    }
}

const Row = (props) => {
    const { size, index, row: data, onCellClick } = props;
    let row = []
    for (var i = 0; i < size; i++) {
        row.push(
            <Square
                x={i}
                y={index}
                value={data[i]}
                onClick={(x,y) => onCellClick(x,y)}
            />
        )
    }
    return <div className="board-row">{row}</div>
}

export default Board;