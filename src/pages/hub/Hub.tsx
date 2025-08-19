import { useState, useEffect } from "react"
import * as APIWrapper from "../../api/spaceTradersAPI"

interface HubProps {
  token: string;
  headquarters: string;
  accountID: string;
  setCredits: (credits: number) => void;
  setShipCount: (shipCount: number) => void;
}

interface Location {
  systemSymbol: string;
  symbol: string;
  type: string;
  x: number;
  y: number;
  orbitals: { symbol: string }[];
  traits: {
    symbol: string;
    name: string;
    description: string;
  }[];
  faction: {
    symbol: string;
  };
}

const Hub = ({
  token,
  headquarters,
  accountID,
  setCredits,
  setShipCount,
}: HubProps) => {
  const [startingLocation, setStartingLocation] = useState<Location | null>(null);

  const refreshAgentDetails = (credits: number, shipCount: number) => {
    setCredits(credits);
    setShipCount(shipCount);
    console.log(shipCount);
  }

  useEffect(() => {
    handleViewStartingLocation();
  }, []);

  const handleViewAgentDetails = async () => {
    try {
      const result = await APIWrapper.getAgent(token);
      if (result) {
        refreshAgentDetails(result.data.credits, result.data.shipCount)
      }
    } catch (error) {
      console.error('Error fetching agent data:', error);
    }
  };

  const handleViewStartingLocation = async () => {
    try {
      const result = await APIWrapper.viewStartingLocation(token, headquarters);
      if (result) {
        console.log(result);
        setStartingLocation(result.data);
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  return (
    <div className="hub-container">
      <div className="agent-details-wrapper hub-details">
        <h2>Agent Details:</h2>
        <p>Account ID: {accountID}</p>
        <p>Headquarters: {headquarters}</p>
        
        <button onClick={handleViewAgentDetails}>Refresh</button>
      </div>
      
      <div className="location-details-wrapper hub-details">
        <h2>Location Details:</h2>
        {startingLocation ? (
          <div>
            <p>System: {startingLocation.systemSymbol}</p>
            <p>Faction: {startingLocation.faction.symbol}</p>
            <p>Type: {startingLocation.type}</p>
            <p>Number of Orbitals: {startingLocation.orbitals.length}</p>
            <p>Number of Traits: {startingLocation.traits.length}</p>
            <p>Coordinates: ({startingLocation.x}, {startingLocation.y})</p>
          </div>
        ) : (
          <p>Loading location data...</p>
        )}
        <button onClick={handleViewStartingLocation}>Refresh</button>
      </div>
    </div>
  );
}

export default Hub;