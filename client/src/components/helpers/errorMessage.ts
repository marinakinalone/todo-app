const errorMessage = (func:(value: React.SetStateAction<string>) => void, message:string) => {
    func(message)
    setTimeout(() => {
      func('')
    }, 2000)
}

export default errorMessage