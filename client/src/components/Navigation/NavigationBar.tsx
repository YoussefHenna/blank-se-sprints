import {
  SvgIconTypeMap,
  Typography,
  useTheme,
  IconButton,
  ButtonBase,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { styled } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import logoLight from "../../assets/img/logo_light.png";
import SI from "@material-ui/icons/Settings";
import { useEffect } from "react";
import { useState } from "react";
import { useStyles } from "./NavigationStyles";

export interface NavigationItem {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  label: string;
  route: string;
}

interface NavigationProps {
  navItems: NavigationItem[];
}

const NavigationBar: React.FC<NavigationProps> = ({ navItems }) => {
  const theme = useTheme();
  const history = useHistory();
  const SettingsIcon = styled(SI)({ color: "white" });
  const classes = useStyles();

  const [currentLocation, setCurrentLocation] = useState(
    history.location.pathname.toString()
  );

  useEffect(() => {
    if (history) {
      history.listen((loc) => {
        setCurrentLocation(loc.pathname.toString());
      });
    }
  }, [history]);

  return (
    <div
      className={classes.mainSideBar}
      style={{ backgroundColor: theme.palette.primary.main }}
    >
      <img className={classes.topLogo} src={logoLight} />
      <div className={classes.logoSpacing} />
      {navItems.map((item) => {
        const MenuIcon = item.icon;
        const selected = currentLocation === item.route;
        return (
          <ButtonBase
            key={item.route}
            className={selected ? classes.itemSelected : classes.itemUnselected}
            onClick={() => {
              history.replace(item.route);
            }}
          >
            <div>
              <MenuIcon
                className={
                  selected
                    ? classes.itemSelectedIcon
                    : classes.itemUnselectedIcon
                }
              />
              <Typography
                variant="subtitle1"
                className={
                  selected
                    ? classes.itemSelectedText
                    : classes.itemUnselectedText
                }
              >
                {item.label}
              </Typography>
            </div>
          </ButtonBase>
        );
      })}
      <div className={classes.settingsIcon}>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default NavigationBar;
