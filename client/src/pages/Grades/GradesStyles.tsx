import { makeStyles } from "@material-ui/core/";

/**
 * Add styles here instead of css file
 * https://material-ui.com/styles/basics/ for more info
 * This allows for type safety of style names as well as using theme colors in styles
 * Check AdminCourseEditStyle.ts for an example of usage
 *
 * Same as css names but use camelCase (ex: font-weight -> fontWeight)
 */

export const useStyles = makeStyles((theme) => {
  return {

    studentDataTable: {
      gap: "1em",
      borderCollapse: "collapse",
      "& td": {
        border: "1px solid #00000040",
        padding: "0.5em 1em"
      }
    },
    
    studentDataProp: {
      fontWeight: "bold",
      "&:after": {
        display: "inline-block",
        content: "':'",
        opacity: 0.5,
        marginRight: "0.5em",
        marginLeft: "0.1em"
      }
    },

    gradesContainer: {
      // WATCH: https://www.youtube.com/watch?v=qjJR3qYCd54
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
      gridGap: "2em",
      padding: "2em"
    },

    grade: {
      display: "flex",
      flexFlow: "column nowrap",
      textAlign: "center",
      background: theme.palette.background.paper,
      borderRadius: "1em",
      padding: "1em",
      border: "1px solid " + theme.palette.grey[300]
    },

    gradeSubjectName: {
      fontSize: "1.5em",
      textTransform: "capitalize",
      marginBottom: "0.5em",
      padding: "0.5em 1em"
    },

    // TODO: change color property according to the value of it
    gradeValue: (props) => ({
      color: theme.palette.info.main,
      padding: "0.5em 1em",
      borderRadius: "2em",
      background: theme.palette.grey[200]
    }),

    TAEditButtons: {
      position: "fixed",
      bottom: "1em",
      right: "2em"
    },

    usernameFormContainer: {
      height: "100%",
      display: "grid",
      placeItems: "center"
    }
    
  };
});
