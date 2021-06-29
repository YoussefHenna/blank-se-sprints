import { useStyles } from "./TopBarStyles";
import logo from "../../assets/img/logo_dark.png";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

interface TopBarProps {
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.mainContainer}>
      <img
        src={logo}
        className={classes.logo}
        onClick={() => history.replace("/")}
      />
      <div className={classes.dot} />
      <Typography className={classes.text}>{title}</Typography>
    </div>
  );
};

export default TopBar;
