import { useStyles } from "./TopBarStyles";
import logo from "../../assets/img/logo_dark.png";
import { Typography } from "@material-ui/core";

interface TopBarProps {
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <img src={logo} className={classes.logo} />
      <div className={classes.dot} />
      <Typography className={classes.text}>{title}</Typography>
    </div>
  );
};

export default TopBar;
