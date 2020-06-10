import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingForm from './ShoppingForm';
import ShoppingList from './ShoppingList';
function App() {
  return (
    <div className="App">
		<ShoppingForm />
		<hr/>
		<ShoppingList/>
    </div>
  );
}

export default App;
