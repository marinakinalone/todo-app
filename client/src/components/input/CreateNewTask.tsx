import React from 'react'

const CreateNewTask = ({taskInputValue, setTaskInputValue, handleSubmit}: any) => {
  return (
    <section className="todos__create">
        <input required={true}
                type="text"
                name="text"
                className="todos__create-input"
                onKeyPress={handleSubmit}
                value={taskInputValue}
                onChange={(e) => setTaskInputValue(e.target.value)} />
            <label className="todos__create-label">add new task</label>

    </section>
  )
}

export default CreateNewTask