/* eslint-disable array-callback-return */
import React from 'react'
import { TaskProp, TaskType } from '../../ts-utils/types'
import { Subtask } from './Index'
import { useState, useEffect } from 'react'
import { CreateNewSubtask } from '../input/Index'

const Task = ({ name, done, listName, tasksList, updateTask, createTask }: TaskProp) => {
  const [state, setState] = useState(done);
  const [subtasks, setSubtasks] = useState<Array<TaskType>>([])
  const [subtaskInputValue, setSubtaskInputValue] = useState("");
  const [error, setError] = useState('')


  useEffect(() => {
    const subtasksData = tasksList.filter((item: TaskType) => item.type === 'sub')
    setSubtasks([...subtasksData])
  }, [tasksList])

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

  const handleSubmitSubtask = async (e: React.KeyboardEvent<HTMLInputElement>, related: string) => {
    const index = subtasks.findIndex((item) => item.name === subtaskInputValue)
    if (index !== -1) {
        setError('task description already exists')
        setTimeout(() => {
            setError('')
        }, 2000)
        return;
    }
    if (e.key === 'Enter' && subtaskInputValue === "") {
        setError('task description cannot be empty')
        setTimeout(() => {
            setError('')
        }, 2000)
        return;
    }
    if (e.key === 'Enter' && subtaskInputValue !== "") {
      const newTask = {
        "name": subtaskInputValue,
        "listName": listName,
        "done": false,
        "type": "sub",
        "related": name
      }
      await createTask(newTask)
      setSubtaskInputValue('')
    }
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
      })
      }
      {state === true? (<></>) :(<CreateNewSubtask subtaskInputValue={subtaskInputValue} setSubtaskInputValue={setSubtaskInputValue} handleSubmitSubtask={handleSubmitSubtask} />)}
      {error ? (<p style={{ color: "red", paddingLeft: "2rem", fontSize: "0.9rem", backgroundColor:"#ffffff" }}>{error}</p>) : (<></>)}
    </section>
  )
}

export default Task