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
        /**
         * @brief fetchContact function
         * @details fetches data from the server to retrieve all the contacts information available.
         * Then it sorts the received data by alphabetic and stores the result in the contacts state.
         * The setTimeout methods allows the function to fetch and store the data before setting the loading state to false. It waits 1 second before executing: long enough to let the user reads the loading message without startling them
         */
        const fetchContacts = async () => {
            const data = await fetch("https://tout-doux-server.herokuapp.com/lists/all")
            const result = await data.json();
            setTodoListNames([...result])
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
        console.log(todoListNames)
        fetchContacts();
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