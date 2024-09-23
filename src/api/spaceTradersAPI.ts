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

export const signUp = async (symbol: string, faction: string) => {
  const resp = await fetch(API_URL_BASE + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      symbol: symbol,
      faction: faction
    }),
  });

  return await checkAPIResponse(resp, "signUp Error");
};


export const viewAgentDetails = async (token: string) => {
  const resp = await fetch(API_URL_BASE + "/my/agent", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token, 
    },
  });
  
  return await checkAPIResponse(resp, "viewAgent Error");
};

export const viewStartingLocation = async (token: string) => {
  const resp = await fetch(API_URL_BASE + "/systems/X1-FS16/waypoints/X1-FS16-A1", {
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