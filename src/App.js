import React, { Component } from 'react';

const Buttons = ({ values, divName, handleButtonClick }) => {
  return (
    <div className={divName}>
      {values.map(element => <button value={element} onClick={handleButtonClick}>{element}</button>)}
    </div>
  )
}

class App extends Component {
  constructor() {
    super()
    this.inner = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', '=']
    this.operators = ['/', '*', '+', '-']
    // this.outer = ['DEL', '/', '*', '-', '+'] // how do I use ÷ (/) or x (*) ? 
    this.state = {
      clearOrDelete: 'DEL',
      expression: '',
      value: ''
    }
  }

  // Make my own evaluate function without using eval() 
  // Take in x for multiply 
  // Take in ÷ for divide 
  evaluate = exp => {
    try {
      return eval(exp)
    } catch (e) {
      return NaN
    }
  }

  checkKeyForExpression = clickedValue => {
    const { expression, value } = this.state

    let newExpression

    // When user clicks on equals sign 
    if (clickedValue === '=' || clickedValue === 'Enter' || clickedValue === '=') {
      if (value) {
        this.setState({
          clearOrDelete: 'CLR',
          expression: value.toString(),
          value: ''
        })
      }

      // When user clicks on DEL sign 
    } else if (clickedValue === 'DEL' || clickedValue === 'Backspace') {
      // Slice the last element of the expression and assign to newExpression 
      newExpression = expression.slice(0, expression.length - 1)

      // And if this new expression is blank  
      if (!newExpression) {
        this.setState({
          expression: newExpression,
          value: ''
        })

        // If the last element of the new expression is a number 
      } else if (!isNaN(newExpression[newExpression.length - 1])) {
        // Evaluate 
        let newValue = this.evaluate(newExpression)
        this.setState({
          expression: newExpression,
          value: newValue
        })
      } else {
        // Keep the value 
        this.setState({
          expression: newExpression
        })
      }

      // When user clicks on CLR sign 
    } else if (clickedValue === 'CLR' || clickedValue === 'Backspace') {
      // Switch the CLR button to DEL button and clear the screen 
      this.setState({
        clearOrDelete: 'DEL',
        expression: '',
        value: ''
      })

      // When user clicks on any number 
    } else if (!isNaN(clickedValue)) {
      newExpression = expression + clickedValue
      let newValue = this.evaluate(newExpression)

      this.setState({
        clearOrDelete: 'DEL',
        expression: newExpression,
        value: newValue
      })

      // When user clicks on anything other than the 3 types listed above 
    } else {
      let lastValueOfExp = expression[expression.length - 1]
      
      // If clicked value is an operator 
      if (this.operators.includes(clickedValue)) {

        // Check to see that the last value of expression is NOT an operator 
        if (!this.operators.includes(lastValueOfExp)) {
          newExpression = expression + clickedValue
          this.setState({
            expression: newExpression
          })
        }

      } else {
        // Otherwise, add to the string 
        newExpression = expression + clickedValue

        this.setState({
          expression: newExpression
        })
      }
    }
  }

  handleKeyPress = e => {
    let clickedValue = e.key
    // console.log(clickedValue)
    let allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '*', '-', '+', '/', '.', '=', 'Backspace', 'Enter']
    if (allowedKeys.includes(clickedValue)) {
      this.checkKeyForExpression(clickedValue)
    }
  }

  handleButtonClick = e => {
    // Prevent from refreshing the page 
    e.preventDefault()
    let clickedValue = e.target.value
    this.checkKeyForExpression(clickedValue)

  }

  render() {
    const { clearOrDelete, expression, value } = this.state

    console.log(this.state)

    return (
      <div className='calculator-container' onKeyDown={this.handleKeyPress} tabIndex='0'>

        <form className='calculator'>
          <div className='expression'>
            <p>{expression}</p>
          </div>
          <div className='value'>
            <p>{value}</p>
          </div>
          <div className='buttons-container'>
            <Buttons values={this.inner} divName='numbers' handleButtonClick={this.handleButtonClick} />
            <div className='operations'>
              <button value={clearOrDelete} onClick={this.handleButtonClick} >{clearOrDelete}</button>
              <button value='/' onClick={this.handleButtonClick}>÷</button>
              <button value='*' onClick={this.handleButtonClick}>x</button>
              <button value='+' onClick={this.handleButtonClick}>+</button>
              <button value='-' onClick={this.handleButtonClick}>-</button>
            </div>
          </div>
        </form>

      </div>
    )
  }

}






export default App;
