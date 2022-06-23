import React from 'react'
import { InputProp } from '../../ts-utils/types'

const CreateNewTask = ({value, setValue, handleSubmit}: InputProp) => {
  return (
    <section className="todos__create">
        <input required={true}
                type="text"
                name="text"
                className="todos__create-input"
                onKeyPress={handleSubmit}
                value={value}
                onChange={(e) => setValue(e.target.value)} />
            <label className="todos__create-label">add new task</label>

    </section>
  )
}

export default CreateNewTask