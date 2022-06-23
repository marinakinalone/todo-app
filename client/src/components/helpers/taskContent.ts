const taskContent = (name: string, listName: string | undefined, done: boolean, type:string, related: string = "") => {
    return {
        "name": name,
        "listName": listName,
        "done": done,
        "type": type,
        "related": related
    }
}
 export default taskContent