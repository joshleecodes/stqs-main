const API_URL_BASE = 'https://api.spacetraders.io/v2';


const checkAPIResponse = async (response: Response, errorMessage: string) => {
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    console.log(response);
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
};


// ACCOUNT API REQUESTS

// Fetch your account details
export const getAccountDetails = async (token: string) => {
  const resp = await fetch(API_URL_BASE + "/my/account", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "viewAccount Error");
};

// Creates a new agent and ties it to an account
export const registerAgent = async (token: string, symbol: string) => {
  const resp = await fetch(API_URL_BASE + "/register", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        "symbol": symbol,
        "faction": "COSMIC",
      }),
  });
  return await checkAPIResponse(resp, "viewAgent Error");
};


// AGENTS API REQUESTS

// List all public agent details
export const listPublicAgents = async (token: string, page?: number, limit?: number) => {
  const resp = await fetch(API_URL_BASE + "/agents", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "listPublicAgents Error");
}

// Get public details for a specific agent
export const getPublicAgentDetails = async (token: string, agentSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/agents/" + agentSymbol, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "getPublicAgentDetails Error");
}

// Fetch your agent's details
export const getAgent = async (token: string) => {
  const resp = await fetch(API_URL_BASE + "/my/agent", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    }
  });
  return await checkAPIResponse(resp, "getAgent Error");
};

// Get recent events for your agent
export const getAgentEvents = async (token: string) => {
  const resp = await fetch(API_URL_BASE + "/my/agent/events", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    }
  });
  return await checkAPIResponse(resp, "getAgentEvents Error");
};

// Get agent starting location details
export const viewStartingLocation = async (token: string, headquarters: string) => {
  const systemSymbol = headquarters.substring(0, headquarters.lastIndexOf("-"));
  const resp = await fetch(API_URL_BASE + "/systems/" + systemSymbol +"/waypoints/" + headquarters, {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "viewStartingLocation Error");
};


//CONTRACT API REQUESTS

// Return a paginated list of all your contracts
export const listContracts = async (token: string, page?: number, limit?: number) => {
  const resp = await fetch(API_URL_BASE + "/my/contracts", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "viewContract Error");
};

// Get the details of a specific contract
export const getContract = async (token: string, contractID: string) => {
  const resp = await fetch(API_URL_BASE + "/my/contracts/" + contractID, {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "viewContract Error");
};

// Accept a contract by contract ID
export const acceptContract = async (token: string, contractID: string) => {
  const resp = await fetch(API_URL_BASE + "/my/contracts/" + contractID + "/accept", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "acceptContract Error");
};

// Fulfill a contract
export const fulfillContract = async (token: string, contractID: string) => {
  const resp = await fetch(API_URL_BASE + "/my/contracts" + contractID + "/fulfill", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "fulfillContract Error");
};

// Deliver cargo to a contract
export const deliverCargo = async (token: string, contractID: string, shipSymbol: string, tradeSymbol: string, units: number) => {
  const resp = await fetch(API_URL_BASE + "/my/contracts/" + contractID + "/deliver", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        "shipSymbol": shipSymbol,
        "tradeSymbol": tradeSymbol,
        "units": units
      }),
  });
  return await checkAPIResponse(resp, "deliverCargo Error");
};

// Negotiate cargo to a contract
export const negotiateContract = async (token: string, shipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/"+ shipSymbol +"/negotiate/contract", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "negotiateContract Error");
};


// FACTION API REQUESTS

// Return a paginated list of all the factions in the game
export const listFactions = async (token: string, page?: number, limit?: number) => {
  const resp = await fetch(API_URL_BASE + "/factions", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "listFactions Error");
};

// View the details of a faction
export const getFactionDetails = async (token: string, factionSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/factions/" + factionSymbol, {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "getFactionDetails Error");
};

// Retrieve factions with which the agent has reputation
export const getAgentFactions = async (token: string, page?: number, limit?: number) => {
  const resp = await fetch(API_URL_BASE + "/my/factions", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "getAgentFactions Error");
};


// FLEET API REQUESTS

// Return a paginated list of all of ships under your agent's ownership
export const listAgentShips = async (token: string, page?: number, limit?: number) => {
  const resp = await fetch(API_URL_BASE + "/my/ships", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "listAgentShips Error");
};

// Purchase a ship from a Shipyard
export const purchaseShip = async (token: string, shipType: string, waypointSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        "shipType": shipType,
        "waypointSymbol": waypointSymbol
      }),
  });
  return await checkAPIResponse(resp, "purchaseShip Error");
};

// Retrieve the details of a ship under your agent's ownership
export const getShip = async (token: string, shipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "getShip Error");
};

// Command a ship to chart the waypoint at its current location
export const createChart = async (token: string, shipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/chart", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "createChart Error");
};

// Retrieve the details of your ship's reactor cooldown
export const getShipCooldown = async (token: string, shipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/cooldown", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "getShipCooldown Error");
};

