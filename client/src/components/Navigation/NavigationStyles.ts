import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  mainSideBar: {
    width: 150,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    boxShadow: "3px 0px 5px rgba(0, 0, 0, 0.3)",
    marginRight: 10,
  },

  topLogo: {
    width: 115,
  },

  logoSpacing: {
    height: 50,
  },

  itemUnselected: {
    width: "100%",
    height: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  itemUnselectedText: {
    color: "white",
    marginTop: 5,
    "-moz-user-select": "none",
    "-khtml-user-select": "none",
    "-webkit-user-select": "none",
    " -ms-user-select": "none",
    "user-select": "none",
  },

  itemUnselectedIcon: {
    color: "white",
    marginTop: 5,
  },

  itemSelected: {
    width: "90%",
    height: 100,
    display: "flex",
    flexDirection: "column",
    marginLeft: "5%",
    marginRight: "5%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRadius: 10,
  },

  itemSelectedText: {
    color: theme.palette.primary.main,
    marginTop: 5,
    "-moz-user-select": "none",
    "-khtml-user-select": "none",
    "-webkit-user-select": "none",
    " -ms-user-select": "none",
    "user-select": "none",
  },

  itemSelectedIcon: {
    color: theme.palette.primary.main,
    marginTop: 5,
  },

  settingsIcon: {
    position: "absolute",
    bottom: 30,
  },
}));
