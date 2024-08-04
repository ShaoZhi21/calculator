import React, {useState} from 'react'
import './App.css';

const list = [
  {key: 0,
  id: "zero"},
  {key:".", 
   id:"decimal"},
  {key: 1,
  id: "one"},
  {key: 2,
  id: "two"},
  {key: 3,
  id: "three"},
  {key: 4,
  id: "four"},
  {key: 5,
  id: "five"},
  {key: 6,
  id: "six"},
  {key: 7,
  id: "seven"},
  {key: 8,
  id: "eight"},
  {key: 9,
  id: "nine"},
]

const numbers = list.reverse()

const operators = [
  {key:"+",
   id:"add"},
  {key:"-",
   id:"subtract"},
  {key:"x",
   id:"multiply"},
  {key:"/",
   id:"divide"},
  {key:"=", 
   id:"equals"}
  ]

const App = () => {
  const [value, setValue] = useState("")
  const [secondValue, setSecondValue] = useState("")
  const [operator, setOperator] = useState("")
  const [totalValue, setTotalValue] = useState("")
  const [display, setDisplay] = useState("0")
  
 const updateOperator = (x) => {
      if (x === "-"){
        if (value === ""){
          setValue(x)
          setDisplay(x)
        }
        else if (operator !== ""){
          if (secondValue === ""){
            setSecondValue(x)
            setDisplay(x)
          } 
          else if (secondValue !== ""){
            updateTotal()
            setOperator(x)
          }
        } 
          else {
          if (value !== ""){
            if (secondValue !== ""){
              updateTotal()
              setOperator(x)
            }
          }
          setSecondValue("")
          setOperator(x)
        }
      } 
      else {
        setSecondValue("")
        setOperator(x)
      }
      if (value !== ""){
        if (secondValue !== ""){
          if (secondValue === "-"){
            setOperator(x)
          } else {
            updateTotal()
          }
        }
      }
  }
  
  const updateTotal = () => {
    if (value === ""){
      setDisplay(0)
    } else {
      const valueOne = parseFloat(value)
      const valueTwo = parseFloat(secondValue)
        let result;
        if (operator === "+"){
          result = valueOne + valueTwo
        }
        if (operator === "-"){
          result = valueOne - valueTwo 
        }
        if (operator === "x"){
          result = valueOne * valueTwo
        }
        if (operator === "/"){
          result = valueOne / valueTwo

        }
        setTotalValue(result)
        setDisplay(result.toString())
        setValue(result)
        setSecondValue("")
    }
}
  
 const handlePercentage = () => {
  const currentValue = parseFloat(display);
  if (!isNaN(currentValue)) {
    const newValue = currentValue / 100;
    setDisplay(newValue.toString());
    if (operator === "") {
      setValue(newValue.toString());
    } else {
      setSecondValue(newValue.toString());
    }
  }
}
  
  const handleNegative = () => {
    if (display === value){
      const newValue = -value
      setValue(newValue)
      setDisplay(newValue)
    } else if (display === secondValue){
      const newValue = -secondValue
      setSecondValue(newValue)
      setDisplay(newValue)
    }
  }
  
  const updateValue = (newValue) => {
    if (operator === ""){
      if (newValue === "."){
        if (value.includes(".")){
          setValue(value)
          setDisplay(value)
        } else {
        const newValueDisplay = value === "0" ? newValue : value + newValue;
        setValue(newValueDisplay)
        setDisplay(newValueDisplay)
        }
      } else {
        const newValueDisplay = value === "0" ? newValue : value + newValue;
        setValue(newValueDisplay)
        setDisplay(newValueDisplay)
      }
    } else {
      if (newValue === "."){
        if (secondValue.includes(".")){
          setSecondValue(secondValue)
          setDisplay(secondValue)
        } else {
        const newValueDisplay = secondValue === "0" ? newValue : secondValue + newValue;
        setSecondValue(newValueDisplay)
        setDisplay(newValueDisplay)
        }
      } else {
        const newValueDisplay = secondValue === "0" ? newValue : secondValue + newValue;
        setSecondValue(newValueDisplay)
        setDisplay(newValueDisplay)
      }
    }
  }
  
  const clearValue = () => {
    setDisplay(() => "0")
    setValue(() => "")
    setOperator(() => "")
    setSecondValue(() => "")
    setTotalValue(() => "")
  }
  
  return (
  <div id="calculator">
      <h2 id="display">{display}</h2>
      <div id="column">
        <div id="others">
          <Button clearValue={clearValue} value={{key:"AC", 
     id:"clear"}}/>
          <Button handlePercentage={handlePercentage} value={{key:"%", id:"percentage"}}/>
          <Button handleNegative={handleNegative} value={{key:"+/-", id:"negative"}}/>
        </div>
        <div id="flex-numbers">
        {numbers.map( x => <Button updateValue={updateValue} value={x}/>)}
        </div>
      </div>
      <div id="flex-operator">
        {operators.map( x => <Button updateTotal={updateTotal} updateOperator={updateOperator} updateValue={updateValue} value={x}/>)}
      </div>
    <div id="checking">
       <h3>{value}</h3>
       <h3>{operator}</h3>
       <h3>{secondValue}</h3>
       <h3 id="total">{totalValue}</h3>
    </div>
  </div>)
}

const Button = ({handleNegative, handlePercentage, updateTotal, updateOperator, clearValue, updateValue, value}) => {
  
  const symbol = ["+", "-", "x", "/"]
  
  const handleClick = () => {
    if (value.id === "clear"){
      clearValue()
    }
    else if (value.id === "negative"){
      handleNegative()
    }
    else if (value.id === "equals"){
      updateTotal()
    }
    else if (value.id ==="percentage"){
      handlePercentage()
    }
    else if (symbol.includes(value.key)){
      updateOperator(value.key)
    }
    else{
       updateValue(value.key.toString())  
    }
  }
  return (
  <div>
      <button onClick={handleClick} id={value.id}>{value.key}</button>
  </div>)
}

export default App;
