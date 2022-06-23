import React from 'react'
import { ButtonSetProp } from '../ts-utils/types'
import { styleActive, styleDefault } from './helpers/styles';

const ButtonSet = ({active, setActive, setDisplay, mainTasks, todoTasks, doneTasks}: ButtonSetProp ) => {
  return (
    <section className="filters">
    <p>show:</p>
    <button className="button__filter"
      style={active === "all" ? (styleActive) : (styleDefault)} onClick={() => {
        setDisplay(mainTasks)
        setActive("all")
      }}>ALL</button>
    <button className="button__filter"
      style={active === "to do" ? (styleActive) : (styleDefault)}
      onClick={() => {
        setDisplay(todoTasks)
        setActive("to do")
      }}>TO DO</button>
    <button className="button__filter"
    style={active === "done" ? (styleActive):(styleDefault)}
    onClick={() => {
      setDisplay(doneTasks)
      setActive("done")
    }}>DONE</button>
  </section>
  )
}

export default ButtonSet