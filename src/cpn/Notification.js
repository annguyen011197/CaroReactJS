import React, { Component } from 'react'

export class Notification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            history: []
        }
    }

    pushHistory(state, col, row) {
        console.log("push History")
        const {history} = this.state;
        history.push(`${state} moved on column ${col} row ${row}`)
        this.setState({
            history: history
        })
    }
    renderWiner(winner) {
        if (winner != undefined){
            return <p>{`Winner is ${winner.state}`}</p>
        } else {
            return <div></div>
        }
    }
    renderHistory() {
        const {history} = this.state;
        return history.map((value) => {
            return <li><p>{value}</p></li>
        })
    }
    render() {
        const {nextMove, winner} = this.props;
        console.log(this.state.history)
        return (
            <div>
                {this.renderWiner(winner)}
                <p>{`Next move: ${nextMove}`}</p>
                <ol>{this.renderHistory()}  </ol>
            </div>
        )
    }
}

export default Notification
