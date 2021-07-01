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
  mainContainer: {
    margin: "10px",
  },

  form: {
    flexDirection: "column",
  },
  scheduleSearchTabs: {
    background: "#ffffff",
  },
  formComponent: {
    marginTop: "20px",
    marginBottom: "20px",
  },
}));
