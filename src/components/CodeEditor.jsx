import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-jsx'; 
import * as Babel from '@babel/standalone';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(null);
  const textareaRef = useRef(null);

  const runCode = useCallback(() => {
    try {
      const transpiledCode = Babel.transform(code, { presets: ['react', 'env'] }).code;
      // eslint-disable-next-line
      const render = new Function('React', 'ReactDOM', 'setOutput', transpiledCode);
      render(React, ReactDOM, setOutput);
    } catch (error) {
      console.error(error);
      setOutput(<div style={{ color: 'red' }}>Error: {error.message}</div>);
    }
  }, [code]);
  

  useEffect(() => {
    Prism.highlightAll();
    runCode();
  }, [code, runCode]);

  const handleInputChange = (event) => {
    const text = event.target.value;
    setCode(text);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newValue = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div>
      <div className="code-editor">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          style={{
            width: '100%',
            height: '100vh',
            padding: '10px',
            resize: 'none',
            whiteSpace: 'pre',
            background: 'transparent',
            color: 'transparent',
            caretColor: 'black',
            zIndex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            border: '1px solid #ccc',
            fontSize: '16px',
            fontFamily: 'monospace',
            lineHeight: '1.5',
          }}
        />
        <pre
          aria-hidden="true"
          style={{
            width: '100%',
            height: '100vh',
            padding: '10px',
            whiteSpace: 'pre-wrap',
            margin: 0,
            pointerEvents: 'none',
            zIndex: 0,
            border: '1px solid transparent',
            fontSize: '16px',
            fontFamily: 'monospace',
            lineHeight: '1.5',
          }}
        >
          <code className="language-jsx">{code}</code>
        </pre>
      </div>
      <div id="output" style={{ marginTop: '20px' }}>
        {output}
      </div>
    </div>
  );
};

export default CodeEditor;
