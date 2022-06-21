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
    subtasks?: Array<TaskType>, 
    updateTask: updateTaskFunc
}

export interface updateTaskFunc {
    (name: string, newData: TaskType): void
}