import React from 'react'

const Square = (props) => {
    const {onClick, value, x, y} = props
    return (
        <button onClick={()=>{
            console.log(`Clicked on col${x} row${y}`)
            onClick(x,y)
        }} className="square">
            {value}
        </button>
    )
}

export default Square;