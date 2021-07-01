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
import { useState } from "react";

interface PersonalInformatioProps {
  onPersonalInfoChanges: (personalInfo: PersonalInfoState) => void;
  currentPersonalInfo: PersonalInfoState;
}

export interface PersonalInfoState {
  firstName: string;
  lastName: string;
  birthday: string | null;
  gender: number;
  email: string;
  country: string;
  city: string;
  address: string;
  nationalId: string;
}

const PersonalInformation: React.FC<PersonalInformatioProps> = ({
  currentPersonalInfo,
  onPersonalInfoChanges,
}) => {
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
            value={currentPersonalInfo.firstName}
            onChange={(event) => {
              onPersonalInfoChanges({
                ...currentPersonalInfo,
                firstName: event.target.value,
              });
            }}
            placeholder="First name"
            variant="outlined"
          />
          <TextField
            key="last_name"
            className={classes.inputItem}
            label="Last name"
            value={currentPersonalInfo.lastName}
            onChange={(event) => {
              onPersonalInfoChanges({
                ...currentPersonalInfo,
                lastName: event.target.value,
              });
            }}
            placeholder="Last name"
            variant="outlined"
          />
          <KeyboardDatePicker
            className={classes.inputItem}
            format="dd/MM/yyyy"
            margin="normal"
            id="date_birth"
            label="Date of birth"
            value={currentPersonalInfo.birthday}
            onChange={(event) => {
              if (event && event?.toDateString() !== "Invalid Date") {
                onPersonalInfoChanges({
                  ...currentPersonalInfo,
                  birthday: event.toDateString(),
                });
              } else {
                onPersonalInfoChanges({
                  ...currentPersonalInfo,
                  birthday: null,
                });
              }
            }}
            inputVariant="outlined"
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
            <Select
              label="Gender"
              value={currentPersonalInfo.gender}
              onChange={(event) =>
                onPersonalInfoChanges({
                  ...currentPersonalInfo,
                  gender: event.target.value as number,
                })
              }
            >
              <MenuItem value={0}>Male</MenuItem>
              <MenuItem value={1}>Female</MenuItem>
            </Select>
          </FormControl>
          <TextField
            key="email"
            className={classes.inputItem}
            label="Email"
            value={currentPersonalInfo.email}
            onChange={(event) => {
              onPersonalInfoChanges({
                ...currentPersonalInfo,
                email: event.target.value,
              });
            }}
            placeholder="email@email.com"
            variant="outlined"
            type="email"
          />
          <TextField
            key="country"
            className={classes.inputItem}
            label="Country"
            value={currentPersonalInfo.country}
            onChange={(event) => {
              onPersonalInfoChanges({
                ...currentPersonalInfo,
                country: event.target.value,
              });
            }}
            placeholder="Egypt"
            variant="outlined"
          />

          <TextField
            key="city"
            className={classes.inputItem}
            label="City"
            value={currentPersonalInfo.city}
            onChange={(event) => {
              onPersonalInfoChanges({
                ...currentPersonalInfo,
                city: event.target.value,
              });
            }}
            placeholder="Cairo"
            variant="outlined"
          />
          <TextField
            key="address"
            className={classes.inputItem}
            label="Address"
            value={currentPersonalInfo.address}
            onChange={(event) => {
              onPersonalInfoChanges({
                ...currentPersonalInfo,
                address: event.target.value,
              });
            }}
            placeholder="Address"
            variant="outlined"
          />
          <TextField
            key="national_id"
            className={classes.inputItem}
            label="National ID number"
            value={currentPersonalInfo.nationalId}
            onChange={(event) => {
              onPersonalInfoChanges({
                ...currentPersonalInfo,
                nationalId: event.target.value,
              });
            }}
            placeholder="National ID"
            variant="outlined"
          />
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default PersonalInformation;
