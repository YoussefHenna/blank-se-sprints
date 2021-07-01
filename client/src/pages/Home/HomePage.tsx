import { useHistory } from "react-router-dom";
import "./HomePage.css";
import applyBackdrop from "../../assets/img/apply_backdrop.jpeg";
import uniBackdrop from "../../assets/img/university_backdrop.jpg";
import logoLight from "../../assets/img/logo_light.png";
import { Typography } from "@material-ui/core";

const HomePage: React.FC = () => {
  const history = useHistory();

  const onApplyClick = () => {
    history.push("/apply");
    window.location.reload();
  };

  const onPortalClick = () => {
    history.push("/login");
    window.location.reload();
  };

  return (
    <div id="mainContainer">
      <div className="sideContainer" onClick={onApplyClick}>
        <div className="backdropLayer">
          <div id="applyBackdrop">
            <div className="backdropForeground" />
          </div>
          <div className="textSideContainer">
            <Typography className="titleText">Apply Here</Typography>
            <Typography className="subText">For new applicants</Typography>
          </div>
        </div>
      </div>
      <div id="divider" />
      <div className="sideContainer" onClick={onPortalClick}>
        <div className="backdropLayer">
          <div id="uniBackdrop">
            <div className="backdropForeground" />
          </div>
        </div>
        <div className="textSideContainer">
          <Typography className="titleText">Online Portal</Typography>
          <Typography className="subText">For students and staff</Typography>
        </div>
      </div>
      <div id="topContainer">
        <div id="topLogoContainer">
          <img id="topLogo" src={logoLight} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
