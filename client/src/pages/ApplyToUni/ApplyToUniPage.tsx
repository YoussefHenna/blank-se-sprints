import { useHistory } from "react-router-dom";
import { useStyles } from "./ApplyToUniStyles";
import TopBar from "../../components/TopBar/TopBar";
import ApplyStepper from "./components/ApplyStepper";
import PersonalInformation, {
  PersonalInfoState,
} from "./components/PersonalInformation";
import EducationHistory, {
  EducationHistoryState,
} from "./components/EducationHistory";
import MajorSelection, {
  MajorSelectionState,
} from "./components/MajorSelection";
import ConfirmApplication from "./components/ConfirmApplication";
import { useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import ErrorDialog, { ErrorDialogProps } from "../../components/ErrorDialog";
import { Faculty } from "../../../../SharedObjects/faculty";
import { useEffect } from "react";
import { getFaculties } from "./ApplyToUniRequests";

export interface ApplyState {
  personalInformation: PersonalInfoState;
  educationHistory: EducationHistoryState;
  majorSelection: MajorSelectionState;
}

const ApplyToUniPage: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  const [errorDialogState, setErrorDialogState] = useState<ErrorDialogProps>({
    open: false,
    onClose: () => {},
    title: "",
    content: "",
  });

  const dismissErrorDialog = () => {
    setErrorDialogState({
      open: false,
      onClose: () => {},
      title: "",
      content: "",
    });
  };

  const showEmptyOrInvalidError = () => {
    setErrorDialogState({
      open: true,
      onClose: dismissErrorDialog,
      title: "Some fields are empty or invalid",
      content: "Please verify that all fields are filled in and valid",
    });
  };

  const [currentStep, setCurrentStep] = useState(0);

  const [currentInput, setCurrentInput] = useState<ApplyState>({
    personalInformation: {
      firstName: "",
      lastName: "",
      birthday: null,
      gender: 0,
      email: "",
      country: "",
      city: "",
      address: "",
      nationalId: "",
    },
    educationHistory: {
      dateOfGrad: null,
      schoolName: "",
      schoolDiploma: 0,
      schoolGPA: -1.0,
      schoolAddress: "",
    },
    majorSelection: {
      faculty: 0,
      degreeType: 0,
    },
  });

  const onPersonalInfoChanges = (personalInfo: PersonalInfoState) => {
    setCurrentInput({ ...currentInput, personalInformation: personalInfo });
  };

  const onEducationHistoryChange = (
    educationHistory: EducationHistoryState
  ) => {
    setCurrentInput({ ...currentInput, educationHistory: educationHistory });
  };

  const onMajorSelectionChanged = (
    majorSelectionState: MajorSelectionState
  ) => {
    setCurrentInput({ ...currentInput, majorSelection: majorSelectionState });
  };

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const validatePersonalInfo = (): boolean => {
    const personal = currentInput.personalInformation;
    return (
      personal.firstName.length > 0 &&
      personal.lastName.length > 0 &&
      personal.birthday != null &&
      validateEmail(personal.email) &&
      personal.country.length > 0 &&
      personal.city.length > 0 &&
      personal.address.length > 0 &&
      personal.nationalId.length > 0
    );
  };

  const validateEducationHistory = (): boolean => {
    const education = currentInput.educationHistory;
    return (
      education.dateOfGrad != null &&
      education.schoolAddress.length > 0 &&
      education.schoolGPA > 0 &&
      education.schoolName.length > 0
    );
  };

  const [faculties, setFaculties] = useState<Faculty[]>([]);

  useEffect(() => {
    loadFaculties();
  }, []);

  const loadFaculties = () => {
    getFaculties().then(
      (value) => {
        setCurrentInput({
          ...currentInput,
          majorSelection: { faculty: value[0]._id, degreeType: 0 },
        });
        setFaculties(value);
      },
      (err) => {
        setErrorDialogState({
          open: true,
          onClose: dismissErrorDialog,
          title: "Loading faculties failed",
          content: err.error
            ? err.error
            : "Unknown error occured while loading faculties, dismiss to try again",
        });
      }
    );
  };

  if (faculties.length === 0) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <div className={classes.parent}>
      <TopBar title="Application" />
      <div className={classes.divider}></div>
      <ApplyStepper activeStep={currentStep} />
      <div className={classes.divider}></div>
      {currentStep === 0 && (
        <PersonalInformation
          onPersonalInfoChanges={onPersonalInfoChanges}
          currentPersonalInfo={currentInput.personalInformation}
        />
      )}
      {currentStep === 1 && (
        <EducationHistory
          onEducationHistoryChange={onEducationHistoryChange}
          currentEducationHistory={currentInput.educationHistory}
        />
      )}
      {currentStep === 2 && (
        <MajorSelection
          onMajorSelectionChanged={onMajorSelectionChanged}
          currentMajorSelection={currentInput.majorSelection}
          faculties={faculties}
        />
      )}

      {currentStep === 3 && (
        <ConfirmApplication finalState={currentInput} faculties={faculties} />
      )}

      <div className={classes.buttonsContainer}>
        {currentStep !== 0 && (
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={() => {
              setCurrentStep(currentStep - 1);
            }}
          >
            Previous
          </Button>
        )}
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => {
            if (currentStep != 3) {
              if (currentStep === 0 && !validatePersonalInfo()) {
                showEmptyOrInvalidError();
                return;
              }
              if (currentStep === 1 && !validateEducationHistory()) {
                showEmptyOrInvalidError();
                return;
              }
              setCurrentStep(currentStep + 1);
            }
          }}
        >
          {currentStep === 3 ? "Submit" : "Next"}
        </Button>
      </div>
      <ErrorDialog {...errorDialogState} />
    </div>
  );
};

export default ApplyToUniPage;
