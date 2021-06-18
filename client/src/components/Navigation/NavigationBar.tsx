import { SvgIconTypeMap, Typography, useTheme } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { useHistory, Link } from "react-router-dom";
import logoLight from "../../assets/img/logo_light.png";
import "./NavigationBar.css";

export interface NavigationItem {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  label: string;
  route: string;
}

interface NavigationProps {
  navItems: NavigationItem[];
}

const NavigationBar: React.FC<NavigationProps> = (props) => {
  const theme = useTheme();
  const history = useHistory();

  return (
    <div
      id="mainSideBar"
      style={{ backgroundColor: theme.palette.primary.main }}
    >
      <img id="topLogo" src={logoLight} />
    </div>
  );
};

export default NavigationBar;
