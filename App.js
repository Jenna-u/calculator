/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight } from 'react-native';


const colors = ['#414141', '#F06E6E', '#D7D4D3', '#B8E986', '#A1A197', '#E5A2A0', '#CCD2AA']
const reg = /^\d+(\.*\d{0,2})([+*/-]\d+(\.*\d{0,2}))+$/
const operators = ['+', '-', 'x', '/', '%']

type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super()
    this.state = {
      operand: 0
    }
    this.operand = 0
    this.operator = ''
    this.tempStr = ''
  }

  handleResult = () => {
    const { operand, operator, tempStr } = this.state;
    const thirdNumer = parseFloat(tempStr)
    let result = 0

    switch (operator) {
      case '+':
        result = operand + thirdNumer
        break;
      case '-':
        result = operand - thirdNumer
        break;
      case 'x':
        result = operand * thirdNumer
        break;
      case '/':
        result = operand / thirdNumer
        break;
      default:
        return result
    }

    this.operand = result
    // this.operator = ''
    // this.tempStr = ''

    this.setState({
      operand: result,
      operator: '',
      tempStr: ''
    })
  }

  handlePress = (val) => {
    const { operand, operator, tempStr } = this.state
    if (operators.indexOf(val) !== -1) {
      this.operand = parseFloat(this.tempStr) // 根据最后一次计算判断取值
      this.operator = val
      this.tempStr = ''
    } else if(/\d+/g.test(val)) {
      this.tempStr += val
    }

    console.log('operand', this.operand, 'operator', this.operator, 'tempStr', this.tempStr)

    this.setState({
      operand: this.operand,
      operator: this.operator,
      tempStr: this.tempStr
    },() => {console.log('state', this.state)})
  }

  handleClean = () => {
    this.setState({
      operand: 0,
      operator: '',
      tempStr: ''
    })
    this.operand = 0
    this.operator = ''
    this.tempStr = ''
  }

  render() {
    const { operand, operator, tempStr } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.output}>
          <Text style={[styles.countText]}>
            {`${operand}`}
          </Text>
        </View>
        <View style={styles.board}>
          <TouchableHighlight
            style={styles.cell}
            onPress={() => this.handleClean()}
          >
            <Text style={styles.operator}>C</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress('+/-')}
          >
            <Text style={styles.operator}>+/-</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress('%')}
          >
            <Text style={styles.operator}>%</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress('/')}
          >
            <Text style={[styles.operator, styles.red]}>/</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress(7)}
          >
            <Text style={styles.number}>7</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress(8)}
          >
            <Text style={styles.number}>8</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress(9)}
          >
            <Text style={styles.number}>9</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress('x')}
          >
            <Text style={[styles.operator, styles.red]}>x</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress(4)}
          >
            <Text style={styles.number}>4</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress(5)}
          >
            <Text style={styles.number}>5</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress(6)}
          >
            <Text style={styles.number}>6</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress('-')}
          >
            <Text style={[styles.operator, styles.red]}>-</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress(1)}
          >
            <Text style={styles.number}>1</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress(2)}
          >
            <Text style={styles.number}>2</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress(3)}
          >
            <Text style={styles.number}>3</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress('+')}
          >
            <Text style={[styles.operator, styles.red]}>+</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress('00')}
          >
            <Text style={styles.number}>00</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress(0)}
          >
            <Text style={styles.number}>0</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress('.')}
          >
            <Text style={styles.number}>.</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.result]}
            onPress={() => this.handleResult()}
          >
            <Text style={styles.white}>=</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  output: {
    flex: 4,
    justifyContent: 'flex-end',
    height: 360,
    fontFamily: 'HelveticaNeue'
  },
  countText: {
    fontSize: 80,
    color: '#4e4e4e',
    textAlign: 'right'
  },
  board: {
    flex: 6,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderTopColor: '#D7D4D3',
  },
  cell: {
    alignSelf: 'center',
    marginTop: 30,
    width: '25%',
    height: 50

  },
  operator: {
    fontSize: 36,
    lineHeight: 50,
    textAlign: 'center',
    color: '#414141'
  },
  number: {
    fontSize: 36,
    lineHeight: 50,
    textAlign: 'center',
    color: '#aaa',
    fontFamily: 'HelveticaNeue'
  },
  red: {
    color: '#f76c8c'
  },
  result: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#F06E6E'
  },
  white: {
    color: '#fff',
    lineHeight: 50,
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'HelveticaNeue'
  }
});
