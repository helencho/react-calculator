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

  handleButtonClick = e => {
    // Prevent from refreshing the page 
    e.preventDefault()

    const { expression, value } = this.state
    let clickedValue = e.target.value
    let newExpression

    // When user clicks on equals sign 
    if (clickedValue === '=') {
      this.setState({
        clearOrDelete: 'CLR',
        expression: value.toString(),
        value: ''
      })

      // When user clicks on DEL sign 
    } else if (clickedValue === 'DEL') {
      newExpression = expression.slice(0, expression.length - 1)

      // If the last element of the new expression is a number, 
      if (!isNaN(newExpression[newExpression.length - 1])) {
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
    } else if (clickedValue === 'CLR') {
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
      newExpression = expression + clickedValue

      this.setState({
        expression: newExpression
      })
    }
  }

  render() {
    const { clearOrDelete, expression, value } = this.state

    console.log(this.state)

    return (
      <div>
        <form>
          <p className='expression'>{expression}</p>
          <p className='value'>{value}</p>
          <div className='buttons-container'>
            <Buttons values={this.inner} divName='numbers' handleButtonClick={this.handleButtonClick} />
            <div className='operations'>
              <button value={clearOrDelete} onClick={this.handleButtonClick}>{clearOrDelete}</button>
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
