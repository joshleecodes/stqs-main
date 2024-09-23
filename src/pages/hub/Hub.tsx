import * as APIWrapper from "../../api/spaceTradersAPI"


interface HubProps {
  token: string;
  headquarters: string;
  accountID: string;
}

const Hub = ({
  token,
  headquarters,
  accountID,
}: HubProps) => {

  const handleViewAgentDetails = async () => {
    try {
      const result = await APIWrapper.viewAgentDetails(token);
      if (result) {
        console.log(result);
      }
    } catch (error) {
      console.error('Error fetching agent data:', error);
    }
  };

  const handleViewStartingLocation = async () => {
    try {
      const result = await APIWrapper.viewStartingLocation(token);
      if (result) {
        console.log(result);
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  return (
    <div>
      
      <h1>Hub</h1>
      <p>{headquarters}</p>
      <p>{accountID}</p>
      
      <input type="submit" value="show agent" onClick={handleViewAgentDetails} />
      <input type="submit" value="show starting location" onClick={handleViewStartingLocation} />
    </div>
  );
}

export default Hub;