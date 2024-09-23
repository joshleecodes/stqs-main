import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import LogIn from "./pages/logIn/LogIn";
import Header from "./components/header/Header";
import Hub from "./pages/hub/Hub";
import Contracts from "./pages/contracts/Contracts";
import Market from "./pages/market/Market";
import Shipyard from "./pages/shipyard/Shipyard";
import Mining from "./pages/mining/Mining";

function App() {
  const [token, setToken] = useState<string>('');
  const [symbol, setSymbol] = useState<string>("");
  const [headquarters, setHeadquarters] = useState<string>("") //Maybe move to Hub page
  const [credits, setCredits] = useState<number>(0);
  const [shipCount, setShipCount] = useState<number>(0);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
              <LogIn 
                setToken={setToken} 
                setSymbol={setSymbol}
                setCredits={setCredits}
                setShipCount={setShipCount}
              />
          }
        />
        <Route 
          path="/hub" 
          element={token ? 
            <>
              <Header
                token={token} 
                symbol={symbol}
                credits={credits}
                shipCount={shipCount}
              />
              <Hub token={token} />
          </> 
          : <Navigate to="/login" />} 
        />
        <Route 
          path="/contracts" 
          element={token ? 
            <>
              <Header
                token={token} 
                symbol={symbol}
                credits={credits}
                shipCount={shipCount}
              />
              <Contracts />
            </>
            : <Navigate to="/login" />} 
        />
        <Route 
          path="/market" 
          element={token ? 
            <>
              <Header
                token={token} 
                symbol={symbol}
                credits={credits}
                shipCount={shipCount}
              />
              <Market />
            </> 
            : <Navigate to="/login" />} 
        />
        <Route 
          path="/shipyard" 
          element={token ? 
            <>
              <Header
                  token={token} 
                  symbol={symbol}
                  credits={credits}
                  shipCount={shipCount}
                />
                <Shipyard />
            </>
          : <Navigate to="/login" />} 
        />
        <Route 
          path="/mining" 
          element={token ? 
            <>
              <Header
                token={token} 
                symbol={symbol}
                credits={credits}
                shipCount={shipCount}
              />
              <Mining />
            </>
          : <Navigate to="/login" />} 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
