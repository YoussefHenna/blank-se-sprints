import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  parent: {
    width: "100%",
    height: "89%",
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
    height: "80%",
    overflow: "hidden",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
  },

  subPageTitle: {
    marginTop: 15,
    fontWeight: 700,
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

  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },

  blockHolder: {
    display: "inline-flex",
    flexDirection: "row",
    overflowY: "auto",
    gap: 30,
    width: "100%",
    justifyContent: "space-between",
    height: "90%",
  },

  blockConfirmContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    marginTop: 20,
  },

  blockConfirmTitle: {
    fontWeight: 700,
    fontSize: 16,
  },

  blockConfirmFieldContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 15,
    columnGap: 5,
  },
  blockConfirmFieldKey: {
    fontWeight: 500,
    fontSize: 14,
  },
  blockConfirmFieldValue: {
    fontWeight: 200,
    fontSize: 16,
  },
}));
