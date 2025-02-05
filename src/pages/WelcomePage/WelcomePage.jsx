import { Link } from "react-router-dom";

import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";

import BackgroundImage from "../../components/BackgroundImage/BackgroundImage";
import css from "./WelcomPage.module.css";
import Container from "../../components/Container/Container";
import Icon from "../../components/ComponIcon/Icon";
import Section from "../../components/Container/Section";

const WelcomePage = () => {
  return (
    <>
      <div className={css.wrapper}>
        <Logo />{" "}
        <h1 className={css.title}>
          Transforming your body shape with Power Pulse
        </h1>
        <Icon className={css.exerciseArrowSvg} iconId="icon-line" />
        <div className={css.buttonWrapper}>
          <Link className={css.link} to="/signup">
            <Button type="submit" text="Sign Up" />
          </Link>
          <Link to="/signin">
            <Button type="submit" text="Sign In" />
          </Link>
        </div>
      </div>
      <BackgroundImage />
    </>
  );
};

export default WelcomePage;
