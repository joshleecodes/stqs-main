import { useState } from "react"
import { useNavigate } from "react-router-dom";
import * as APIWrapper from "../../api/spaceTradersAPI"


interface LogInProps {
  setToken: (token: string) => void;
  setSymbol: (symbol: string) => void;
  setCredits: (credits: number) => void;
  setShipCount: (shipCount: number) => void;
}

const LogIn = ({
  setToken,
  setSymbol,
  setCredits,
  setShipCount,
}: LogInProps) => {
  const [signUpForm, setSignUpForm] = useState({ symbol: "", faction: "COSMIC" });
  const [signInForm, setSignInForm] = useState({ token: ""});
  const navigate = useNavigate();

  const updateAgent = (token: string, symbol: string, credits: number, shipCount: number) => {
    console.log("UPDATED: " + "token: " + token + " symbol: " + symbol + " credits: " + credits + " shipcount: " + shipCount);
    setToken(token);
    setSymbol(symbol);
    setCredits(credits);
    setShipCount(shipCount);
  }

  const handleSignUp = async () => {
    try {
      const result = await APIWrapper.signUp(signUpForm.symbol, signUpForm.faction);
        console.log(result);
        updateAgent(result.data.token, result.data.agent.symbol, result.data.agent.symbol, result.data.agent.shipCount);
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
        updateAgent(signInForm.token, result.data.symbol, result.data.credits, result.data.shipCount);
        navigate("/hub");
      }
    } catch (error) {
      console.error('API TOKEN NOT FOUND', error);
    }
  };


  return (
    <div className="login-container">

      <div className="signup-wrapper">
        <h1>Sign Up</h1>
        <input name="symbol" value={signUpForm.symbol} onChange={(e) => setSignUpForm({ ...signUpForm, symbol: e.currentTarget.value })} />
        <input name="faction" value={signUpForm.faction} onChange={(e) => setSignUpForm({ ...signUpForm, faction: e.currentTarget.value })} />
        <input type="submit" onClick={handleSignUp} />
      </div>

      <div className="signin-wrapper">
        <h1>Sign In</h1>
        <input name="token" value={signInForm.token} onChange={(e) => setSignInForm({ ...signInForm, token: e.currentTarget.value })} />
      
        <input type="submit" onClick={handleSignIn} />
      </div>
    </div>
  )
}

export default LogIn;