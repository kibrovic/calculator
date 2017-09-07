import React, { Component } from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Calculator />

        <div className="footer">source code on <code><a href="https://github.com/kibrovic/calculator">github</a></code></div>
      </div>
    );
  }
}

// -Calculator
//   -CalculatorDisplay
//   -CalculatorButtons

class CalculatorButtons extends Component {
  constructor(props) {
    super(props);

    this.handleInput=this.handleInput.bind(this);
    this.handleOperator=this.handleOperator.bind(this);
    this.handleButtonPress=this.handleButtonPress.bind(this);
  }

  handleInput(e) {
    this.props.onInput(e.target.dataset.value);
  }

  handleOperator(e) {
    this.props.onOperator(e.target.dataset.value);
  }

  handleButtonPress(event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    switch (event.key) {
      case "0":
        document.getElementById("0").click();
        break;
      case "1":
        document.getElementById("1").click();
        break;
      case "2":
        document.getElementById("2").click();
        break;
      case "3":
        document.getElementById("3").click();
        break;
      case "4":
        document.getElementById("4").click();
        break;
      case "5":
        document.getElementById("5").click();
        break;
      case "6":
        document.getElementById("6").click();
        break;
      case "7":
        document.getElementById("7").click();
        break;
      case "8":
        document.getElementById("8").click();
        break;
      case "9":
        document.getElementById("9").click();
        break;
      case "/":
        document.getElementById("/").click();
        break;
      case "*":
        document.getElementById("*").click();
        break;
      case "-":
        document.getElementById("-").click();
        break;
      case "+":
        document.getElementById("+").click();
        break;
      case ".":
      case ",":
        document.getElementById(".").click();
        break;
      case "Backspace":
        document.getElementById("CE").click();
        break;
      case "Enter":
        document.getElementById("=").click();
        break;
            
      default:
        return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleButtonPress, true);
  }

  render() {
    return (
    <Grid className="buttons">
      <Row className="show-grid">
        <Col xs={3} md={3} onClick={this.props.onAllClear} className="well" id="AC">AC</Col>
        <Col xs={3} md={3} onClick={this.props.onClear} className="well" id="CE">CE</Col>
        <Col xs={3} md={3} data-value="/" onClick={this.handleOperator} className="well" id="/">÷</Col>
        <Col xs={3} md={3} data-value="*" onClick={this.handleOperator} className="well" id="*">*</Col>
      </Row>

      <Row className="show-grid">
        <Col xs={3} md={3} data-value="7" onClick={this.handleInput} className="well" id="7">7</Col>
        <Col xs={3} md={3} data-value="8" onClick={this.handleInput} className="well" id="8">8</Col>
        <Col xs={3} md={3} data-value="9" onClick={this.handleInput} className="well" id="9">9</Col>
        <Col xs={3} md={3} data-value="-" onClick={this.handleOperator} className="well" id="-">-</Col>
      </Row>

      <Row className="show-grid">
        <Col xs={3} md={3} data-value="4" onClick={this.handleInput} className="well" id="4">4</Col>
        <Col xs={3} md={3} data-value="5" onClick={this.handleInput} className="well" id="5">5</Col>
        <Col xs={3} md={3} data-value="6" onClick={this.handleInput} className="well" id="6">6</Col>
        <Col xs={3} md={3} data-value="+" onClick={this.handleOperator} className="well" id="+">+</Col>
      </Row>

      <Row className="show-grid">
        <Col xs={9} md={9}>
          <Row className="show-grid">
            <Col xs={4} md={4} data-value="1" onClick={this.handleInput} className="well" id="1">1</Col>
            <Col xs={4} md={4} data-value="2" onClick={this.handleInput} className="well" id="2">2</Col>
            <Col xs={4} md={4} data-value="3" onClick={this.handleInput} className="well" id="3">3</Col>
          </Row>
          <Row className="show-grid">
            <Col xs={9} md={9} data-value="0" onClick={this.handleInput}className="well" id="0">0</Col>
            <Col xs={3} md={3} data-value="." onClick={this.handleInput} className="well" id=".">.</Col>
          </Row>
        </Col>

        <Col xs={3} md={3} onClick={this.props.onResultClick} className="equalButton well" id="=">=</Col>
      </Row>
    </Grid>
    );
  }
}

