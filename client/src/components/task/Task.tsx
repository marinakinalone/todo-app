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
    <section className="task" style={state === true ? ({backgroundColor: "#f7f6f2"}):({backgroundColor: "#ffffff"})}>
      <input
        checked={state}
        onChange={handleStateChange}
        type="checkbox"
        id="task-checkbox"
        className="task__checkbox"
        />
      <label
        htmlFor="task-checkbox"
        className="task__description"
        style={state === true ? ({color: "#727171", backgroundColor: "transparent", fontStyle: "italic"}):({color: "#1f1f1f", backgroundColor: "transparent", fontStyle: "normal"})}
      >
        {name}
      </label>
      {subtasks?.map(task => {
        if (task.related === name) {
          return (<Subtask key={task.name} name={task.name} done={task.done} listName={task.listName} related={task.related} updateTask={updateTask} />)
        }
      })}
    </section>
  )
}

export default Task