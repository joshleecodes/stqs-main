import { useState } from "react"
import { Link } from "react-router-dom";
import * as APIWrapper from "../../api/spaceTradersAPI"


interface HubProps {
  token: string;
}

const Hub = ({
  token,
}: HubProps) => {
  const [resp, setResp] = useState<string>("");
  

  const handleViewAgentDetails = async () => {
    try {
      const result = await APIWrapper.viewAgentDetails(token);
      if (result) {
        setResp(result);
      }
    } catch (error) {
      console.error('Error fetching agent data:', error);
    }
  };

  const handleViewStartingLocation = async () => {
    try {
      const result = await APIWrapper.viewStartingLocation(token);
      if (result) {
        setResp(result);
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  return (
    <div>
      <h1>Hub</h1>
      <nav>
        <ul>
          <li><Link to="/contracts">Contracts</Link></li>
          <li><Link to="/market">Market</Link></li>
          <li><Link to="/shipyard">Shipyard</Link></li>
          <li><Link to="/mining">Mining</Link></li>
        </ul>
      </nav>
      <input type="submit" value="show agent" onClick={handleViewAgentDetails} />
      <input type="submit" value="show starting location" onClick={handleViewStartingLocation} />
      <pre>Response: {resp}</pre>
      <pre>token: {token}</pre>
    </div>
  );
}

export default Hub;