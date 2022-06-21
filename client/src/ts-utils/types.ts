export interface TodoList {
    name: string
}

export interface TaskType {
    name: string,
    listName: string | undefined,
    done: boolean,
    type: string,
    related: string | undefined
}

export interface TaskProp {
    name: string,
    done: boolean,
    related?: string,
    listName?: string,
    updateTask: updateTaskFunc
    subtasks?: Array<TaskType>, 
    valueState?: string
    setValueState?: React.Dispatch<React.SetStateAction<string>>
    handleSubmit?: (e: React.KeyboardEvent<HTMLInputElement>) => Promise<void>
}

export interface updateTaskFunc {
    (name: string, newData: TaskType): void
}