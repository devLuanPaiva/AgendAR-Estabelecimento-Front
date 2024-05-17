import React from 'react'

const Phrase = (props) => {
  return (
    <p style={{ color: props.color }}>{props.phrase}</p>
  )
}

export default Phrase
