import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: "#f3f3f3",
    width: "100%",
    height: "100vh",
    overflowY: "scroll",
    paddingLeft: "0.5em"
  },

  appMainContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: 0,
    bottom: 0,
    overflowX: "hidden",
    left: 0,
    right: 0,
    height: "100vh"
  },
}));
