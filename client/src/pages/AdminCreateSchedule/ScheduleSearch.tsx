import InstructorForm from './InstructorForm'
import StudentGroupForm from './StudentGroupForm'
import { useStyles } from './AdminCreateScheduleStyles'
import React from "react";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Theme,
  TextField
} from "@material-ui/core";
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';


interface Props {}


const ScheduleSearch: React.FC<Props> = () => {
  const [scheduleType,setScheduleType] = React.useState("student")
  const classes = useStyles()
  return (
    <div className={classes.scheduleForm}>

        <FormControl>
          <RadioGroup className={classes.formComponent} name="schedule-select" onChange={e=>setScheduleType(e.target.value)}>
            <FormLabel>schedule type</FormLabel>
            <FormControlLabel
              value="instructor"
              control={<Radio />}
              label="Instructor"
            />
            <FormControlLabel
              value="studentGroup"
              control={<Radio />}
              label="Student group"
            />
          </RadioGroup>
        </FormControl>

      
        {scheduleType==='instructor' && (<InstructorForm/>)}
        {scheduleType==='studentGroup' && (<StudentGroupForm/>)}
    </div>
  );
};

export default ScheduleSearch;
