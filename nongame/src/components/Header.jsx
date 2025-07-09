import { Link, useLocation } from "react-router";

const Header = () => {
  return (
    <header>
      {useLocation().pathname === "/" ? (
        <div id="heading">The Nongame!</div>
      ) : (
        <Link to="/">The Nongame!</Link>
      )}
      <img src="src/assets/logo.svg" id="logo" alt="logo" />
      {useLocation().pathname === "/instructions" ? (
        <div id="heading">How to Play</div>
      ) : (
        <Link to="/instructions">How to Play</Link>
      )}
    </header>
  );
};

export default Header;
