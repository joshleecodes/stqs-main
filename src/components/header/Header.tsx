


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
            <div className="symbol-wrapper">{symbol}{credits}{shipCount}</div>
        </div>
    )
}

export default Header;