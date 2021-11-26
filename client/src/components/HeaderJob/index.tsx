import './style.css'

const Header = () => {
  const MenuItem = () => {
    
    return (
      <div className="divNav">
      <nav className="nav">
        <div className="navButtons">
          <ul>
            <li><a href="/">HOME</a></li>
            <li><a href="about.html">ABOUT US</a></li>
            <li><a href="contact-us.html">CONTACTS</a></li>
          </ul>
        </div>
        <div className="buttonsLogin">
          <button>Sign In</button>
          <button>Log In</button>
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
