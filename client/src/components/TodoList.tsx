import React from 'react'
import { useParams } from 'react-router-dom'

const TodoList = () => {
    const name = useParams().id
  return (
    <div>
        <p>the name of the todo list is: {name}</p>
    </div>
  )
}

export default TodoList