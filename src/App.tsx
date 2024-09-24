import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import LogIn from "./pages/logIn/LogIn";
import Header from "./components/header/Header";
import Hub from "./pages/hub/Hub";
import Contracts from "./pages/contracts/Contracts";
import Market from "./pages/market/Market";
import Shipyard from "./pages/shipyard/Shipyard";
import Mining from "./pages/mining/Mining";

function App() {
  const [token, setToken] = useState<string>( localStorage.getItem("API Token") || '');
  const [symbol, setSymbol] = useState<string>("");
  const [credits, setCredits] = useState<number>(0);
  const [shipCount, setShipCount] = useState<number>(0);
  const [headquarters, setHeadquarters] = useState<string>("");
  const [accountID, setAccountID] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("API Token", token);
  }, [token]);

  const handleLogOut = () => {
    setToken('');
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
              <LogIn
                tokenExists={token !== ''}
                setToken={setToken} 
                setSymbol={setSymbol}
                setCredits={setCredits}
                setShipCount={setShipCount}
                setHeadquarters={setHeadquarters}
                setAccountID={setAccountID}
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
                handleLogOut={handleLogOut}
              />
              <Hub 
                token={token}
                headquarters={headquarters}
                accountID={accountID}
                setCredits={setCredits}
                setShipCount={setShipCount}
              />
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
                handleLogOut={handleLogOut}
              />
              <Contracts 
                token={token}
              />
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
                handleLogOut={handleLogOut}
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
                  handleLogOut={handleLogOut}
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
                handleLogOut={handleLogOut}
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
