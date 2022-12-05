import Header from './component/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchFilter from './component/searchFilter';
import Table from './component/Table';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  
  return (
    <div className="App">
      <Header />
      <Table  />
    </div>
  );
}

export default App;
