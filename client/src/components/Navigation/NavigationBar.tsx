import {
  SvgIconTypeMap,
  Typography,
  useTheme,
  IconButton,
  ButtonBase,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { styled } from "@material-ui/styles";
import { useHistory, useLocation } from "react-router-dom";
import logoLight from "../../assets/img/logo_light.png";
import SI from "@material-ui/icons/Settings";
import { useEffect } from "react";
import { useState } from "react";
import { useStyles } from "./NavigationStyles";
import { useRef } from "react";
import axios from "../../util/Axios";

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
  const location = useLocation();

  const SettingsIcon = styled(SI)({ color: "white" });
  const classes = useStyles();

  const [menuShow, setMenuShown] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const logOut = async () => {
    await axios.get("/auth/logout");
    window.location.reload();
  };

  return (
    <div
      className={classes.mainSideBar}
      style={{ backgroundColor: theme.palette.primary.main }}
    >
      <img className={classes.topLogo} src={logoLight} />
      <div className={classes.logoSpacing} />
      {navItems.map((item) => {
        const MenuIcon = item.icon;
        const selected = location.pathname === item.route;
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
        <IconButton
          ref={anchorRef}
          onClick={() => {
            setMenuShown(true);
          }}
        >
          <SettingsIcon />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorRef.current}
          open={menuShow}
          onClose={() => {
            setMenuShown(false);
          }}
        >
          <MenuItem
            onClick={() => {
              setMenuShown(false);
              history.replace("/change-password");
            }}
          >
            Change password
          </MenuItem>
          <MenuItem
            onClick={() => {
              setMenuShown(false);
              logOut();
            }}
          >
            Log out
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default NavigationBar;
