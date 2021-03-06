import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  fullScreenContainer: {
    width: "100%",
    height: "90%",
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
    fontSize: 20,
  },

  viewCoursesContainer: {
    width: "100%",
    height: "100%",
    marginTop: 15,
    marginLeft: 15,
  },

  coursesTitle: {
    marginTop: 15,
  },

  courseItemsContainer: {
    marginTop: 20,
    display: "flex",
    flexWrap: "wrap",
    overflowY: "auto",
    alignContent: "flex-start",
    height: "90%",
  },

  courseItem: {
    backgroundColor: theme.palette.primary.dark,
    padding: 20,
    width: 400,
    height: 150,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    margin: 10,
  },

  courseItemTitle: {
    color: "white",
    fontWeight: 800,
    fontSize: 18,
    "-moz-user-select": "none",
    "-khtml-user-select": "none",
    "-webkit-user-select": "none",
    " -ms-user-select": "none",
    "user-select": "none",
  },

  courseItemDesc: {
    color: "white",
    fontWeight: 400,
    fontSize: 18,
    "-moz-user-select": "none",
    "-khtml-user-select": "none",
    "-webkit-user-select": "none",
    " -ms-user-select": "none",
    "user-select": "none",
  },

  courseIconButton: {
    color: "white",
  },

  courseButtonsContainer: {
    alignSelf: "flex-end",
  },

  addCourseFab: {
    position: "absolute",
    right: 15,
    bottom: 15,
  },

  addCourseContainer: {
    width: "100%",
    height: "100%",
    marginTop: 15,
    marginLeft: 15,
  },

  addCourseInputsContainer: {
    display: "flex",
    flexDirection: "column",
    height: "90%",
    flexWrap: "wrap",
    overflowY: "auto",
    marginTop: 20,
    alignContent: "flex-start",
    columnGap: 50,
    alignItems: "flex-start",
  },

  addCourseInputItem: {
    width: 400,
    marginTop: 20,
  },

  submitCourseButton: {
    marginTop: 20,
  },

  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
}));
