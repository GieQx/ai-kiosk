
import React, { useState, useCallback } from 'react';
import Icon from './Icon';

interface VirtualKeyboardProps {
  onInput: (char: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
}

const Key: React.FC<{
  value: string;
  onClick: (value: string) => void;
  className?: string;
  children?: React.ReactNode;
}> = ({ value, onClick, className = '', children }) => {
  const handleClick = () => onClick(value);
  return (
    <button
      onClick={handleClick}
      className={`h-20 bg-slate-700/80 rounded-lg flex justify-center items-center text-3xl font-semibold shadow-md active:bg-cyan-500 active:scale-95 transition-all duration-100 ease-in-out backdrop-blur-sm ${className}`}
    >
      {children || value}
    </button>
  );
};

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onInput, onBackspace, onEnter }) => {
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  const keysRows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ];

  const handleKeyPress = useCallback((key: string) => {
    onInput(isShiftPressed ? key.toUpperCase() : key.toLowerCase());
    if (isShiftPressed) {
      setIsShiftPressed(false);
    }
  }, [isShiftPressed, onInput]);

  const handleShift = () => setIsShiftPressed(prev => !prev);
  
  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-slate-900/50 rounded-2xl shadow-lg mt-4">
      <div className="space-y-2">
        {keysRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center space-x-2">
            {rowIndex === 2 && (
              <Key value="shift" onClick={handleShift} className={`w-28 ${isShiftPressed ? 'bg-cyan-600' : ''}`}>
                Shift
              </Key>
            )}
            {row.map(key => (
              <Key key={key} value={key} onClick={handleKeyPress} className="flex-1">
                {isShiftPressed ? key.toUpperCase() : key.toLowerCase()}
              </Key>
            ))}
            {rowIndex === 2 && (
              <Key value="backspace" onClick={onBackspace} className="w-28">
                <Icon name="backspace" className="h-10 w-10" />
              </Key>
            )}
          </div>
        ))}
        <div className="flex justify-center space-x-2">
          <Key value=" " onClick={handleKeyPress} className="flex-grow-[10]">
            Space
          </Key>
          <Key value="enter" onClick={onEnter} className="flex-grow-[2] bg-cyan-700/80 hover:bg-cyan-600">
            <Icon name="enter" className="h-10 w-10" />
          </Key>
        </div>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
