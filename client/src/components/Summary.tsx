import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { TodoList } from '../ts-utils/types';
import { CreateNewList } from './input/Index';
import socketIOClient from 'socket.io-client';
const server = "https://tout-doux-server.herokuapp.com";

const Summary = () => {
    const [todoListNames, setTodoListNames] = useState<Array<TodoList>>([])
    const [loading, setLoading] = useState(true);
    const [valueState, setValueState] = useState("");
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const socket = socketIOClient(server);


    useEffect(() => {
        const fetchListNames = async () => {
            const data = await fetch("https://tout-doux-server.herokuapp.com/lists/all")
            const result = await data.json();
            setTodoListNames([...result])
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
        fetchListNames();
        socket.on("changes in todos", data => {
      console.log('new changes in lists')

            fetchListNames()
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    const handleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const index = todoListNames.findIndex((item) => item.name === valueState)
        if (index !== -1) {
            setError('name already exists')
            setTimeout(() => {
                setError('')
            }, 2000)
            return;
        }
        if (e.key === 'Enter' && valueState === "") {
            setError('please enter a name for your to-do list')
            setTimeout(() => {
                setError('')
            }, 2000)
            return;
        }
        
        if (e.key === 'Enter' && valueState !== "" && error === "") {
            await fetch('https://tout-doux-server.herokuapp.com/lists/create', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "name": valueState })
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
                                <li
                                className="todos__item"
                                key={todo.name}
                                onClick={() => navigate(`/${todo.name}`)}
                                >
                                    <Link to={`/${todo.name}`}>{todo.name}</Link>
                                </li>)
                        })}
                    </ul>
                    <CreateNewList handleSubmit={handleSubmit} value={valueState} setValue={setValueState} />
                    {error ? (<p style={{ color: "red" }}>{error}</p>) : (<></>)}
                </>
            )}

        </main>
    )
}

export default Summary