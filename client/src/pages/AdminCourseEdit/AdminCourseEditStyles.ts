import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  fullScreenContainer: {
    width: "100%",
    height: "100%",
  },

  selectFacultyContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  facultySelectionItem: {
    color: theme.palette.primary.main,
    fontWeight: 400,
    marginTop: 20,
  },

  viewCoursesContainer: {
    width: "100%",
    height: "100%",
    marginTop: 15,
    marginLeft: 15,
  },
}));
