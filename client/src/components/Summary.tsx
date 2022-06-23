import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { TodoList } from '../ts-utils/types';
import { CreateNewList } from './input/Index';
import socket from './helpers/socket';
import errorMessage from './helpers/errorMessage';
import InputError from './InputError';
import { styleDefaultError } from './helpers/styles';

const Summary = () => {
    const [todoListNames, setTodoListNames] = useState<Array<TodoList>>([])
    const [loading, setLoading] = useState(true);
    const [valueState, setValueState] = useState("");
    const [error, setError] = useState('')
    const navigate = useNavigate()  

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
            fetchListNames()
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    const handleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const index = todoListNames.findIndex((item) => item.name === valueState)
        if (index !== -1) {
            errorMessage(setError, 'name already exists')
            return;
        }
        if (e.key === 'Enter' && valueState === "") {
            errorMessage(setError, 'please enter a name for your to-do list')
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
                    <InputError error={error} style={styleDefaultError} />
                </>
            )}

        </main>
    )
}

export default Summary