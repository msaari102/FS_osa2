import React from 'react'

const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <>
      <h2>{props.course.name}</h2>
      </>
    )
  }
  
  const Content  = ({parts}) => {
    return (
    <>  
      {parts.map(part => <Part part={part} key={part.id}/>)}
    </>
    )
  }
  
  const Part  = (props) => {
    return (
    <>  
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce( (s, p) => {
      return s + p.exercises
    },0)
    return (
      <b>Total of {total} exercises</b>
    )
  }

  export default Course