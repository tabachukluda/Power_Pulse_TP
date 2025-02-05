import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect } from "react";
import css from "./Header.module.css";
import { PROFILE_ROUTE } from "../../utils/const";

import Icon from "../ComponIcon/Icon";
import Logo from "../Logo/Logo";
import RouteList from "../RouteList/RouteList";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../redux/auth/authOperation";


const Header = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(true);
  const [isBurgerOpen, setBurgerOpen] = useState(false);


  const handleLogout = useCallback(() => {
    dispatch(logOutUser());
    navigate('/')
  }, [dispatch, navigate]);
  const toggleBurger = useCallback(() => {
    setBurgerOpen((prevIsBurgerOpen) => !prevIsBurgerOpen);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      setBurgerOpen(false);
    }
  }, []);
  
  const handleOverlayClick = useCallback(
    (event) => {
      if (isBurgerOpen && !event.target.closest('[data-type="burger-nav"]')) {
        setBurgerOpen(false);
      }
    },
    [isBurgerOpen]
  );
  

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleOverlayClick);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleOverlayClick);
    };
  }, [handleKeyDown, handleOverlayClick]);

  return (
    <div className={css.line} onClick={handleOverlayClick}>
      <header className={css.header_user}>
        <Logo />
        {isAuth ? (
          <div className={css.wrap}>
            <nav className={css.nav}>
              <RouteList />
            </nav>
            <ul className={css.list_user}>
              <li>
                <Link to={PROFILE_ROUTE}>
                  <Icon className={css.iconSettings} iconId="Settings" />
                </Link>
              </li>
              <li>
                <div className={css.avatart}>
                  <Icon className={css.svg_user} iconId="Gridicons_user" />
                </div>
              </li>

              <button
                onClick={handleLogout}
                className={`${css.logout_desk} ${css.logout}`}
              >
                Logout <Icon className={css.svg_logout} iconId="Log-out" />
              </button>
            </ul>

            <button
              data-type="burger-nav"
              className={css.burger_btn}
              onClick={toggleBurger}
            >
              <Icon className={css.burger_btn} iconId="Menu" />
            </button>
          </div>
        ) : null}
      </header>

      <nav
        data-type="burger-nav"
        className={` ${
          isBurgerOpen ? `${css.burger_wrap} ${css.open}` : `${css.burger_wrap}`
        }`}
      >
        <button className={css.close_btn} onClick={toggleBurger}>
          <Icon className={css.close_btn} iconId="Close" />
        </button>
        <RouteList />

        <button onClick={handleLogout} to="/" className={css.logout}>
          Logout <Icon className={css.svg_logout} iconId="Log-out" />
        </button>
      </nav>
    </div>
  );
};

export default Header;
