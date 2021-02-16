import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>TaskIt</h1>
      </header>
      <footer>
        <p>2021 Team 011_6 ERROR404</p>
        <a
          className="githubLink"
          href="https://github.com/CSCI-3308-CU-Boulder/3308SP21_011_6"
          target="_blank"
          rel="noopener noreferrer"
        >
          Code in github
        </a>
      </footer>
    </div>
  );
}

export default App;
