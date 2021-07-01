import {
  Stepper,
  Step,
  StepLabel,
  withStyles,
  StepConnector,
} from "@material-ui/core";
import { useStyles } from "../ApplyToUniStyles";

interface StepperProps {
  activeStep: number;
}

const Connector = withStyles((theme) => ({
  active: {
    "& $line": {
      borderColor: theme.palette.primary.main,
    },
  },
  completed: {
    "& $line": {
      borderColor: theme.palette.primary.main,
    },
  },
  line: {
    borderColor: theme.palette.divider,
    borderTopWidth: 3,
    borderRadius: 1,
  },
}))(StepConnector);

const ApplyStepper: React.FC<StepperProps> = ({ activeStep }) => {
  const classes = useStyles();
  const steps: string[] = [
    "Personal Information",
    "Education History",
    "Major Selection",
    "Confirmation",
  ];
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      className={classes.stepper}
      connector={<Connector />}
    >
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default ApplyStepper;
