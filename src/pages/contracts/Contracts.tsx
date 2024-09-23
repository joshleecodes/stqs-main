import { useState } from "react"
import * as APIWrapper from "./../../api/spaceTradersAPI"

interface ContractsProps {
  token: string;
}

interface Contract {
  id: string;
  factionSymbol: string;
  type: string;
  terms: {
    deadline: string;
    payment: {
      onAccepted: number;
      onFulfilled: number;
    };
    deliver: {
      tradeSymbol: string;
      destinationSymbol: string;
      unitsRequired: number;
      unitsFulfilled: number;
    }[];
  };
  accepted: boolean;
  fulfilled: boolean;
  expiration: string;
  deadlineToAccept: string;
}

const Contracts = ({
token,
}: ContractsProps) => {
  const [contracts, setContracts] = useState<Contract[]>([]);

    const handleViewContracts = async () => {
      try {
        const result = await APIWrapper.viewContracts(token);
        if (result) {
          setContracts(result.data);
          console.log(result);
        }
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    };

    const acceptContract = async (contractID: string) => {
      try {
        const result = await APIWrapper.acceptContract(token, contractID);
        if (result) {
          console.log(result);
        }
      } catch (error) {
        console.error('Error accepting contract:', error);
      }
    }

    

    return(<>
        <h1>Contracts</h1>
        <input type="submit" value="View Contracts" onClick={handleViewContracts} />

        {contracts.length > 0 ? (
        <div className="contract-list-wrapper">
          {contracts.map((contract) => (
            <div key={contract.id} className="contract-wrapper">
              <p>Contract Type: {contract.type}</p>
              <p>Accepted: {contract.accepted? 'Yes' : 'No'}</p>
              <p>Deadline to Accept: {new Date(contract.deadlineToAccept).toLocaleString()}</p>
              <p>Completed: {contract.fulfilled? 'Yes' : 'No'}</p>
              <h3>Terms:</h3>
              <p>Deadline: {new Date(contract.terms.deadline).toLocaleString()}</p>
              <p>Payment on Accept: {contract.terms.payment.onAccepted}</p>
              <p>Payment on Fulfill: {contract.terms.payment.onFulfilled}</p>
              <h3>Delivery Terms: </h3>
              <ul>
                {contract.terms.deliver.map((item, index) => (
                  <li key={index}>
                    {item.unitsRequired} {item.tradeSymbol} to {item.destinationSymbol}
                  </li>
                ))}
              </ul>
              {!contract.accepted && (
                <input type="submit" value="Accept Contract" onClick={() => acceptContract(contract.id)} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No contracts available.</p>
      )}
    </>)

}

export default Contracts;