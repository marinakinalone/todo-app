export interface TodoList {
    name: string
}

export interface Task {
    name: string,
    listName: string,
    done: boolean,
    type: 'main' | 'sub',
    related: string | undefined
}