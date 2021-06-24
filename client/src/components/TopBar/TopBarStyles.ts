import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    top: 0,
    left: 0,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },

  logo: {
    width: 190,
  },

  dot: {
    background: "#707070",
    width: 5,
    height: 5,
    borderRadius: "50%",
    marginLeft: 10,
  },

  text: {
    fontWeight: 700,
    color: theme.palette.primary.main,
    fontSize: 21,
    marginLeft: 20,
  },
}));
