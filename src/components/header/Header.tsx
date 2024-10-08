import { Link } from "react-router-dom";

interface HeaderProps {
    token: string,
    symbol: string,
    credits: number,
    shipCount: number,
    handleLogOut: () => void
}

const Header = ({
    token,
    symbol,
    credits,
    shipCount,
    handleLogOut
}: HeaderProps) => {

    const copyToken = () => {
        navigator.clipboard.writeText(token);
        alert("Token Copied");
    }

    return (
        <div className="header-container">
            <div className="header-details-wrapper">
                <h2 className="details-symbol details-info" onClick={copyToken}>{symbol}</h2>
                <div className="details-credits details-info">CREDITS: {credits}</div>
                <div className="details-shipcount details-info">SHIPS: {shipCount}</div>
            </div>
            <div className="header-nav-wrapper">
                <Link className="nav-item" to="/hub">Hub</Link>
                <Link className="nav-item" to="/contracts">Contracts</Link>
                <Link className="nav-item" to="/shipyard">Shipyard</Link>
                <Link className="nav-item" to="/mining">Mining</Link>
                <Link className="nav-item" to="/market">Market</Link>
                <button className="header-button nav-item" onClick={handleLogOut}>Log Out</button>
            </div>
            
        </div>
    )
}

export default Header;