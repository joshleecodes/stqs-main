import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import LogIn from "./pages/logIn/LogIn";
import Hub from "./pages/hub/Hub";
import Contracts from "./pages/contracts/Contracts";
import Market from "./pages/market/Market";
import Shipyard from "./pages/shipyard/Shipyard";
import Mining from "./pages/mining/Mining";

function App() {
  const [token, setToken] = useState<string>('');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn token={token} setToken={setToken} />} />
        <Route 
          path="/hub" 
          element={token ? <Hub token={token} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/contracts" 
          element={token ? <Contracts /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/market" 
          element={token ? <Market /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/shipyard" 
          element={token ? <Shipyard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/mining" 
          element={token ? <Mining /> : <Navigate to="/login" />} 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
