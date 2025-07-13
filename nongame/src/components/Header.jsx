import { Link, useLocation } from "react-router";

const Header = () => {
  return (
    <header>
      <img src="src/assets/logo.svg" id="logo" alt="The Nongame! Logo" />
      {useLocation().pathname === "/" ? (
        <div className="heading">The Nongame!</div>
      ) : (
        <Link to="/">The Nongame!</Link>
      )}
      {useLocation().pathname === "/instructions" ? (
        <div className="heading">How to Play</div>
      ) : (
        <Link to="/instructions">How to Play</Link>
      )}
      {useLocation().pathname === "/custom" ? (
        <div className="heading">Custom Deck</div>
      ) : (
        <Link to="/custom">Custom Deck</Link>
      )}
    </header>
  );
};

export default Header;
