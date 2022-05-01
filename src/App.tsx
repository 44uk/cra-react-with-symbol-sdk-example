import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { createTransferTransaction as createTransferTransactionV2 } from './symbol-sdk-v2'
import { createTransferTransaction as createTransferTransactionV3 } from './symbol-sdk-v3'

function App() {
  const [payload, setPayload] = useState('')

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          <button type="button" onClick={() => setPayload(createTransferTransactionV2())}>
            Generate Payload (v2.x)
          </button>
          <button type="button" onClick={() => setPayload(createTransferTransactionV3())}>
            Generate Payload (v3.x)
          </button>
        </p>
        <code style={{overflowWrap: 'anywhere'}}>{payload}</code>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
