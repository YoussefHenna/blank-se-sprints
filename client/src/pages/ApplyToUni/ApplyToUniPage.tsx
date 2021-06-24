import * as api from "./ApplyToUniRequests";
import { useHistory } from "react-router-dom";
import { useStyles } from "./ApplyToUniStyles";
import TopBar from "../../components/TopBar/TopBar";
import ApplyStepper from "./components/ApplyStepper";
import PersonalInformation from "./components/PersonalInformation";
import EducationHistory from "./components/EducationHistory";
import MajorSelection from "./components/MajorSelection";
import { useState } from "react";
import { Button } from "@material-ui/core";

const ApplyToUniPage: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className={classes.parent}>
      <TopBar title="Application" />
      <div className={classes.divider}></div>
      <ApplyStepper activeStep={currentStep} />
      <div className={classes.divider}></div>
      {currentStep === 0 && <PersonalInformation />}
      {currentStep === 1 && <EducationHistory />}
      {currentStep === 2 && <MajorSelection />}

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
              setCurrentStep(currentStep + 1);
            }
          }}
        >
          {currentStep === 3 ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default ApplyToUniPage;
