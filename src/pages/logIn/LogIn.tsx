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
  const [signUpForm, setSignUpForm] = useState({ symbol: "", faction: "COSMIC" });
  const [signInForm, setSignInForm] = useState({ token: ""});
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
      handleSignInLocal();
    }
  }, [tokenExists]);

  const handleSignUp = async () => {
    try {
      const result = await APIWrapper.signUp(signUpForm.symbol, signUpForm.faction);
        console.log(result);
        updateAgent(result.data.token, result.data.agent.symbol, result.data.agent.credits, result.data.agent.shipCount, result.data.agent.headquarters, result.data.agent.accountId);
        navigate("/hub");

    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      const result = await APIWrapper.viewAgentDetails(signInForm.token);

      if(result){
        console.log(result);
        updateAgent(signInForm.token, result.data.symbol, result.data.credits, result.data.shipCount, result.data.headquarters, result.data.accountId);
        navigate("/hub");
      }
    } catch (error) {
      console.error('API TOKEN NOT FOUND', error);
    }
  };

  const handleSignInLocal = async () => {
    const localToken = localStorage.getItem('API Token');
    if (localToken) {
      try {
        const result = await APIWrapper.viewAgentDetails(localToken);
        if (result) {
          console.log(result);
          updateAgent(localToken, result.data.symbol, result.data.credits, result.data.shipCount, result.data.headquarters, result.data.accountId);
          navigate("/hub");
        }
      } catch (error) {
        console.error('Stored API TOKEN NOT FOUND', error);
      }
    } else {
      console.error('No token found in local storage.');
    }
  };

  return (
    <div className="login-container">

      <div className="signup-wrapper">
        <h1>REGISTER</h1>
        <div className="input-wrapper">
          <input name="symbol" placeholder={"Enter Symbol"} value={signUpForm.symbol} onChange={(e) => setSignUpForm({ ...signUpForm, symbol: e.currentTarget.value })} />
          <input name="faction" placeholder={"Enter Faction"} value={signUpForm.faction} onChange={(e) => setSignUpForm({ ...signUpForm, faction: e.currentTarget.value })} />
        </div>
        
        <button className="login-button" onClick={handleSignUp}>Sign Up</button>
      </div>

      <div className="signin-wrapper">
        <h1>SIGN IN</h1>
        <div className="input-wrapper">
          <input name="token" placeholder={"Enter Token"} value={signInForm.token} onChange={(e) => setSignInForm({ ...signInForm, token: e.currentTarget.value })} />
        </div>
        <button className="login-button" onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  )
}

export default LogIn;