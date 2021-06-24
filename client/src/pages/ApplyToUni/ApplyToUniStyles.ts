import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  parent: {
    width: "100%",
    height: "90%",
    marginTop: 88,
  },

  divider: {
    width: "100%",
    height: 1,
    background: theme.palette.divider,
  },

  stepper: {
    background: "transparent",
  },

  subPageParent: {
    width: "100%",
    height: "70%",
    overflow: "hidden",
    paddingLeft: 30,
    paddingTop: 20,
  },

  subPageTitle: {
    marginTop: 15,
  },

  inputsContainer: {
    display: "flex",
    height: "90%",
    flexDirection: "column",
    width: "100%",
    //writingMode: "vertical-lr",
    flexWrap: "wrap",
    alignItems: "flex-start",
    alignContent: "flex-start",
    overflowY: "auto",
    columnGap: 50,
  },

  inputItem: {
    width: 400,
    marginTop: 20,
    //writingMode: "horizontal-tb",
  },

  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    gap: 15,
    bottom: 40,
    right: 50,
  },

  button: {
    width: 100,
  },
}));
