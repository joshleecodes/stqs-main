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

export const getAccountDetails = async (token: string) => {
  const resp = await fetch(API_URL_BASE + "/my/account", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token, 
    },
  });
  return await checkAPIResponse(resp, "viewAccount Error");
};

export const registerAgent = async (token: string, symbol: string) => {
  const resp = await fetch(API_URL_BASE + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token, 
    },
    body: JSON.stringify({
        "symbol" : symbol,
         "faction" : "COSMIC",
      }),
  });
  return await checkAPIResponse(resp, "viewAgent Error");
};

export const getAgent = async (token: string) => {
  const resp = await fetch(API_URL_BASE + "/my/agent", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token, 
    }
  });
  return await checkAPIResponse(resp, "getAgent Error");
};

export const viewStartingLocation = async (token: string, headquarters: string) => {
  const systemSymbol = headquarters.substring(0, headquarters.lastIndexOf("-"));
  const resp = await fetch(API_URL_BASE + "/systems/" + systemSymbol +"/waypoints/" + headquarters, {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token,
    },
  });
  return await checkAPIResponse(resp, "viewStartingLocation Error");
};

export const viewContracts = async (token: string) => {
  const resp = await fetch(API_URL_BASE + "/my/contracts", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token,
    },
  });
  
  return await checkAPIResponse(resp, "viewContract Error");
};

export const acceptContract = async (token: string, contractID: string) => {
  const resp = await fetch(API_URL_BASE + "/my/contracts/" + contractID + "/accept", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

  return await checkAPIResponse(resp, "acceptContract Error");
};