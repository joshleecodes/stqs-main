import { useState } from "react"
import * as APIWrapper from "./../../api/spaceTradersAPI"

const Contracts = () => {
    const [token, setToken] = useState<string>("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiSVJPTlNFQSIsInZlcnNpb24iOiJ2Mi4yLjAiLCJyZXNldF9kYXRlIjoiMjAyNC0wOS0wMSIsImlhdCI6MTcyNjkzMTAzMCwic3ViIjoiYWdlbnQtdG9rZW4ifQ.ZNAybyCWBfzTVbr_oJj1KuQYka_0AlreLAaupgxT4RajuXLJGq5Z0Wwcm0sroylZisitDzug3f71_BldVvaIKuqHYWS-BQ_ZJB3Om0c7Z9jqz_ADvMSsNIcR-op5uP0FRBMQPv0CO1QR-ChfG9_EZHpmBh-XoPNeJDsscdsrbWQbp6zWMwDYxPjM0b8Ha8XkvKtCJoILY7PFqPivYa7DOl70g-hRubcsGxpuy-7s_9GPbaxGFMvt0zk0sWgq9vMfSjylEGJ-cvNn3w-ooAFS7KrWsLFvJfQjBzkB1d7VM_fqr5rEybMlqE6JMzDxXm1DLq-lNw5vvz0SveLWs1abFw");
    const [resp, setResp] = useState<string>("");

    const handleViewContracts = async () => {
        try {
          const result = await APIWrapper.viewContracts(token);
          if (result) {
            setResp(result);
          }
        } catch (error) {
          console.error('Error fetching contract data:', error);
        }
      };

    return(<>
        <h1>Contracts</h1>
        <input type="submit" value="show starting location" onClick={handleViewContracts} />
        <pre>Response:{resp}</pre>
    </>)

}

export default Contracts;