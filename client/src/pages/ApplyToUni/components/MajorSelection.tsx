import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useStyles } from "../ApplyToUniStyles";
import DateFnsUtils from "@date-io/date-fns";

interface PersonalInformatioProps {}

const MajorSelection: React.FC<PersonalInformatioProps> = (props) => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.subPageParent}>
        <Typography className={classes.subPageTitle} variant="h6">
          Major Selection
        </Typography>

        <div className={classes.inputsContainer}>
          <FormControl
            key="faculty"
            variant="outlined"
            className={classes.inputItem}
          >
            <InputLabel>Faculty</InputLabel>
            <Select label="Faculty">
              <MenuItem value={0}>Introdcution To Computer Science</MenuItem>
              <MenuItem value={1}>Introdcution To Computer Science</MenuItem>
              <MenuItem value={2}>Introdcution To Computer Science</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            key="faculty"
            variant="outlined"
            className={classes.inputItem}
          >
            <InputLabel>Degree type</InputLabel>
            <Select label="Degree type">
              <MenuItem value={0}>Bachelor</MenuItem>
              <MenuItem value={1}>Masters</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default MajorSelection;
