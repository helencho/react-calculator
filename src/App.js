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
    this.allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '*', '-', '+', '/', '.', '=', 'Backspace', 'Enter', 'c']
    // this.outer = ['DEL', '/', '*', '-', '+'] // how do I use ÷ (/) or x (*) ? 
    this.state = {
      clearOrDelete: 'DEL',
      expression: '',
      value: '',
      clickedValue: '',
      keyPress: false
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

  // Key press animation 
  buttonAnimation = () => {
    const { keyPress } = this.state

    if (keyPress) {
      return 'button-circle'
    } else {
      return ''
    }
  }

  // Checks length of expression and returns a class name 
  checkLength = () => {
    const { expression } = this.state

    if (expression.length > 16) {
      return 'expression-xsmall'
    } else if (expression.length > 13) {
      return 'expression-small'
    } else if (expression.length > 9) {
      return 'expression-medium'
    } else {
      return ''
    }
  }


  checkKeyForExpression = () => {
    const { expression, value, clickedValue } = this.state

    let newExpression

    // When user clicks on equals sign 
    if (clickedValue === '=' || clickedValue === 'Enter' || clickedValue === '=') {
      if (value) {
        this.setState({
          clearOrDelete: 'CLR',
          expression: value.toString(),
          value: '',
          clickedValue: ''
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
          value: '',
          clickedValue: ''
        })

        // If the last element of the new expression is a number 
      } else if (!isNaN(newExpression[newExpression.length - 1])) {
        // Evaluate 
        let newValue = this.evaluate(newExpression)
        this.setState({
          expression: newExpression,
          value: newValue,
          clickedValue: ''
        })
      } else {
        // Keep the value 
        this.setState({
          expression: newExpression,
          clickedValue: ''
        })
      }

      // When user clicks on CLR sign 
    } else if (clickedValue === 'CLR' || clickedValue === 'c') {
      // Switch the CLR button to DEL button and clear the screen 
      this.setState({
        clearOrDelete: 'DEL',
        expression: '',
        value: '',
        clickedValue: ''
      })

      // When the expression's length is less than 17, go ahead with pressing numbers and operators 
    } else if (expression.length < 17) {

      // When user clicks on any number 
      if (!isNaN(clickedValue)) {
        newExpression = expression + clickedValue
        let newValue = this.evaluate(newExpression)

        this.setState({
          clearOrDelete: 'DEL',
          expression: newExpression,
          value: newValue,
          clickedValue: '',
          keyPress: true
        }, () => {
          setTimeout(() => {
            console.log('Setting timeout!')
            this.setState({
              keyPress: false
            })
          }, 300)
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
              expression: newExpression,
              clickedValue: '',
              keyPress: true
            }, () => {
              setTimeout(() => {
                this.setState({
                  keyPress: false
                })
              }, 300)
            })
          }

        } else {
          // Otherwise, add to the string 
          newExpression = expression + clickedValue

          this.setState({
            expression: newExpression,
            clickedValue: ''
          })
        }
      }
    }

  }

  handleKey = e => {
    let clickedValue = e.key

    // Call animation function here 

    if (this.allowedKeys.includes(clickedValue)) {
      this.setState({ clickedValue }, () => {
        this.checkKeyForExpression()
      })
    }
  }

  handleButtonClick = e => {
    e.preventDefault()
    let clickedValue = e.target.value

    this.setState({ clickedValue }, () => {
      this.checkKeyForExpression()
    })

    // Call animation function here 
  }

  render() {
    const { clearOrDelete, expression, value, clickedValue } = this.state

    // Add class to expression div depending on the length of expression 
    const expressionClass = this.checkLength()

    // Add class to key button depending on current button/key press 
    const keyClass = this.buttonAnimation()

    const grab = () => {
      let targetClassName = `circle-${clickedValue}`
      
    }

    console.log(this.state)

    return (
      <div className='calculator-container' onKeyDown={this.handleKey} tabIndex='0'>

        <form className='calculator'>
          <div className={`expression ${expressionClass}`}>
            <p>{expression}</p>
          </div>
          <div className='value'>
            <p>{value}</p>
          </div>
          <div className='buttons-container'>
            <Buttons
              values={this.inner}
              divName='numbers'
              handleButtonClick={this.handleButtonClick} />
            <div className='operations'>
              <button value={clearOrDelete} onClick={this.handleButtonClick} >{clearOrDelete}</button>

              {/* <div className={`circle circle-/ ${keyClass}`}></div> */}
              <button value='/' onClick={this.handleButtonClick}>÷</button>
              <button value='*' onClick={this.handleButtonClick}>x</button>
              <button value='+' onClick={this.handleButtonClick}>+</button>

              {/* <div className={`circle circle-- ${keyClass}`}></div> */}
              <button value='-' onClick={this.handleButtonClick}>-</button>
            </div>
          </div>

          {/* <div className={`circle ${keyClass}`}></div> */}


        </form>

      </div>
    )
  }

}






export default App;
