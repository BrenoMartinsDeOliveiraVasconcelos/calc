import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [lastOperation, setLastOperation] = useState<string>('');

  const handleNumber = (num: string) => {
    setDisplay(display + num);
  };

  const handleOperator = (operator: string) => {
    setDisplay(display + operator);
    setLastOperation('');
  };

  const clearDisplay = () => {
    setDisplay('');
    setResult('');
    setLastOperation('');
  };

  const calculateResult = () => {
    try {
      let finalExpression = display;
      finalExpression = finalExpression.replace(/√/g, 'Math.sqrt');
      finalExpression = finalExpression.replace(/sin/g, 'Math.sin');
      finalExpression = finalExpression.replace(/cos/g, 'Math.cos');
      
      const calculatedResult = eval(finalExpression) as number;
      setResult(calculatedResult.toString());
      setDisplay(calculatedResult.toString());
      setLastOperation('=');
    } catch (error) {
      setResult('Error');
      setDisplay('');
    }
  };

  const calculateSquareRoot = () => {
    try {
      const value = parseFloat(display);
      const sqrtResult = Math.sqrt(value);
      setDisplay(sqrtResult.toString());
      setResult(sqrtResult.toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const calculateSin = () => {
    try {
      const value = parseFloat(display) * (Math.PI / 180);
      const sinResult = Math.sin(value);
      setDisplay(sinResult.toString());
      setResult(sinResult.toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const calculateCos = () => {
    try {
      const value = parseFloat(display) * (Math.PI / 180);
      const cosResult = Math.cos(value);
      setDisplay(cosResult.toString());
      setResult(cosResult.toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const convertFtoC = () => {
    try {
      const fahrenheit = parseFloat(display);
      const celsius = (fahrenheit - 32) * (5 / 9);
      setDisplay(celsius.toFixed(2).toString());
      setResult(celsius.toFixed(2).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const convertCtoF = () => {
    try {
      const celsius = parseFloat(display);
      const fahrenheit = (celsius * 9 / 5) + 32;
      setDisplay(fahrenheit.toFixed(2).toString());
      setResult(fahrenheit.toFixed(2).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const renderButton = (text: string, onPress: () => void, buttonStyle?: object, textStyle?: object) => (
    <TouchableOpacity 
      style={[styles.button, buttonStyle]} 
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.title}>Scientific Calculator</Text>
        <TextInput
          style={styles.display}
          value={display}
          editable={false}
          placeholder="0"
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          {renderButton('C', clearDisplay, styles.functionButton, styles.functionButtonText)}
          {renderButton('√', calculateSquareRoot, styles.functionButton, styles.functionButtonText)}
          {renderButton('sin', calculateSin, styles.functionButton, styles.functionButtonText)}
          {renderButton('÷', () => handleOperator('/'), styles.operatorButton, styles.operatorButtonText)}
        </View>

        <View style={styles.row}>
          {renderButton('7', () => handleNumber('7'))}
          {renderButton('8', () => handleNumber('8'))}
          {renderButton('9', () => handleNumber('9'))}
          {renderButton('×', () => handleOperator('*'), styles.operatorButton, styles.operatorButtonText)}
        </View>

        <View style={styles.row}>
          {renderButton('4', () => handleNumber('4'))}
          {renderButton('5', () => handleNumber('5'))}
          {renderButton('6', () => handleNumber('6'))}
          {renderButton('-', () => handleOperator('-'), styles.operatorButton, styles.operatorButtonText)}
        </View>

        <View style={styles.row}>
          {renderButton('1', () => handleNumber('1'))}
          {renderButton('2', () => handleNumber('2'))}
          {renderButton('3', () => handleNumber('3'))}
          {renderButton('+', () => handleOperator('+'), styles.operatorButton, styles.operatorButtonText)}
        </View>

        <View style={styles.row}>
          {renderButton('cos', calculateCos, styles.functionButton, styles.functionButtonText)}
          {renderButton('0', () => handleNumber('0'))}
          {renderButton('.', () => handleNumber('.'), styles.numberButton)}
          {renderButton('=', calculateResult, styles.equalsButton, styles.equalsButtonText)}
        </View>

        <View style={styles.row}>
          {renderButton('°F → °C', convertFtoC, styles.conversionButton, styles.conversionButtonText)}
          {renderButton('°C → °F', convertCtoF, styles.conversionButton, styles.conversionButtonText)}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    padding: 16,
  },
  displayContainer: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#2C2C2E',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  display: {
    fontSize: 48,
    color: '#FFFFFF',
    textAlign: 'right',
    padding: 10,
    fontWeight: '300',
  },
  buttonContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: '#3A3A3C',
    marginHorizontal: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '500',
  },
  functionButton: {
    backgroundColor: '#2C2C2E',
  },
  functionButtonText: {
    color: '#64D2FF',
    fontSize: 20,
  },
  operatorButton: {
    backgroundColor: '#FF9F0A',
  },
  operatorButtonText: {
    color: '#FFFFFF',
    fontSize: 30,
  },
  numberButton: {
    backgroundColor: '#3A3A3C',
  },
  equalsButton: {
    backgroundColor: '#30D158',
  },
  equalsButtonText: {
    color: '#FFFFFF',
    fontSize: 30,
  },
  conversionButton: {
    flex: 1,
    aspectRatio: 2.2,
    backgroundColor: '#2C2C2E',
  },
  conversionButtonText: {
    color: '#64D2FF',
    fontSize: 16,
  },
});

export default Calculator;