import React, { Component } from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

      <Calculator />
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
  }

  handleInput(e) {
    this.props.onInput(e.target.dataset.value);
  }

  handleOperator(e) {
    this.props.onOperator(e.target.dataset.value);
  }

  render() {
    return (
    <Grid className="buttons">
      <Row className="show-grid">
        <Col xs={3} md={3} onClick={this.props.onAllClear}>AC</Col>
        <Col xs={3} md={3} onClick={this.props.onClear}>CE</Col>
        <Col xs={3} md={3} data-value="/" onClick={this.handleOperator}>÷</Col>
        <Col xs={3} md={3} data-value="*" onClick={this.handleOperator}>*</Col>
      </Row>

      <Row className="show-grid">
        <Col xs={3} md={3} data-value="7" onClick={this.handleInput}>7</Col>
        <Col xs={3} md={3} data-value="8" onClick={this.handleInput}>8</Col>
        <Col xs={3} md={3} data-value="9" onClick={this.handleInput}>9</Col>
        <Col xs={3} md={3} data-value="-" onClick={this.handleOperator}>-</Col>
      </Row>

      <Row className="show-grid">
        <Col xs={3} md={3} data-value="4" onClick={this.handleInput}>4</Col>
        <Col xs={3} md={3} data-value="5" onClick={this.handleInput}>5</Col>
        <Col xs={3} md={3} data-value="6" onClick={this.handleInput}>6</Col>
        <Col xs={3} md={3} data-value="+" onClick={this.handleOperator}>+</Col>
      </Row>

      <Row className="show-grid">
        <Col xs={9} md={9}>
          <Row className="show-grid">
            <Col xs={4} md={4} data-value="1" onClick={this.handleInput}>1</Col>
            <Col xs={4} md={4} data-value="2" onClick={this.handleInput}>2</Col>
            <Col xs={4} md={4} data-value="3" onClick={this.handleInput}>3</Col>
          </Row>
          <Row className="show-grid">
            <Col xs={9} md={9} data-value="0" onClick={this.handleInput}>0</Col>
            <Col xs={3} md={3} data-value="." onClick={this.handleInput}>.</Col>
          </Row>
        </Col>

        <Col xs={3} md={3} onClick={this.props.onResultClick}>=</Col>
      </Row>
    </Grid>
    );
  }
}

class CalculatorDisplay extends Component {
  render() {
    return (
      <div className="display">
        <div className="operation">{this.props.operation}</div>
        <div className="result">{this.props.result}</div>
      </div>
    );
  }
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operation: "0",
      result: "0"
    };
    this.handleResult = this.handleResult.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleAllClear = this.handleAllClear.bind(this);
  }

  handleInput(newValue) {
    if (newValue!=="." && this.state.result.substring(this.state.result.length-1, this.state.result.length)==="0" && this.state.result!=="0") {
      this.setState((prevState) => ({
        operation: newValue,
        result: prevState.result + "." + newValue
      }))
    } else {
      (this.state.result.length < 2 && this.state.result.substring(0,1)==="0" && newValue !== ".") ? (
        this.setState({
          operation: newValue,
          result: newValue
        })
      ) : (
        this.setState((prevState) => ({
          operation: newValue,
          result: prevState.result + newValue
        }))
      )
    }
  }

  handleOperator(newValue) {
    let lastChar = this.state.result.substring(this.state.result.length-1, this.state.result.length);
    ( ['/','*','-','+'].includes(lastChar) ) ? (
      this.setState({
        operation: newValue,
        result: this.state.result.substring(0, this.state.result.length -1) + newValue
      })
    ) : (
      this.setState((prevState) => ({
        operation: newValue,
        result: prevState.result + newValue
      }))
    )
  }

  handleResult() {
    let resultInteger = eval(this.state.result);
    let resultString = resultInteger.toString();
    this.setState({
      operation: resultString,
      result: resultString
    });
  }

  handleClear() {
    (this.state.result.length === 1) ? (this.setState({result: "0"})) : (
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
        <CalculatorDisplay result={this.state.result} operation={this.state.operation}/>
        <CalculatorButtons result={this.state.result} onInput={this.handleInput} onOperator={this.handleOperator} onResultClick={this.handleResult} onClear={this.handleClear} onAllClear={this.handleAllClear}/>
      </div>
    );
  }
}

export default App;
