import React from 'react'
import { TaskProp } from '../../ts-utils/types'
import { Subtask } from './Index'
import { useState } from 'react'
const Task = ({ name, done, listName, subtasks, updateTask }: TaskProp) => {
  const [state, setState] = useState(done);
  const handleStateChange = () => {
    const newData = {
      "name": name,
      "listName": listName,
      "done": !state,
      "type": "main",
      "related": ""
    }
    setState(!state)
    updateTask(name, newData)
  }
  return (
    <section className="task">
      <input
        checked={state}
        onChange={handleStateChange}
        type="checkbox"
        id="cbx"
        className="hidden-xs-up" />
      <label
        htmlFor="cbx"
        className="cbx"
      >
        {name}
      </label>
      {subtasks?.map(task => {
        if (task.related === name) {
          return (<Subtask key={task.name} name={task.name} done={task.done} updateTask={updateTask} />)
        }
      })}
    </section>
  )
}

export default Task