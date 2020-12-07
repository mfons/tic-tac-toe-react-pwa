import React from 'react'

function TimeSliceList(props) {
    const items = []

  for (const [index, value] of props.timeSlices.entries()) {
    items.push(<li key={index}><button onClick={() => props.setPointInTime(value)}>{value}</button></li>)
  }
    return (
        <div>
            <ol>{items}</ol>
        </div>
    )
}

export default TimeSliceList
