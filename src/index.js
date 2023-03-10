
import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



function TextEditor() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const textAreaRef = useRef(null);

  const handleBoldClick = () => {
    setBold(!bold);
    applyStyleToSelection('bold', bold);
  };

  const handleItalicClick = () => {
    setItalic(!italic);
    applyStyleToSelection('italic', italic);
  };

  const applyStyleToSelection = (style, value) => {
    const textArea = textAreaRef.current;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = textArea.value.substring(start, end);
    const textBeforeSelection = textArea.value.substring(0, start);
    const textAfterSelection = textArea.value.substring(end);

    if (value) {
      textArea.value = textBeforeSelection + selectedText + textAfterSelection;
      textArea.setSelectionRange(start, end);
      return;
    }

    textArea.value =
      textBeforeSelection +
      `<${style}>` +
      selectedText +
      `</${style}>` +
      textAfterSelection;
      textArea.setSelectionRange(start, end + 2 + style.length);
    };
  
    return (
      <>
        <textarea ref={textAreaRef} />
        <button onClick={handleBoldClick}>Bold</button>
        <button onClick={handleItalicClick}>Italic</button>
      </>
    );
  }
  
  export default TextEditor;