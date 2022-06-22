import React from 'react'

const CreateNewSubtask = ({subtaskInputValue, setSubtaskInputValue, handleSubmitSubtask}: any) => {
  return (
    <section className="subtask__create">
        <input required={true}
                type="text"
                name="subtext"
                className="subtask__create-input"
                onKeyPress={handleSubmitSubtask}
                value={subtaskInputValue}
                onChange={(e) => setSubtaskInputValue(e.target.value)} />
            <label className="subtask__create-label">add new subtask</label>
    </section>
  )
}

export default CreateNewSubtask