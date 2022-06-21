import React from 'react'
import { TaskProp } from '../../ts-utils/types'
const Subtask = ({name, done}:TaskProp) => {
  return (
    <p>{name}</p>
  )
}

export default Subtask