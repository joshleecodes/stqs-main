import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import * as APIWrapper from "../../api/spaceTradersAPI"

interface LogInProps {
  tokenExists: boolean;
  setToken: (token: string) => void;
  setSymbol: (symbol: string) => void;
  setCredits: (credits: number) => void;
  setShipCount: (shipCount: number) => void;
  setHeadquarters: (headquarters: string) => void;
  setAccountID: (accountID: string) => void;
}

const LogIn = ({
  tokenExists,
  setToken,
  setSymbol,
  setCredits,
  setShipCount,
  setHeadquarters,
  setAccountID,
}: LogInProps) => {
  //const [registerForm, setRegisterForm] = useState({ accToken: "", symbol: ""});
  const [signInForm, setSignInForm] = useState({ agentToken: "" });
  const navigate = useNavigate();

  const updateAgent = (token: string, symbol: string, credits: number, shipCount: number, headquarters: string, accountID: string) => {
    setToken(token);
    setSymbol(symbol);
    setCredits(credits);
    setShipCount(shipCount);
    setHeadquarters(headquarters);
    setAccountID(accountID);
  }
  
  
  useEffect(() => {
    if (tokenExists) {
      //handleSignInLocal();
    }
  }, [tokenExists]);
  

  // const handleRegisterAgent = async () => {
  //   try {
  //     const result = await APIWrapper.registerAgent(registerForm.accToken, registerForm.symbol);
  //     if(result){
  //       console.log(result);
  //       updateAgent(result.token, result.data.symbol, result.data.credits, result.data.shipCount, result.data.headquarters, result.data.accountId);
  //       navigate("/hub");
  //     }
  //   } catch (error) {
  //     console.error('Failed to register agent', error);
  //   }
  // };

  const handleSignIn = async () => {
    try {
      const result = await APIWrapper.getAgent(signInForm.agentToken);
      if(result){
        console.log(result);
        updateAgent(signInForm.agentToken, result.data.symbol, result.data.credits, result.data.shipCount, result.data.headquarters, result.data.accountId);
        navigate("/hub");
      }
    } catch (error) {
      console.error('Failed to sign in', error);
    }
  }

  // const handleSignInLocal = async () => {
  //   const localToken = localStorage.getItem('API Token');
  //   if (localToken) {
  //     try {
  //       const result = await APIWrapper.viewAgentDetails(localToken);
  //       if (result) {
  //         console.log(result);
  //         updateAgent(localToken, result.data.symbol, result.data.credits, result.data.shipCount, result.data.headquarters, result.data.accountId);
  //         navigate("/hub");
  //       }
  //     } catch (error) {
  //       console.error('Stored API TOKEN NOT FOUND', error);
  //     }
  //   } else {
  //     console.error('No token found in local storage.');
  //   }
  // };

  return (
    <div className="login-container">

      {/* <div className="signup-wrapper">
        <h1>REGISTER AGENT</h1>
        <div className="input-wrapper">
          <input name="accountToken" placeholder={"Enter Account Token"} value={registerForm.accToken} onChange={(e) => setRegisterForm({ ...registerForm, accToken: e.currentTarget.value })} />
          <input name="symbol" placeholder={"Enter Symbol"} value={registerForm.symbol} onChange={(e) => setRegisterForm({ ...registerForm, symbol: e.currentTarget.value })} />
        </div>
        <button className="login-button" onClick={handleRegisterAgent}>Register</button>
      </div> */}

      <div className="signin-wrapper">
        <h1>SIGN IN</h1>
        <div className="input-wrapper">
          <input name="agentToken" placeholder={"Enter Agent Token"} value={signInForm.agentToken} onChange={(e) => setSignInForm({ ...signInForm, agentToken: e.currentTarget.value })} />
        </div>
        <button className="login-button" onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  )
}

export default LogIn;