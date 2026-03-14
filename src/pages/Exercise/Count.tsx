import { useState } from "react"

export default function Counter() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  // helper function
  function complexLogic(value: number) {
    if(value < 10) value += 5
    else value *= 2
    return value
  }

  return (
    <div className="p-4">
      <div className="d-flex align-items-center justify-content-around">
        <p>Count: {count}</p>
        <button className="mb-2" onClick={()=> setCount(count + 1)}>Add</button>
      </div>

      <div className="d-flex align-items-center justify-content-around">
        <p>Count2: {count2}</p>
        <button className="mb-2" onClick={()=> setCount2(prev => {
          let result = prev
        
          if(result< 10) result+=5

          if(result>=10) result*=2

          return result 
        })}>Add</button>
      </div>

      <div className="d-flex align-items-center justify-content-around">
        <p>Count3: {count3}</p>
        <button className="mb-2" onClick={()=> setCount3(prev => complexLogic(prev))}>Add</button>
      </div>
    </div>
  )
}