class CalculatorDisplay extends Component {
  render() {
    return (
      <div className="display">
        <div className="operation"><bdi>{this.props.operation}</bdi></div>
        <div className="result"><bdi>{this.props.result}</bdi></div>
      </div>
    );
  }
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operation: "0",
      result: "0",
      gotResult: false,
      hasComma: false
    };
    
    this.handleResult = this.handleResult.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleAllClear = this.handleAllClear.bind(this);
  }

  handleInput(newValue) {
    let lastChar = this.state.result.substring(this.state.result.length-1, this.state.result.length);

    if (this.state.gotResult === false || ['/','*','-','+'].includes(lastChar)) {
      if (newValue === ".") {this.setState({hasComma: true})}

      if (newValue === "." && this.state.hasComma === true) { return } 

      if (newValue==="0" && ['/','*','-','+'].includes(lastChar) && this.state.result!=="0") {
        this.setState((prevState) => ({
          operation: newValue,
          result: prevState.result + newValue +"."
        }))
      } else {
        (this.state.result.length < 2 && this.state.result.substring(0,1)==="0" && newValue !== ".") ? (
          this.setState({
            operation: newValue,
            result: newValue,
            gotResult: false
          })
        ) : (
          this.setState((prevState) => ({
            operation: newValue,
            result: prevState.result + newValue,
            gotResult: false
          }))
        )
      }
    } else {
      this.setState({
        operation: newValue,
        result: newValue,
        gotResult: false
      })
    }
    

  }

  handleOperator(newValue) {
    let lastChar = this.state.result.substring(this.state.result.length-1, this.state.result.length);
    ( ['/','*','-','+'].includes(lastChar) ) ? (
      this.setState({
        operation: newValue,
        result: this.state.result.substring(0, this.state.result.length -1) + newValue,
        hasComma: false
      })
    ) : (
      this.setState((prevState) => ({
        operation: newValue,
        result: prevState.result + newValue,
        hasComma: false
      }))
    )
  }

  checkComma(e){
      (e.indexOf(".") === -1) ? ( this.setState({hasComma: false}) ) : ( this.setState({hasComma: true}) )
    }

  handleResult() {
    let resultInteger;
    let resultString;

    let lastChar = this.state.result.substring(this.state.result.length-1, this.state.result.length);

    ( ['/','*','-','+'].includes(lastChar) ) ? (
      resultInteger = eval(this.state.result.substring(0, this.state.result.length -1)),
      resultString = resultInteger.toString(),
      this.checkComma(resultString)      
    ) : (
      resultInteger = eval(this.state.result),
      resultString = resultInteger.toString(),
      this.checkComma(resultString)
    )

    this.setState({
      operation: resultString,
      result: resultString,
      gotResult: true
    });
  }

  handleClear() {
    (this.state.result.length === 1) ? (
      this.setState({
        operation: "0",
        result: "0"
      })
    ) : (
      this.setState({
        operation: "0",
        result: this.state.result.substring(0, this.state.result.length -1)
      })
    )
  }

  handleAllClear() {
    this.setState({
      operation: "0",
      result: "0"
    });
  }

  render() {
    return (
      <div className="calculator">
        <p>Calculator</p>
        <CalculatorDisplay result={this.state.result} operation={this.state.operation}/>
        <CalculatorButtons result={this.state.result} onInput={this.handleInput} onOperator={this.handleOperator} onResultClick={this.handleResult} onClear={this.handleClear} onAllClear={this.handleAllClear}/>
      </div>
    );
  }
}

export default App;
