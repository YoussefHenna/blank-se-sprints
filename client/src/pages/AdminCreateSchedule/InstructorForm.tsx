import React from "react";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Theme,
  TextField,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Autocomplete } from "@material-ui/lab";
import { getInstructors } from "./AdminCreateScheduleRequests";
import { Instructor } from "../../../../SharedObjects/users";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './AdminCreateScheduleStyles'
import {ClassNameMap} from "@material-ui/core/styles/withStyles";

interface Props {}

const instructorSelection = (classes : ClassNameMap ,instructors: any) => {
  return (
    <Autocomplete
      className={classes.formComponent}
      onChange={e=>console.log(e.target)}
      id="schedule-edit-instructor-select"
      options={instructors}
      getOptionLabel={(option: any) => `${option.firstName} ${option.lastName}`}
      renderInput={(params) => (
        <TextField {...params} label="Select Instructor" variant="outlined" />
      )}
    />
  );
};

const InstructorForm: React.FC<Props> = () => {
  const [instructors, setInstructors] = React.useState<Instructor[] | undefined>();
  const classes = useStyles()

  const fetchData = async () => {
    if (!instructors) {
      setInstructors(await getInstructors());
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);


  if (instructors) return <form>{instructorSelection(classes,instructors)}</form>;

  return <CircularProgress/>
};

export default InstructorForm;
