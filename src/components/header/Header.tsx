import { Link } from "react-router-dom";

interface HeaderProps {
    token: string,
    symbol: string,
    credits: number,
    shipCount: number,
}

const Header = ({
    token,
    symbol,
    credits,
    shipCount
}: HeaderProps) => {

    return (
        <div className="header-container">
            <div className="header-details-wrapper">
                <Link className="details-symbol" to="/hub">{symbol}</Link>
                <div className="details-credits">{credits}</div>
                <div className="details-shipcount">{shipCount}</div>
                <div className="details-token">TOKEN</div>
            </div>
            <div className="header-nav-wrapper">
                <Link to="/contracts">Contracts</Link>
                <Link to="/shipyard">Shipyard</Link>
                <Link to="/mining">Mining</Link>
                <Link to="/market">Market</Link>
            </div>
        </div>
    )
}

export default Header;