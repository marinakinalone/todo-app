import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { TaskType } from '../ts-utils/types'
import { Task } from './task/Index';
import { CreateNewTask } from './input/Index'
import socketIOClient from 'socket.io-client';
const server = "https://tout-doux-server.herokuapp.com";

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
  const socket = socketIOClient(server);
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
    socket.on("changes", data => {
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
            setError('task description already exists')
            setTimeout(() => {
                setError('')
            }, 2000)
            return;
        }
        if (e.key === 'Enter' && taskInputValue === "") {
            setError('task description cannot be empty')
            setTimeout(() => {
                setError('')
            }, 2000)
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

  const styleActive = {
    color: "#ffffff",
    backgroundColor: "#a3499a",
    borderColor: "#a3499a"

  }

  const styleDefault = {
    color: "#1f1f1f",
    backgroundColor: "transparent",
    borderColor: "#1f1f1f"
  }

  return (
    <main className="page__todolist">
      <button className="todolist__button">
        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
        <span><Link to={`/`}>back to lists</Link></span>
      </button>
      <h2 className="todolist__title">{list}</h2>
      <section className="filters">
        <p>show:</p>
        <button className="button__filter"
          style={active === "all" ? (styleActive) : (styleDefault)} onClick={() => {
            setDisplay(mainTasks)
            setActive("all")
          }}>ALL</button>
        <button className="button__filter"
          style={active === "to do" ? (styleActive) : (styleDefault)}
          onClick={() => {
            setDisplay(todoTasks)
            setActive("to do")
          }}>TO DO</button>
        <button className="button__filter"
        style={active === "done" ? (styleActive):(styleDefault)}
        onClick={() => {
          setDisplay(doneTasks)
          setActive("done")
        }}>DONE</button>
      </section>
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
      {active === 'done' ? (<></>) : (<CreateNewTask taskInputValue={taskInputValue} setTaskInputValue={setTaskInputValue} handleSubmit={handleSubmitTask} />)}
      {error ? (<p style={{ color: "red" }}>{error}</p>) : (<></>)}
  
    </main>
  )
}

export default TodoList