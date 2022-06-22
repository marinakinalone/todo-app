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
    tasksList: Array<TaskType>, 
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
export interface UpdateTaskFunc {
    (name: string, newData: TaskType): void
}

export interface CreateTaskFunc {
    (newTask: TaskType): Promise<void>
}