// Attempt to dock your ship at its current location
export const dockShip = async (token: string, shipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/dock", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "dockShip Error");
};

// Extract resources from a waypoint that can be extracted, such as asteroid fields, into your ship
export const extractResources = async (token: string, shipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/extract", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "extractResources Error");
};

// Use a survey when extracting resources from a waypoint
export const extractResourcesWithSurvey = async (token: string, shipSymbol: string, signature: string, symbol: string, surveyDeposit: string[], expiration: string, size: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/extract/survey", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    signature: signature,
    symbol: symbol,
    deposits: [{
      surveyDeposit
    }],
    expiration: expiration,
    size: size
    }),
  });
  return await checkAPIResponse(resp, "extractResourcesWithSurvey Error");
};

// Jettison cargo from your ship's cargo hold
export const jettisonCargo = async (token: string, shipSymbol: string, symbol: string, units: number) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/jettison", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    symbol: symbol,
    units: units
    }),
  });
  return await checkAPIResponse(resp, "jettisonCargo Error");
};

// Jump your ship instantly to a target connected waypoint
export const jumpShip = async (token: string, shipSymbol: string, waypointSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/jump", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    waypointSymbol: waypointSymbol
    }),
  });
  return await checkAPIResponse(resp, "jumpShip Error");
};

// Scan for nearby systems, retrieving information on the systems' distance from the ship and their waypoints
export const scanSystems = async (token: string, shipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/scan/systems", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "scanSystems Error");
};

// Scan for nearby waypoints, retrieving detailed information on each waypoint in range
export const scanWaypoints = async (token: string, shipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/scan/waypoints", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "scanSystems Error");
};

// Scan for nearby ships, retrieving information for all ships in range
export const scanShips = async (token: string, shipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/scan/ships", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "scanShips Error");
};

// Scrap a ship, removing it from the game and receiving a portion of the ship's value back in credits
export const scrapShip = async (token: string, shipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/scrap", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "scrapShip Error");
};

// Get the value of scrapping a ship
export const getScrapShip = async (token: string, shipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/scrap", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "getScrapShip Error");
};

// Navigate to a target destination
export const navigateShip = async (token: string, shipSymbol: string, waypointSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/navigate", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    waypointSymbol: waypointSymbol
    }),
  });
  return await checkAPIResponse(resp, "navigateShip Error");
};

// Warp your ship to a target destination in another system
export const warpShip = async (token: string, shipSymbol: string, waypointSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/warp", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    waypointSymbol: waypointSymbol
    }),
  });
  return await checkAPIResponse(resp, "warpShip Error");
};

// Attempt to move your ship into orbit at its current location
export const orbitShip = async (token: string, shipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/orbit", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  return await checkAPIResponse(resp, "orbitShip Error");
};

// Purchase cargo from a market
export const purchaseCargo = async (token: string, shipSymbol: string, symbol: string, units: number) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/purchase", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    symbol: symbol,
    units: units
    }),
  });
  return await checkAPIResponse(resp, "purchaseCargo Error");
};

// Attempt to refine the raw materials on your ship
export const shipRefine = async (token: string, shipSymbol: string, produce: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/refine", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    produce: produce
    }),
  });
  return await checkAPIResponse(resp, "shipRefine Error");
};

// Refuel your ship by buying fuel from the local market
export const refuelShip = async (token: string, shipSymbol: string, units?: number, fromCargo?: boolean) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/refuel", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    units: units,
    fromCargo: fromCargo
    }),
  });
  return await checkAPIResponse(resp, "refuelShip Error");
};

// Repair a ship, restoring the ship to maximum condition
export const repairShip = async (token: string, shipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/repair", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "repairShip Error");
};

// Get the cost of repairing a ship
export const getRepairShip = async (token: string, shipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/repair", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "getRepairShip Error");
};

// Sell cargo in your ship to a market that trades this cargo
export const sellCargo = async (token: string, shipSymbol: string, symbol: string, units: number) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/sell", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    symbol: symbol,
    units: units
    }),
  });
  return await checkAPIResponse(resp, "sellCargo Error");
};

// Siphon gases or other resources from gas giants
export const siphonResources = async (token: string, shipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/siphon", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "siphonResources Error");
};

// Create surveys on a waypoint that can be extracted such as asteroid fields
export const createSurvey = async (token: string, shipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/survey", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "createSurvey Error");
};

// Transfer cargo between ships
export const transferCargo = async (token: string, shipSymbol: string, tradeSymbol: string, units: number, toShipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/transfer", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    tradeSymbol: tradeSymbol,
    units: units,
    toShipSymbol: toShipSymbol
    }),
  });
  return await checkAPIResponse(resp, "transferCargo Error");
};

// Retrieve the cargo of a ship under your agent's ownership
export const getShipCargo = async (token: string, shipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/cargo", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "getShipCargo Error");
};

