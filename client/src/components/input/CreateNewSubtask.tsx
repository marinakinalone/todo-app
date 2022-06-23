import React from 'react'
import { InputProp } from '../../ts-utils/types'

const CreateNewSubtask = ({ value, setValue, handleSubmit}: InputProp) => {
    return (
        <section className="subtask__create">
            <input required={true}
                type="text"
                name="subtext"
                className="subtask__create-input"
                onKeyPress={handleSubmit}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="new subtask" />
            <span className="subtask__create-border"></span>
        </section>
    )
}

export default CreateNewSubtask