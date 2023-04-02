import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";  

import { Home } from "./pages/home";                        // "importataan"    oma moduli,    /client/src/pages  kansiosta   home.js
import { Auth } from "./pages/auth";                        // "importataan"    oma moduli,    /client/src/pages  kansiosta   auth.js
import { Createtag } from "./pages/create-tag";             // "importataan"    oma moduli,    /client/src/pages  kansiosta   create-tag.js
import { Navbar } from "./components/navbar";               //  importataan     navbar

function App() {
  return (
    <div className="App">
     <Router>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />        
          <Route path="/auth" element={<Auth />} />        
          <Route path="/create-tag" element={<Createtag />} />                      
      </Routes>
     </Router>
    </div>
  );
}

export default App;
