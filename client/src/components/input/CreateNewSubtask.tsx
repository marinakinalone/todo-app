import React from 'react'

const CreateNewSubtask = ({ subtaskInputValue, setSubtaskInputValue, handleSubmitSubtask }: any) => {
    return (
        <section className="subtask__create">
            <input required={true}
                type="text"
                name="subtext"
                className="subtask__create-input"
                onKeyPress={handleSubmitSubtask}
                value={subtaskInputValue}
                onChange={(e) => setSubtaskInputValue(e.target.value)}
                placeholder="new subtask" />

            <span className="subtask__create-border"></span>
        </section>
    )
}

export default CreateNewSubtask