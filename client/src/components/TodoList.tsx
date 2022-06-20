import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


const TodoList = () => {
    const name = useParams().id
  return (
    <section className="todolist">
        <Link to={`/`}>back</Link>
        <p>the name of the todo list is: {name}</p>
    </section>
  )
}

export default TodoList