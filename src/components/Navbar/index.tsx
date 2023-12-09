import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./styles.scss";
import menuButton from "../../public/images/hamburger.svg";
import cancelButton from "../../public/images/cancel.svg";
import Button from "../Button";

export function Nav() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { pathname } = useLocation();
  const [menuToggle, setMenuToggle] = useState(false)

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2> Employee App</h2>
        <div className="links desktop-only">
          <Link
            to="/"
            className={`nav-link${pathname === "/" ? " active" : ""}`}
          >
            Home
          </Link>
        </div>

        <div className="menu-button mobile-only">
            {!menuToggle ? 
          (<img width={50} height={50} alt="menu" src={menuButton} onClick={()=>{setMenuToggle(prev => !prev)}}/> ) : 
          (<img width={50} height={50} alt="menu" src={cancelButton} onClick={()=>{setMenuToggle(prev => !prev)}}/>)
          }
            
        </div>
      </div>
      <div className="nav-right">

        {menuToggle && <>
          <div className="links mobile-only">
            <Link
              onClick={()=>{setMenuToggle(prev => !prev)}}
              to="/"
              className={`nav-link${pathname === "/" ? " active" : ""}`}
            >
              Home
            </Link>
          </div>

          {isAuthenticated ? (
            <div>
              <Button
                id="logout"
                type={"outline"}
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button id="login" onClick={() => loginWithRedirect()}>
              Login
            </Button>
          )}
        </>}
        <div className="desktop-only">
        {isAuthenticated ? (
            <div>
              <Button
                id="logout"
                type={"outline"}
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button id="login" onClick={() => loginWithRedirect()}>
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
