import { useState, useEffect }  from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Task } from '../ts-utils/types'

const TodoList = () => {
  const [tasksList, setTasksList] = useState<Array<Task>>([])
  const [loading, setLoading] = useState(true);
  // const [valueState, setValueState] = useState("");

  const list = useParams().id

  useEffect(() => {
      const fetchTasksList = async () => {
          const data = await fetch(`https://tout-doux-server.herokuapp.com/${list}/all`)
          const result = await data.json();
          console.log(result)
          setTasksList([...result])
          setTimeout(() => {
              setLoading(false)
          }, 500)
      }
      fetchTasksList();
  }, [loading])

  return (
    <main className="page__todolist">
        <Link to={`/`}>back</Link>
        <p>the name of the todo list is: {list}</p>
    </main>
  )
}

export default TodoList