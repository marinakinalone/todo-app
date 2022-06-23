import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TaskType } from '../ts-utils/types'
import { Task } from './task/Index';
import { CreateNewTask } from './input/Index'
import socket from './helpers/socket';
import { styleDefaultError } from './helpers/styles';
import { BackButton, ButtonSet, InputError } from './Index';
import errorMessage from './helpers/errorMessage';

const TodoList = () => {
  const [tasksList, setTasksList] = useState<Array<TaskType>>([])
  const [mainTasks, setMainTasks] = useState<Array<TaskType>>([])
  const [todoTasks, setTodoTasks] = useState<Array<TaskType>>([])
  const [doneTasks, setDoneTasks] = useState<Array<TaskType>>([])
  const [display, setDisplay] = useState<Array<TaskType>>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')
  const [taskInputValue, setTaskInputValue] = useState("");
  const [active, setActive] = useState("all");
  const list = useParams().id

  useEffect(() => {
    const fetchTasksList = async () => {
      const data = await fetch(`https://tout-doux-server.herokuapp.com/${list}/all`)
      const result = await data.json();
      const mainTasksData = result.filter((item: TaskType) => item.type === 'main')
      const todoTasksData = mainTasksData.filter((item: TaskType) => item.done === false)
      const doneTasksData = mainTasksData.filter((item: TaskType) => item.done === true)
      setTasksList([...result])
      setMainTasks([...mainTasksData])
      setTodoTasks([...todoTasksData])
      setDoneTasks([...doneTasksData])
      setDisplay([...mainTasksData])
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
    fetchTasksList();
    socket.on("changes in tasks", data => {
      fetchTasksList()
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const updateTask = async (name: string, newData: TaskType) => {
    await fetch(`https://tout-doux-server.herokuapp.com/${newData.listName}/${name}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    })
    const data = await fetch(`https://tout-doux-server.herokuapp.com/${newData.listName}/all`)
    const result = await data.json();
    const mainTasksData = result.filter((item: TaskType) => item.type === 'main')
    setTasksList([...result])
    setMainTasks([...mainTasksData])
  }

  const createTask = async (newTask: TaskType) => {
    await fetch(`https://tout-doux-server.herokuapp.com/${list}/create`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
    const data = await fetch(`https://tout-doux-server.herokuapp.com/${list}/all`)
    const result = await data.json();
    const mainTasksData = result.filter((item: TaskType) => item.type === 'main')
    const todoTasksData = mainTasksData.filter((item: TaskType) => item.done === false)
    setTasksList([...result])
    setMainTasks([...mainTasksData])
    setTodoTasks([...todoTasksData])
    if (active === 'all') setDisplay(mainTasksData)
    if (active === 'to do') setDisplay(todoTasksData)
  }


  const handleSubmitTask = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const index = mainTasks.findIndex((item) => item.name === taskInputValue)
    if (index !== -1) {
      errorMessage(setError, 'task description already exists')
      return;
    }
    if (e.key === 'Enter' && taskInputValue === "") {
      errorMessage(setError, 'task description cannot be empty')
      return;
    }
    if (e.key === 'Enter' && taskInputValue !== "") {
      const newTask = {
        "name": taskInputValue,
        "listName": list,
        "done": false,
        "type": "main",
        "related": ""
      }
      await createTask(newTask)
      setTaskInputValue('');

    }
  }

  return (
    <main className="page__todolist">
      <BackButton />
      <h2 className="todolist__title">{list}</h2>
      <ButtonSet active={active} setActive={setActive} setDisplay={setDisplay} mainTasks={mainTasks} todoTasks={todoTasks} doneTasks={doneTasks} />
      {loading ? (<p>loading...</p>) : (
        display.map(task => (<Task
          key={task.name}
          name={task.name}
          done={task.done}
          listName={list}
          tasksList={tasksList}
          updateTask={updateTask}
          createTask={createTask}
        />))
      )}
      {active === 'done' ? (<></>) : (<CreateNewTask value={taskInputValue} setValue={setTaskInputValue} handleSubmit={handleSubmitTask} />)}
      <InputError error={error} style={styleDefaultError} />

    </main>
  )
}

export default TodoList