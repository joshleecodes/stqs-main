import { useState } from "react"
import { useNavigate } from "react-router-dom";
import * as APIWrapper from "../../api/spaceTradersAPI"


interface LogInProps {
  token: string;
  setToken: (token: string) => void;
}

const LogIn = ({
  token,
  setToken,
}: LogInProps) => {
  const [resp, setResp] = useState<string>("");
  const [signUpForm, setSignUpForm] = useState({ symbol: "", faction: "COSMIC" });
  const [signInForm, setSignInForm] = useState({ token: ""});
  const navigate = useNavigate();


  const handleSignUp = async () => {
    try {
      const result = await APIWrapper.signUp(signUpForm.symbol, signUpForm.faction);
        setResp(result);
        setToken(JSON.parse(result).data.token)
        navigate("/hub");

    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      const result = await APIWrapper.viewAgentDetails(signInForm.token);
      if(result){
        setToken(signInForm.token);
        navigate("/hub");
      }
    } catch (error) {
      console.error('API TOKEN NOT FOUND', error);
      setResp('API TOKEN NOT FOUND');
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

      <pre>Response: {resp}</pre>
      <pre>token: {token}</pre>
    </div>
  )
}

export default LogIn;