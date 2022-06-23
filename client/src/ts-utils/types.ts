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
    listName?: string,
    tasksList: Array<TaskType>
    updateTask: UpdateTaskFunc
    createTask: CreateTaskFunc
}

export interface SubtaskProp {
    name: string
    listName?: string
    related: string
    done: boolean
    updateTask: UpdateTaskFunc
}

export interface ButtonSetProp {
    active: string
    setActive: React.Dispatch<React.SetStateAction<string>>
    setDisplay: React.Dispatch<React.SetStateAction<TaskType[]>>
    mainTasks: TaskType[]
    todoTasks: TaskType[]
    doneTasks: TaskType[]
}

export interface UpdateTaskFunc {
    (name: string, newData: TaskType): void
}

export interface CreateTaskFunc {
    (newTask: TaskType): Promise<void>
}

export interface InputProp {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    handleSubmit: any
}