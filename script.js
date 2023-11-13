class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
    this.memory = 0 
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }
  invertSign() {
    this.currentOperand = (parseFloat(this.currentOperand) * -1).toString();
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }

  addToMemory() {
    this.memory += parseFloat(this.currentOperand) || 0;
  }

  subtractFromMemory() {
    this.memory -= parseFloat(this.currentOperand) || 0;
  }

  recallMemory() {
    this.currentOperand = this.memory.toString();
  }

  clearMemory() {
    this.memory = 0;
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const addToMemoryButton = document.querySelector('[data-add-to-memory]')
const subtractFromMemoryButton = document.querySelector('[data-subtract-from-memory]')
const recallMemoryButton = document.querySelector('[data-recall-memory]')
const clearMemoryButton = document.querySelector('[data-clear-memory]')

const invertSignButton = document.querySelector('[data-invert-sign]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

addToMemoryButton.addEventListener('click', () => {
  calculator.addToMemory();
  calculator.updateDisplay();
});

subtractFromMemoryButton.addEventListener('click', () => {
  calculator.subtractFromMemory();
  calculator.updateDisplay();
});

recallMemoryButton.addEventListener('click', () => {
  calculator.recallMemory();
  calculator.updateDisplay();
});

clearMemoryButton.addEventListener('click', () => {
  calculator.clearMemory();
  calculator.updateDisplay();
});
invertSignButton.addEventListener('click', () => {
  calculator.invertSign();
  calculator.updateDisplay();
});

document.addEventListener('keydown', (event) => {
  const key = event.key;

  // Check if the pressed key is a number or a decimal point
  if (!isNaN(key) || key === '.') {
    calculator.appendNumber(key);
    calculator.updateDisplay();
  }

  // Check if the pressed key is an operation
  if (['+', '-', '*', '/'].includes(key)) {
    calculator.chooseOperation(key);
    calculator.updateDisplay();
  }

  // Check if the pressed key is the equals sign
  if (key === '=' || key === 'Enter') {
    calculator.compute();
    calculator.updateDisplay();
  }

  // Check if the pressed key is the Delete key
  if (key === 'Delete') {
    calculator.clear();
    calculator.updateDisplay();
  }

  // Check if the pressed key is the Backspace key
  if (key === 'Backspace') {
    calculator.delete();
    calculator.updateDisplay();
  }

  // Check if the pressed key is the +/- key
  if (key === '-') {
    calculator.invertSign();
    calculator.updateDisplay();
  }
});