import logo from './logo.svg';
import './App.css';
import Nqueens from './pages/NQueens/Nqueens';
import { createContext, useContext, useState } from 'react';


export const Appcontext = createContext();
function App() {
  const [result, setResult] = useState([]);
  return (
    <>
      <Appcontext.Provider value={{ setResult, result }}>
      
      <Nqueens/>
      </Appcontext.Provider>
    </>
  );
}

export default App;
