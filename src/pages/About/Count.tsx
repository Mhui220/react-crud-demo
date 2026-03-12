import { useState } from "react"

export default function Counter() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  // helper function
  function complexLogic(value: number) {
    if(value < 10) value += 5
    else value *= 2
    return value
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={()=> setCount(count + 1)}>Add</button>

      <p>Count2: {count2}</p>
      <button onClick={()=> setCount2(prev => {
        let result = prev
        
        if(result< 10) result+=5

        if(result>=10) result*=2

        return result 
      })}>Add</button>

      <p>Count3: {count2}</p>
      <button onClick={()=> setCount2(prev => complexLogic(prev))}>Add</button>
    </div>
  )
}