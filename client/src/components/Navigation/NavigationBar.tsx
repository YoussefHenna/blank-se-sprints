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
import "./NavigationBar.css";
import { useEffect } from "react";
import { useState } from "react";

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

  const [currentLocation, setCurrentLocation] = useState(
    history.location.pathname
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
      id="mainSideBar"
      style={{ backgroundColor: theme.palette.primary.main }}
    >
      <img id="topLogo" src={logoLight} />
      <div id="logoSpacing" />
      {navItems.map((item) => {
        const MenuIcon = item.icon;
        const selected = currentLocation === item.route;
        return (
          <ButtonBase
            className={selected ? "itemSelected" : "itemUnselected"}
            onClick={() => {
              history.replace(item.route);
            }}
          >
            <div>
              <MenuIcon
                className={selected ? "itemSelectedIcon" : "itemUnselectedIcon"}
              />
              <Typography
                variant="subtitle1"
                className={
                  selected
                    ? "itemSelectedText unselectable"
                    : "itemUnselectedText unselectable"
                }
              >
                {item.label}
              </Typography>
            </div>
          </ButtonBase>
        );
      })}
      <div id="settingsIcon">
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default NavigationBar;
