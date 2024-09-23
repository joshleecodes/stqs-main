import { useState } from "react"
import * as APIWrapper from "./../../api/spaceTradersAPI"

interface ContractsProps {
  token: string;
}

const Contracts = ({
token,
}: ContractsProps) => {

    const handleViewContracts = async () => {
        try {
          const result = await APIWrapper.viewContracts(token);
          if (result) {
            console.log(result);
          }
        } catch (error) {
          console.error('Error fetching contract data:', error);
        }
      };

    return(<>
        <h1>Contracts</h1>
        <input type="submit" value="show starting location" onClick={handleViewContracts} />
    </>)

}

export default Contracts;