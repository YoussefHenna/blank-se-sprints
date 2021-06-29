import { makeStyles } from "@material-ui/core/styles";

/**
 * Add styles here instead of css file
 * https://material-ui.com/styles/basics/ for more info
 * This allows for type safety of style names as well as using theme colors in styles
 * Check AdminCourseEditStyle.ts for an example of usage
 *
 * Same as css names but use camelCase (ex: font-weight -> fontWeight)
 */

export const useStyles = makeStyles((theme) => ({
  formContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  formBox: {
    backgroundColor: "#FFFFFF",
    height: "65%",
    width: "75%",
    margin: "0",
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "5px",
  },

  flexContainer: {
    display: "flex",
    border: "1px #ccc solid",
    height: "100%",
    margin: "0",
    flexWrap: "wrap",
  },
  redBox: {
    backgroundColor: "#DB3B38",
    flex: 4,
    minWidth: 400,
    minHeight: 850,
    overflow: "hidden",
  },
  greyBox: {
    backgroundColor: "#F3F3F3",
    maxWidth: "100%",
    flex: 6,
    minWidth: 600,
  },
  img: {
    width: "500px",
    height: "100%",
  },
  logIn: {
    display: "flex",
    width: "100%",
    marginTop: "20px",
    marginBottom: "50px",

    fontWeight: "bold",
    fontSize: "30px",
    justifyContent: "center",
  },
  buttonStyle: {
    color: "#B6B6B6",
    borderColor: "#B6B6B6",
    width: "100%",
    "&:hover": {
      color: "#E65F62",
      borderColor: "#E65F62",
    },
  },
  center: {
    display: "block",
    width: "100%",
    marginLeft: "85px",
    marginBottom: "265px",
  },
  username: {
    placeHolder: "Username",
  },
  buttonPassword: {
    color: "#E65F62",
    borderColor: "#E65F62",
    marginTop: "18px",
  },
  buttonHold: {
    color: "#E65F62",
    borderColor: "#E65F62",
  },
}));
