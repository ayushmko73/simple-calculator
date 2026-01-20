import React, { useState } from 'react';
import { Delete, Calculator as CalculatorIcon } from 'lucide-react';

const Calculator: React.FC = () => {
  const [current, setCurrent] = useState<string>('0');
  const [previous, setPrevious] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState<boolean>(false);

  // Clear All
  const clear = () => {
    setCurrent('0');
    setPrevious(null);
    setOperation(null);
    setOverwrite(false);
  };

  // Delete last digit
  const deleteLast = () => {
    if (overwrite) {
      setCurrent('0');
      setOverwrite(false);
      return;
    }
    if (current.length === 1) {
      setCurrent('0');
    } else {
      setCurrent(current.slice(0, -1));
    }
  };

  // Handle Numbers
  const inputDigit = (digit: string) => {
    if (current === '0' && digit === '0') return;
    if (overwrite) {
      setCurrent(digit);
      setOverwrite(false);
    } else {
      setCurrent(current === '0' ? digit : current + digit);
    }
  };

  // Handle Decimal
  const inputDecimal = () => {
    if (overwrite) {
      setCurrent('0.');
      setOverwrite(false);
      return;
    }
    if (!current.includes('.')) {
      setCurrent(current + '.');
    }
  };

  // Handle Operations
  const inputOperation = (op: string) => {
    if (previous === null) {
      setPrevious(current);
    } else if (operation) {
      const result = calculate(previous, current, operation);
      setPrevious(String(result));
      setCurrent(String(result));
    }
    setOperation(op);
    setOverwrite(true);
  };

  // Calculate Logic
  const calculate = (prev: string, curr: string, op: string) => {
    const p = parseFloat(prev);
    const c = parseFloat(curr);
    if (isNaN(p) || isNaN(c)) return 0;
    
    switch (op) {
      case '+': return p + c;
      case '-': return p - c;
      case '×': return p * c;
      case '÷': return c === 0 ? 'Error' : p / c;
      default: return 0;
    }
  };

  // Handle Equals
  const evaluate = () => {
    if (operation && previous) {
      const result = calculate(previous, current, operation);
      setCurrent(String(result));
      setPrevious(null);
      setOperation(null);
      setOverwrite(true);
    }
  };

  // Percentage
  const percentage = () => {
    const val = parseFloat(current);
    setCurrent(String(val / 100));
    setOverwrite(true);
  };

  const Button = ({ 
    label, 
    onClick, 
    className = "", 
    variant = "default" 
  }: { 
    label: React.ReactNode, 
    onClick: () => void, 
    className?: string,
    variant?: "default" | "operator" | "function"
  }) => {
    const baseStyles = "h-16 text-2xl font-medium rounded-full transition-all active:scale-95 flex items-center justify-center select-none";
    const variants = {
      default: "bg-gray-700 hover:bg-gray-600 text-white",
      operator: "bg-orange-500 hover:bg-orange-400 text-white font-bold",
      function: "bg-gray-400 hover:bg-gray-300 text-black"
    };

    return (
      <button 
        onClick={onClick} 
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="w-full max-w-sm bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
      {/* Display */}
      <div className="p-8 bg-gray-900 flex flex-col items-end justify-end h-40">
        <div className="text-gray-400 text-sm h-6">
          {previous} {operation}
        </div>
        <div className="text-5xl font-light tracking-wider text-white overflow-x-auto whitespace-nowrap scrollbar-hide w-full text-right">
          {current}
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-4 p-6">
        <Button label="AC" onClick={clear} variant="function" />
        <Button label={<Delete size={24} />} onClick={deleteLast} variant="function" />
        <Button label="%" onClick={percentage} variant="function" />
        <Button label="÷" onClick={() => inputOperation('÷')} variant="operator" />

        <Button label="7" onClick={() => inputDigit('7')} />
        <Button label="8" onClick={() => inputDigit('8')} />
        <Button label="9" onClick={() => inputDigit('9')} />
        <Button label="×" onClick={() => inputOperation('×')} variant="operator" />

        <Button label="4" onClick={() => inputDigit('4')} />
        <Button label="5" onClick={() => inputDigit('5')} />
        <Button label="6" onClick={() => inputDigit('6')} />
        <Button label="-" onClick={() => inputOperation('-')} variant="operator" />

        <Button label="1" onClick={() => inputDigit('1')} />
        <Button label="2" onClick={() => inputDigit('2')} />
        <Button label="3" onClick={() => inputDigit('3')} />
        <Button label="+" onClick={() => inputOperation('+')} variant="operator" />

        <Button label="0" onClick={() => inputDigit('0')} className="col-span-2 rounded-full pl-8 items-start justify-start" />
        <Button label="." onClick={inputDecimal} />
        <Button label="=" onClick={evaluate} variant="operator" />
      </div>
    </div>
  );
};

export default Calculator;