import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { TaskType } from '../ts-utils/types'
import { Task } from './task/Index';
import { CreateNewTask } from './input/Index'

const TodoList = () => {
  const [tasksList, setTasksList] = useState<Array<TaskType>>([])
  const [subtasksList, setSubtasksList] = useState<Array<TaskType>>([])
  const [loading, setLoading] = useState(true);
  // const [valueState, setValueState] = useState("");

  const list = useParams().id


  useEffect(() => {
    const fetchTasksList = async () => {
      const data = await fetch(`https://tout-doux-server.herokuapp.com/${list}/all`)
      const result = await data.json();
      const tasksData = result.filter((item: TaskType) => item.type === 'main')
      const subtasksData = result.filter((item: TaskType) => item.type === 'sub')
      setTasksList([...tasksData])
      setSubtasksList([...subtasksData])
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
    fetchTasksList();
  }, [loading])

  const updateTask = async (name: string, newData: TaskType) => {
    console.log(newData)
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
    const tasksData = result.filter((item: TaskType) => item.type === 'main')
    const subtasksData = result.filter((item: TaskType) => item.type === 'sub')
    setTasksList([...tasksData])
    setSubtasksList([...subtasksData])
  }

  //   const handleSubmit = async (e:React.KeyboardEvent<HTMLInputElement>) => {
  //     if (e.key === 'Enter' && valueState !== "") {
  //         await fetch('https://tout-doux-server.herokuapp.com/lists/create', {
  //             method: 'POST', 
  //             mode: 'cors',
  //             headers: {
  //                 'Content-Type': 'application/json'
  //             },
  //             body: JSON.stringify({"name": valueState})
  //         })
  //         const data = await fetch("https://tout-doux-server.herokuapp.com/lists/all")
  //         const result = await data.json();
  //         setTodoListNames([...result])
  //         setValueState('')
  //     }
  // }

  return (
    <main className="page__todolist">
      <Link to={`/`}>go back to lists</Link>
      <h2>{list}</h2>
      {loading ? (<p>loading...</p>) : (
        tasksList.map(task => (<Task key={task.name} name={task.name} done={task.done} listName={list} subtasks={subtasksList} updateTask={updateTask} />))
      )}
      <CreateNewTask />
    </main>
  )
}

export default TodoList