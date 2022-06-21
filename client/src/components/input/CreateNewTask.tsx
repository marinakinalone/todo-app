import React from 'react'

const CreateNewTask = ({valueState, setValueState, handleSubmit}: any) => {
  return (
    <section className="task__create">
        <input required={true}
                type="text"
                name="text"
                className="task__create-input"
                onKeyPress={handleSubmit}
                value={valueState}
                onChange={(e) => setValueState(e.target.value)} />
            <label className="todos__create-label">add new task</label>
    </section>
  )
}

export default CreateNewTask