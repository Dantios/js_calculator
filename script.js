class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement  ){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement

      
    }

    clear() {
        this.lastHistAns = this.currentOperand + this.previousOperand
        this.currentOperand =''
        this.previousOperand =''
        this.operation= undefined
       this.previousOperandTextElement.innerText =  this.currentOperand
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        
        this.currentOperand =  this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if (this.currentOperand ==='') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand 
        this.currentOperand = ''
    }

    compute(){
        let computation 
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation){
            case '+': 
            computation = prev + current
            break
            case '-': 
            computation = prev - current
            break
            case '*': 
            computation = prev * current
            break
            case '/': 
            computation = prev / current
            break
            default:
                return
        }
        this.currentOperand = computation
        this.operation=undefined
        this.previousOperand =''
    }

    getDisplayNumber(number){
       
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay

        if (isNaN(integerDigits)){
            integerDisplay = ''

            } else {
                integerDisplay = integerDigits.toLocaleString('en',{
                    maximumFractionDigits: 0 })
                }

        if (decimalDigits !=null){
            return `${integerDigits}.${decimalDigits}`
        } else {
            return integerDisplay
            }
    }

  

    
    updateDisplay(){

        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null){
                   
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation} ${this.currentOperand}`  
        } else {
                      
        }
    }

}

function question() {
    questionHist[i] = previousOperandTextElement.innerText
    answerHistory.innerText = previousOperandTextElement.innerText
}

function history() {

    historyArray[i] = previousOperandTextElement.innerText + " = " + currentOperandTextElement.innerText
 
    lastHistAns.innerText = historyArray.join(' \r\n')
    i++
 
    
}
 
const numberButtons = document.querySelectorAll('[data-number]')
const operationsButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const answerHistory = document.querySelector('[last-answer]')
const allClearButton = document.querySelector('[data-allclear]')
const lastHistAns = document.querySelector('[answer-hist]')
const calculator = new Calculator (previousOperandTextElement,currentOperandTextElement)
const answerClearBtn = document.querySelector('[clear-answers]')

var historyArray = []
var i = historyArray.length
var x = i - 1

answerClearBtn.addEventListener('click', button => {

    while (historyArray.length > 0){
        lastHistAns.innerText = ""
      
        historyArray.pop()
    }
        
})

numberButtons.forEach(button => {
    button.addEventListener('click',() =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
        })
})
 
 
 
operationsButtons.forEach(button => {
    button.addEventListener('click', ()=>{
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
   
    })
})

equalsButton.addEventListener('click', button => {
   
    calculator.compute()
 
    calculator.updateDisplay()
 
    this.history()
    console.log()
    
})
 
allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
    
    })
    
deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
    
    })