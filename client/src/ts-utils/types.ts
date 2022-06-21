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
    updateTask: updateTaskFunc
    related?: string,
    listName?: string,
    subtasks?: Array<TaskType>, 
    setSubtasks?:React.Dispatch<React.SetStateAction<TaskType[]>>
}

export interface updateTaskFunc {
    (name: string, newData: TaskType): void
}