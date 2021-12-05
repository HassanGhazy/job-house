import './style.css'

const Header = () => {
  const MenuItem = () => {

    return (
      <div className="divNav">
        <nav className="nav">
          <div className="navButtons">
            <ul>
              <li><a href="/">HOME</a></li>
              <li><a href="/about.html">ABOUT US</a></li>
              <li><a href="/contact-us.html">CONTACTS</a></li>
              <li><a href="/browse-job">Browse Job</a></li>
            </ul>
          </div>
          <div className="buttonsLogin">
            <button onClick={() => window.location.href = "/auth"}>Sign In</button>
            <button onClick={() => window.location.href = "/auth"}>Log In</button>
          </div>
        </nav>
      </div>
    );
  };

  return (

    <MenuItem />
  );
};

export default Header;
