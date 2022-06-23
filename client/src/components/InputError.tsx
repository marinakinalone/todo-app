import React from 'react'

interface StyleError {
    color: string;
    paddingLeft?: string;
    fontSize?: string;
    backgroundColor?: string;
}

interface InputErrorProp {
    error: string,
    style: StyleError
}

const InputError = ({error, style}: InputErrorProp) => {
  return (
    error ? (<p style={style}>{error}</p>) : (<></>)
  )
}

export default InputError