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

interface EducationHistoryProps {
  onEducationHistoryChange: (educationHistory: EducationHistoryState) => void;
  currentEducationHistory: EducationHistoryState;
}

export interface EducationHistoryState {
  dateOfGrad: string | null;
  schoolName: string;
  schoolDiploma: number;
  schoolGPA: number;
  schoolAddress: string;
}

const EducationHistory: React.FC<EducationHistoryProps> = ({
  currentEducationHistory,
  onEducationHistoryChange,
}) => {
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
            value={currentEducationHistory.schoolName}
            onChange={(event) => {
              onEducationHistoryChange({
                ...currentEducationHistory,
                schoolName: event.target.value,
              });
            }}
            placeholder="School name"
            variant="outlined"
          />
          <FormControl
            key="school_type"
            variant="outlined"
            className={classes.inputItem}
          >
            <InputLabel>School diploma type</InputLabel>
            <Select
              label="School diploma type"
              value={currentEducationHistory.schoolDiploma}
              onChange={(event) =>
                onEducationHistoryChange({
                  ...currentEducationHistory,
                  schoolDiploma: event.target.value as number,
                })
              }
            >
              <MenuItem value={0}>American</MenuItem>
              <MenuItem value={1}>IGCSE</MenuItem>
              <MenuItem value={2}>National</MenuItem>
            </Select>
          </FormControl>
          <KeyboardDatePicker
            className={classes.inputItem}
            format="dd/MM/yyyy"
            margin="normal"
            id="date_birth"
            label="Date of graduation"
            value={currentEducationHistory.dateOfGrad}
            onChange={(event) => {
              if (event && event?.toDateString() !== "Invalid Date") {
                onEducationHistoryChange({
                  ...currentEducationHistory,
                  dateOfGrad: event.toDateString(),
                });
              } else {
                onEducationHistoryChange({
                  ...currentEducationHistory,
                  dateOfGrad: null,
                });
              }
            }}
            inputVariant="outlined"
            onError={() => {}}
            error={false}
            helperText=""
          />
          <TextField
            key="gpa"
            className={classes.inputItem}
            label="School GPA"
            value={
              currentEducationHistory.schoolGPA === -1
                ? undefined
                : currentEducationHistory.schoolGPA
            }
            onChange={(event) => {
              const asNum = +event.target.value;
              if (!isNaN(asNum) && asNum > 0) {
                onEducationHistoryChange({
                  ...currentEducationHistory,
                  schoolGPA: asNum,
                });
              } else {
                onEducationHistoryChange({
                  ...currentEducationHistory,
                  schoolGPA: -1.0,
                });
              }
            }}
            placeholder="4.0"
            variant="outlined"
            type="number"
          />
          <TextField
            key="school_address"
            className={classes.inputItem}
            label="School address"
            value={currentEducationHistory.schoolAddress}
            onChange={(event) => {
              onEducationHistoryChange({
                ...currentEducationHistory,
                schoolAddress: event.target.value,
              });
            }}
            placeholder="School address"
            variant="outlined"
          />
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default EducationHistory;
