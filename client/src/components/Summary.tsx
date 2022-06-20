import Header from './Header'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
interface TodoList {
    name: string
}

const Summary = () => {
    const [todoListNames, setTodoListNames] = useState<Array<TodoList>>([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchListNames = async () => {
            const data = await fetch("https://tout-doux-server.herokuapp.com/lists/all")
            const result = await data.json();
            setTodoListNames([...result])
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
        console.log(todoListNames)
        fetchListNames();
    }, [loading])
    return (
        <main className="page">
            <Header />
            <ul className="todos">
            {loading ? (
                <p>loading todo lists...</p>
            ) : (
                todoListNames.map(todo => {
                    return (
                    <li className="todos__item">
                        <Link to={`/${todo.name}`} key={todo.name}>{todo.name}</Link>
                    </li>) 
                })
            )}
            </ul>
    
        </main>
    )
}

export default Summary