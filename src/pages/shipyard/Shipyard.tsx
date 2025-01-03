import { useEffect, useState } from "react"
import * as APIWrapper from "./../../api/spaceTradersAPI"


interface ShipyardProps {
    token: string;
    systemSymbol: string;
}

interface Shipyard {
    systemSymbol: string;
    symbol: string;
    type: "ORBITAL_STATION" | "MOON";
    x: number;
    y: number;
    orbitals: any[];
    traits: string[];
    modifiers: any[];
    chart: string;
    faction: string;
    orbits: string;
    isUnderConstruction: boolean;
}

interface Ship {
    shipSymbol: string,
    shipType: string,
    waypointSymbol: string,
    agentSymbol: string,
    price: number,
    timestamp: string
}

const Shipyard = ({
    token,
    systemSymbol
}: ShipyardProps) => {
    const [shipyards, setShipyards] = useState<Shipyard[]>([]);
    const [shipList, setShipList] = useState<Ship[]>([]);
    

    useEffect(() => {
        findShipyards(token, systemSymbol);
    }, []);

    const findShipyards = async (token: string, systemSymbol: string) => {
        try {
            const result = await APIWrapper.findShipyard(token, systemSymbol);
            if (result) {
                setShipyards(result.data);
            }
        } catch (error) {
            console.error('Error fetching shipyard:', error);
        }
        console.log(shipyards);
    };

    return(<>
        <h1>Shipyard</h1>
    </>)

}

export default Shipyard;