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
import { Faculty } from "../../../SharedObjects/faculty";

interface MajorSelectionProps {
  faculties: Faculty[];
  onMajorSelectionChanged: (majorSelectionState: MajorSelectionState) => void;
  currentMajorSelection: MajorSelectionState;
}

export interface MajorSelectionState {
  faculty: any;
  degreeType: number;
}

const MajorSelection: React.FC<MajorSelectionProps> = ({
  onMajorSelectionChanged,
  currentMajorSelection,
  faculties,
}) => {
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
            <Select
              label="Faculty"
              value={currentMajorSelection.faculty}
              onChange={(event) =>
                onMajorSelectionChanged({
                  ...currentMajorSelection,
                  faculty: event.target.value,
                })
              }
            >
              {faculties.map((item) => {
                return <MenuItem value={item._id}>{item.facultyName}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <FormControl
            key="faculty"
            variant="outlined"
            className={classes.inputItem}
          >
            <InputLabel>Degree type</InputLabel>
            <Select
              label="Degree type"
              value={currentMajorSelection.degreeType}
              onChange={(event) =>
                onMajorSelectionChanged({
                  ...currentMajorSelection,
                  degreeType: event.target.value as number,
                })
              }
            >
              <MenuItem value={0}>Bachelors</MenuItem>
              <MenuItem value={1}>Masters</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default MajorSelection;
