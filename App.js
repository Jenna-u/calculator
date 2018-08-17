/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { 
  Platform, StyleSheet, Text, View, 
  TouchableHighlight, Picker, Modal,
  Button
 } from 'react-native'
import NP from 'number-precision'

const colors = ['#414141', '#F06E6E', '#D7D4D3', '#B8E986', '#A1A197', '#E5A2A0', '#CCD2AA']
const operators = ['+', '-', 'x', '/']

type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super()
    this.state = {
      operand: 0,
      operator: '',
      tempStr: 0,
      histroy: [],
      modalVisible: false,
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000', {
      method: 'GET',
    }).then(res => res.json())
    .then(response => {
      if (response.length > 0) {
        this.setState({
          pickerList: response
        })
      }
    })
  } 

   /**
   * 计算结果
   * @param { operand } number 操作数
   * @param { operator } string 运算符
   * @param { operant } string 被运算
   * @return { result } 最终计算结果
  */
  calculate = (operand, operator, operant) => {
    let result = 0

    switch (operator) {
      case '+':
        result = NP.plus(operand, operant)
        break
      case '-':
        result = NP.minus(operand, operant)
        break
      case 'x':
        result = NP.times(operand, operant)
        break
      case '/':
        result = NP.divide(operand, operant)
        break
      default:
        return result
    }

    return result
  }

   /**
   * 根据计算得出最后计算结果
  */
  handleResult = () => {
    const { operand, operator, tempStr, histroy } = this.state
    const result = this.calculate(operand, operator, parseFloat(tempStr))
    const submitData = `${operand} ${operator} ${tempStr} = ${result}`
    this.handleSubmit(submitData)

    this.setState({
      operand: result,
      operator: '',
      tempStr: result.toString()
    })
  }

  /**
   * 处理输入的数字或运算符
   * @param { val } string 数字或运算符
  */
  handlePress = (val) => {
    const { operand, operator, tempStr } = this.state
    if (operators.indexOf(val) !== -1) {
      if (operator && tempStr !== '') {
        this.setState({
          operand: this.calculate(operand, operator, parseFloat(tempStr)),
          operator: val,
          tempStr: ''
        })
      } else {
        this.setState({
          operand: tempStr ? parseFloat(tempStr) : operand,
          operator: val,
          tempStr: ''
        })
      }
    } else {
      // 处理 '%','+/-', '.'情况
      let num
      switch (val) {
        case '%':
          num = parseFloat(tempStr) * 0.01
          this.setState({ tempStr: num.toString() })
          break
        case '+/-':
          num = -1 * parseFloat(tempStr)
          break 
        case '.':
          num = tempStr.indexOf(val) >= 0 ? tempStr : `${tempStr}${val}`
          break;
        default:
          num = tempStr === '0' ? `${val}` : `${tempStr}${val}`.replace(/^0/g, '')
      }
      this.setState({ tempStr: num.toString() })
    }
  }

  /**
   * 清除结果
   */
  handleClean = () => {
    this.setState({
      operand: 0,
      operator: '',
      tempStr: ''
    })
  }

  handleSubmit = (data) => {
    console.log('data', data)
    const url = 'http://localhost:3000/add'
    fetch(`${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => console.log('res', res))
  }

  handleVisible = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    })
  }

  render() {
    const { tempStr, modalVisible, pickerList } = this.state
    console.log('sss', this.state.pickerList)
    return (
      <View style={styles.container}>
        <View style={styles.output}>
          <Text style={[styles.countText]}>
            {tempStr}
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
        <TouchableHighlight
          style={styles.changeColor}
          onPress={() => this.handleVisible()}
        >
          <Text style={{ textAlign: 'center' }}>...</Text>
        </TouchableHighlight>
        
        <Modal
          visible={modalVisible}
          animationType='slide'
          transparent={true}
          style={styles.modal}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(255,255,255, .9)' }}>
          <View style={styles.btns}>
            <Button
              title="Cancel"
              onPress={() => this.handleVisible()}
            />
            <Button
              title="Ok"
              onPress={() => this.handleVisible()}
            />
          </View>
          <Picker
            style={styles.picker}
            selectedValue={this.state.tempStr}
            onValueChange={itemValue => this.setState({tempStr: itemValue})}
          >
            {pickerList && pickerList.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    backgroundColor: 'transparent',
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
    lineHeight: 40,
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'HelveticaNeue'
  },
  changeColor: {
    position: 'absolute',
    left: '4%',
    top: '4%',
    width: 30,
    height: 30,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopColor: '#F06E6E',
    borderRightColor: '#F06E6E',
    borderBottomColor: '#F06E6E', 
    borderLeftColor: '#F06E6E',
    borderRadius: 100,
  },
  modal: {
    flex: 5,
    height: '50%'
  },
  btns: {
    height: 30,
    backgroundColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  picker: {
    width: '100%'
  }
});
