import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');
  const [lastOperation, setLastOperation] = useState('');

  const handleNumber = (num) => {
    setDisplay(display + num);
  };

  const handleOperator = (operator) => {
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
      
      // Substituir funções matemáticas especiais
      finalExpression = finalExpression.replace(/√/g, 'Math.sqrt');
      finalExpression = finalExpression.replace(/sin/g, 'Math.sin');
      finalExpression = finalExpression.replace(/cos/g, 'Math.cos');
      
      const calculatedResult = eval(finalExpression);
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
      const value = parseFloat(display) * (Math.PI / 180); // Converter para radianos
      const sinResult = Math.sin(value);
      setDisplay(sinResult.toString());
      setResult(sinResult.toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const calculateCos = () => {
    try {
      const value = parseFloat(display) * (Math.PI / 180); // Converter para radianos
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
      const celsius = (fahrenheit - 32) * (5/9);
      setDisplay(celsius.toFixed(2).toString());
      setResult(celsius.toFixed(2).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const convertCtoF = () => {
    try {
      const celsius = parseFloat(display);
      const fahrenheit = (celsius * 9/5) + 32;
      setDisplay(fahrenheit.toFixed(2).toString());
      setResult(fahrenheit.toFixed(2).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora</Text>
      <TextInput
        style={styles.display}
        value={display}
        editable={false}
        placeholder="Digite o valor"
      />
      
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('1')}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('2')}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('3')}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleOperator('+')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('4')}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('5')}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('6')}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleOperator('-')}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('7')}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('8')}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('9')}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleOperator('*')}>
            <Text style={styles.buttonText}>*</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={clearDisplay}>
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleNumber('0')}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={calculateResult}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleOperator('/')}>
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={calculateSquareRoot}>
            <Text style={styles.buttonText}>√</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={calculateSin}>
            <Text style={styles.buttonText}>sin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={calculateCos}>
            <Text style={styles.buttonText}>cos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={convertFtoC}>
            <Text style={styles.buttonText}>°F to °C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={convertCtoF}>
            <Text style={styles.buttonText}>°C to °F</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  display: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    fontSize: 24,
    textAlign: 'right',
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Calculator;