// Get the modules installed on a ship
export const getShipModules = async (token: string, shipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/modules", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "getShipModules Error");
};

// Install a module on a ship
export const installShipModule = async (token: string, shipSymbol: string, symbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/modules/install", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    symbol: symbol
  })
  });
  return await checkAPIResponse(resp, "installShipModule Error");
};

// Remove a module from a ship
export const removeShipModule = async (token: string, shipSymbol: string, symbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/modules/remove", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    symbol: symbol
  })
  });
  return await checkAPIResponse(resp, "removeShipModule Error");
};

// Get the mounts installed on a ship
export const getMounts = async (token: string, shipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/mounts", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "getMounts Error");
};

// Install a mount on a ship
export const installMount = async (token: string, shipSymbol: string, symbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/mounts/install", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    symbol: symbol
  })
  });
  return await checkAPIResponse(resp, "installMount Error");
};

// Remove a mount on a ship
export const removeMount = async (token: string, shipSymbol: string, symbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/mounts/remove", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    symbol: symbol
  })
  });
  return await checkAPIResponse(resp, "removeMount Error");
};

// Get the current nav status of a ship
export const getShipNav = async (token: string, shipSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/nav", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "getShipNav Error");
};

// Update the nav configuration of a ship
export const patchShipNav = async (token: string, shipSymbol: string, flightMode?: string) => {
  const resp = await fetch(API_URL_BASE + "/my/ships/" + shipSymbol + "/nav", {
    method: "PATCH",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    flightMode: flightMode
  })
  });
  return await checkAPIResponse(resp, "patchShipNav Error");
};


// SYSTEMS API REQUESTS

// Return a paginated list of all systems
export const listSystems = async (token: string, page?: number, limit?: number) => {
  const resp = await fetch(API_URL_BASE + "/systems", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "listSystems Error");
};

// Get the details of a system
export const getSystems = async (token: string, systemSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/systems" + systemSymbol, {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "getSystems Error");
};

// Return a paginated list of all of the waypoints for a given system
export const listWaypointInSystem = async (token: string, systemSymbol: string, page?: number, limit?: number, traits?: string[]) => {
  const resp = await fetch(API_URL_BASE + "/systems" + systemSymbol + "/waypoints", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "listWaypointInSystem Error");
};

// View the details of a waypoint
export const getWaypoint = async (token: string, systemSymbol: string, waypointSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/systems" + systemSymbol + "/waypoints/" + waypointSymbol, {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "getWaypoint Error");
};

// Get construction details for a waypoint
export const getContructionSite = async (token: string, systemSymbol: string, waypointSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/systems" + systemSymbol + "/waypoints/" + waypointSymbol + "/construction", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  return await checkAPIResponse(resp, "getWaypoint Error");
};

// Supply a construction site with the specified good
export const supplyContructionSite = async (token: string, systemSymbol: string, waypointSymbol: string, shipSymbol: string, tradeSymbol: string, units: string) => {
  const resp = await fetch(API_URL_BASE + "/systems" + systemSymbol + "/waypoints/" + waypointSymbol + "/construction/supply", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    shipSymbol: shipSymbol,
    tradeSymbol: tradeSymbol,
    units: units
  })
  });
  return await checkAPIResponse(resp, "getWaypoint Error");
};

// Retrieve imports, exports and exchange data from a marketplace
export const getMarket = async (token: string, systemSymbol: string, waypointSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/systems" + systemSymbol + "/waypoints/" + waypointSymbol + "/market", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "getMarket Error");
};

// Get jump gate details for a waypoint
export const getJumpGate = async (token: string, systemSymbol: string, waypointSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/systems" + systemSymbol + "/waypoints/" + waypointSymbol + "/jump-gate", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "getJumpGate Error");
};

// Get jump gate details for a waypoint
export const getShipyard = async (token: string, systemSymbol: string, waypointSymbol: string) => {
  const resp = await fetch(API_URL_BASE + "/systems" + systemSymbol + "/waypoints/" + waypointSymbol + "/shipyard", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "getShipyard Error");
};


// DATA API REQUESTS

// Describes which import and exports map to each other
export const describeTradeRelation = async (token: string) => {
  const resp = await fetch(API_URL_BASE + "/market/supply-chain", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "describeTradeRelation Error");
};

// Subscribe to departure events for a system
export const subscribeToEvents = async (token: string) => {
  const resp = await fetch(API_URL_BASE + "/my/socket.io", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "subscribeToEvents Error");
};


// GLOBAL API REQUESTS

// Return the status of the game server
export const getServerStatus = async (token: string) => {
  const resp = await fetch(API_URL_BASE, {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "getServerStatus Error");
};

// Return a list of all possible error codes thrown by the game server
export const getErrorCodeList = async (token: string) => {
  const resp = await fetch(API_URL_BASE + "/error-codes", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    },
  });
  return await checkAPIResponse(resp, "getErrorCodeList Error");
};