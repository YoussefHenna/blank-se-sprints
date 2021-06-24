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

const EducationHistory: React.FC<PersonalInformatioProps> = (props) => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.subPageParent}>
        <Typography className={classes.subPageTitle} variant="h6">
          Education History
        </Typography>

        <div className={classes.inputsContainer}>
          <TextField
            key="school_name"
            className={classes.inputItem}
            label="School name"
            placeholder="School name"
            variant="outlined"
          />
          <FormControl
            key="school_type"
            variant="outlined"
            className={classes.inputItem}
          >
            <InputLabel>School diploma type</InputLabel>
            <Select label="School diploma type">
              <MenuItem value={0}>American</MenuItem>
              <MenuItem value={1}>IGCSE</MenuItem>
              <MenuItem value={1}>National</MenuItem>
            </Select>
          </FormControl>
          <KeyboardDatePicker
            className={classes.inputItem}
            format="dd/MM/yyyy"
            margin="normal"
            id="date_birth"
            label="Date of graduation"
            defaultValue={"14/09/2001"}
            value={"14/09/2001"}
            inputVariant="outlined"
            onChange={() => {}}
            onError={() => {}}
            error={false}
            helperText=""
          />
          <TextField
            key="gpa"
            className={classes.inputItem}
            label="School GPA"
            placeholder="4.0"
            variant="outlined"
            type="number"
          />
          <TextField
            key="school_address"
            className={classes.inputItem}
            label="School address"
            placeholder="School address"
            variant="outlined"
          />
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default EducationHistory;
