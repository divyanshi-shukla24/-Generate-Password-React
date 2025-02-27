import React, { useState, useCallback, useEffect } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()_+~|}{[]:;?><,./-=';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className='w-full max-w-xl mx-auto shadow-md rounded-lg px-6 py-4 my-8 bg-gray-800 text-orange-500'>

      <h2 className="text-center text-xl mb-4">Password Generator</h2>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
          type="text" 
          value={password} 
          className='outline-none w-full py-1 px-3' 
          placeholder='Password' 
          readOnly
        />
        <button 
          className='bg-blue-500 text-white px-3 py-1' 
          onClick={() => navigator.clipboard.writeText(password)}
        >
          Copy
        </button>
      </div>
      <div className='flex justify-between text-sm mb-3'>
        <label>Length: {length}</label>
        <input 
          type="range" 
          min="6" 
          max="20" 
          value={length} 
          onChange={(e) => setLength(e.target.value)}
          className='cursor-pointer'
        />
      </div>
      <div className="flex justify-between text-sm mb-3">
        <label>
          <input 
            type="checkbox" 
            checked={numberAllowed} 
            onChange={() => setNumberAllowed(prev => !prev)}
          /> Include Numbers
        </label>

        <label>
          <input 
            type="checkbox" 
            checked={charAllowed} 
            onChange={() => setCharAllowed(prev => !prev)}
          /> Include Symbols
        </label>
      </div>
      <button 
        className='bg-green-500 text-white w-full py-2 rounded' 
        onClick={generatePassword}
      >
        Generate Password
      </button>
    </div>
  );
}

export default App;
