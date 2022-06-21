import Header from './Header'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { TodoList } from '../ts-utils/types';
import { CreateNewList } from './input/Index';

const Summary = () => {
    const [todoListNames, setTodoListNames] = useState<Array<TodoList>>([])
    const [loading, setLoading] = useState(true);
    const [valueState, setValueState] = useState("");

    useEffect(() => {
        const fetchListNames = async () => {
            const data = await fetch("https://tout-doux-server.herokuapp.com/lists/all")
            const result = await data.json();
            setTodoListNames([...result])
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
        fetchListNames();
    }, [loading])

    const handleSubmit = async (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && valueState !== "") {
            await fetch('https://tout-doux-server.herokuapp.com/lists/create', {
                method: 'POST', 
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"name": valueState})
            })
            const data = await fetch("https://tout-doux-server.herokuapp.com/lists/all")
            const result = await data.json();
            setTodoListNames([...result])
            setValueState('')
        }
    }

    return (
        <main className="page__todos">
            <Header />
            {loading ? (
                <p>loading todo lists...</p>
            ) : (
                <>
                    <ul className="todos">
                        {todoListNames.map(todo => {
                            return (
                                <li className="todos__item" key={todo.name}>
                                    <Link to={`/${todo.name}`}>{todo.name}</Link>
                                </li>)
                        })}
                    </ul>
                    <CreateNewList handleSubmit={handleSubmit} value={valueState} setValue={setValueState} />
                </>
            )}

        </main>
    )
}

export default Summary