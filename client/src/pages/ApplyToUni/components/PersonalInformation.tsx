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

const PersonalInformation: React.FC<PersonalInformatioProps> = (props) => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.subPageParent}>
        <Typography className={classes.subPageTitle} variant="h6">
          Personal Information
        </Typography>

        <div className={classes.inputsContainer}>
          <TextField
            key="first_name"
            className={classes.inputItem}
            label="First name"
            placeholder="First name"
            variant="outlined"
          />
          <TextField
            key="last_name"
            className={classes.inputItem}
            label="Last name"
            placeholder="Last name"
            variant="outlined"
          />
          <KeyboardDatePicker
            className={classes.inputItem}
            format="dd/MM/yyyy"
            margin="normal"
            id="date_birth"
            label="Date of birth"
            defaultValue={"14/09/2001"}
            value={"14/09/2001"}
            inputVariant="outlined"
            onChange={() => {}}
            onError={() => {}}
            error={false}
            helperText=""
          />
          <FormControl
            key="gender"
            variant="outlined"
            className={classes.inputItem}
          >
            <InputLabel>Gender</InputLabel>
            <Select label="Gender">
              <MenuItem value={0}>Male</MenuItem>
              <MenuItem value={1}>Female</MenuItem>
            </Select>
          </FormControl>
          <TextField
            key="email"
            className={classes.inputItem}
            label="Email"
            placeholder="email@email.com"
            variant="outlined"
            type="email"
          />
          <TextField
            key="country"
            className={classes.inputItem}
            label="Country"
            placeholder="Egypt"
            variant="outlined"
          />

          <TextField
            key="city"
            className={classes.inputItem}
            label="City"
            placeholder="Cairo"
            variant="outlined"
          />
          <TextField
            key="address"
            className={classes.inputItem}
            label="Address"
            placeholder="Address"
            variant="outlined"
          />
          <TextField
            key="national_id"
            className={classes.inputItem}
            label="National ID number"
            placeholder="National ID"
            variant="outlined"
          />
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default PersonalInformation;
