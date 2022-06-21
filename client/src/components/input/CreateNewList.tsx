import React from 'react'

const CreateNewList = ({handleSubmit, value, setValue}: any) => {
    return (
        <section className="todos__create">
            <input required={true}
                type="text"
                name="text"
                className="todos__create-input"
                onKeyPress={handleSubmit}
                value={value}
                onChange={(e) => setValue(e.target.value)} />
            <label className="todos__create-label">create a new list</label>
        </section>
    )
}

export default CreateNewList