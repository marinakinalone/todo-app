import React from 'react'
import { SubtaskProp } from '../../ts-utils/types'
import { useState } from 'react'

const Subtask = ({name, listName, related, done, updateTask}:SubtaskProp) => {
  const [state, setState] = useState(done);
  const handleStateChange = () => {
    const newData = {
      "name": name,
      "listName": listName,
      "done": !state,
      "type": "sub",
      "related": related
    }
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
      style={state === true ? ({color: "#727171", backgroundColor: "transparent", fontStyle: "italic"}):({color: "#1f1f1f", backgroundColor: "transparent", fontStyle: "normal"})}
    >{name}</label>
    </article>
  )
}

export default Subtask