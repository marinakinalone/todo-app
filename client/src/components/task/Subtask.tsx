import React from 'react'
import { SubtaskProp } from '../../ts-utils/types'
import { useState } from 'react'
import taskContent from '../helpers/taskContent'
import { styleDefaultSubtask, styleDoneSubtask } from '../helpers/styles'

const Subtask = ({name, listName, related, done, updateTask}:SubtaskProp) => {
  const [state, setState] = useState(done);
  const handleStateChange = () => {
    const newData = taskContent(name, listName, !state, "sub", related)
    setState(!state)
    updateTask(name, newData)
  }
  return (
    <article className="subtask" style={state === true ? ({backgroundColor: "#f7f6f2"}):({backgroundColor: "transparent"})}>
    <input
      checked={state}
      onChange={handleStateChange}
      type="checkbox"
      id="subtask-checkbox"
      className="subtask__checkbox"
      />
    <label
      htmlFor="subtask-checkbox"
      className="subtask__description"
      style={state === true ? (styleDoneSubtask):(styleDefaultSubtask)}
    >{name}</label>
    </article>
  )
}

export default Subtask