import './App.css';
import 'prismjs';
import 'prismjs/themes/prism.css';
import CodeEditor from './components/CodeEditor';


function App() {
  return (
    <div className="App">
    <h1>Simple Code Editor</h1>
    <CodeEditor />
  </div>
  );
}

export default App;
