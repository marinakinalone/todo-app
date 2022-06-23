/* eslint-disable array-callback-return */
import React from 'react'
import { TaskProp, TaskType } from '../../ts-utils/types'
import { Subtask } from './Index'
import { InputError } from '../Index'
import { useState, useEffect } from 'react'
import { CreateNewSubtask } from '../input/Index'
import errorMessage from '../helpers/errorMessage'
import taskContent from '../helpers/taskContent'
import { styleDefaultTask, styleDoneTask, styleSubtaskError } from '../helpers/styles'

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
    const newData = taskContent(name, listName, !state, "main")
    setState(!state)
    updateTask(name, newData)
  }

  const handleSubmitSubtask = async (e: React.KeyboardEvent<HTMLInputElement>, related: string) => {
    const index = subtasks.findIndex((item) => item.name === subtaskInputValue)
    if (index !== -1) {
      errorMessage(setError, 'task description already exists')
      return;
    }
    if (e.key === 'Enter' && subtaskInputValue === "") {
      errorMessage(setError, 'task description cannot be empty')
      return;
    }
    if (e.key === 'Enter' && subtaskInputValue !== "") {
      const newTask = taskContent(subtaskInputValue, listName, false, "sub", name)
      await createTask(newTask)
      setSubtaskInputValue('')
    }
  }

  return (
    <section className="task" style={state === true ? ({ backgroundColor: "#f7f6f2" }) : ({ backgroundColor: "#ffffff" })}>
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
        style={state === true ? (styleDoneTask) : (styleDefaultTask)}
      >
        {name}
      </label>

      {subtasks?.map(task => {
        if (task.related === name) {
          return (<Subtask
            key={task.name}
            name={task.name}
            done={task.done}
            listName={task.listName}
            related={task.related}
            updateTask={updateTask}
          />)
        }
      })
      }

      {state === true ? (<></>) : (<CreateNewSubtask
        value={subtaskInputValue}
        setValue={setSubtaskInputValue}
        handleSubmit={handleSubmitSubtask}
        />)}

      <InputError error={error} style={styleSubtaskError} />

    </section>
  )
}

export default Task