import { useContext } from "react"
import { ThemContext } from "../ThemContext"


const AnotherComponent = () => {
  const datacontext = useContext(ThemContext)

const check = () => {
  datacontext.setThem('hhhhuuuuu')
}
  return (
    <>
      <div>AnotherComponent {datacontext?.them}</div>
      <button onClick={check}>Save</button>
    </>
  
    
  )
}

export default AnotherComponent