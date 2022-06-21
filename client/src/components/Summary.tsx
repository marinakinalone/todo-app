import Header from './Header'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { TodoList } from '../ts-utils/types';

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
        <main className="page__todos">
            <Header />

            {loading ? (
                <p>loading todo lists...</p>
            ) : (
                <>
                    <ul className="todos">
                        {todoListNames.map(todo => {
                            return (
                                <li className="todos__item">
                                    <Link to={`/${todo.name}`} key={todo.name}>{todo.name}</Link>
                                </li>)
                        })}
                    </ul>
                    <section className="todos__create">
                        <input required={true} type="text" name="text" className="todos__create-input" />
                        <label className="todos__create-label">create a new list</label>
                    </section>
                </>
            )}

        </main>
    )
}

export default Summary