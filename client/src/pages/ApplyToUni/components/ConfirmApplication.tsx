import { Typography } from "@material-ui/core";
import { Faculty } from "../../../../../SharedObjects/faculty";
import { ApplyState } from "../ApplyToUniPage";
import { useStyles } from "../ApplyToUniStyles";

interface ConfirmApplicationProps {
  finalState: ApplyState;
  faculties: Faculty[];
}

const ConfirmApplication: React.FC<ConfirmApplicationProps> = ({
  finalState,
  faculties,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.subPageParent}>
      <Typography className={classes.subPageTitle} variant="h6">
        Review you application
      </Typography>
      <div className={classes.blockHolder}>
        <div className={classes.blockConfirmContainer}>
          <Typography className={classes.blockConfirmTitle}>
            Personal Information
          </Typography>
          <div className={classes.blockConfirmFieldContainer}>
            <Typography className={classes.blockConfirmFieldKey}>
              Name
            </Typography>
            <Typography className={classes.blockConfirmFieldValue}>
              {`${finalState.personalInformation.firstName} ${finalState.personalInformation.lastName}`}
            </Typography>
          </div>
          <div className={classes.blockConfirmFieldContainer}>
            <Typography className={classes.blockConfirmFieldKey}>
              Birthday
            </Typography>
            <Typography className={classes.blockConfirmFieldValue}>
              {finalState.personalInformation.birthday}
            </Typography>
          </div>
          <div className={classes.blockConfirmFieldContainer}>
            <Typography className={classes.blockConfirmFieldKey}>
              Gender
            </Typography>
            <Typography className={classes.blockConfirmFieldValue}>
              {finalState.personalInformation.gender === 0 ? "Male" : "Female"}
            </Typography>
          </div>
          <div className={classes.blockConfirmFieldContainer}>
            <Typography className={classes.blockConfirmFieldKey}>
              Email
            </Typography>
            <Typography className={classes.blockConfirmFieldValue}>
              {finalState.personalInformation.email}
            </Typography>
          </div>
          <div className={classes.blockConfirmFieldContainer}>
            <Typography className={classes.blockConfirmFieldKey}>
              Country
            </Typography>
            <Typography className={classes.blockConfirmFieldValue}>
              {finalState.personalInformation.country}
            </Typography>
          </div>
          <div className={classes.blockConfirmFieldContainer}>
            <Typography className={classes.blockConfirmFieldKey}>
              City
            </Typography>
            <Typography className={classes.blockConfirmFieldValue}>
              {finalState.personalInformation.city}
            </Typography>
          </div>
          <div className={classes.blockConfirmFieldContainer}>
            <Typography className={classes.blockConfirmFieldKey}>
              Address
            </Typography>
            <Typography className={classes.blockConfirmFieldValue}>
              {finalState.personalInformation.address}
            </Typography>
          </div>
          <div className={classes.blockConfirmFieldContainer}>
            <Typography className={classes.blockConfirmFieldKey}>
              National ID
            </Typography>
            <Typography className={classes.blockConfirmFieldValue}>
              {finalState.personalInformation.nationalId}
            </Typography>
          </div>
        </div>
        <div className={classes.blockConfirmContainer}>
          <Typography className={classes.blockConfirmTitle}>
            Education History
          </Typography>
          <div className={classes.blockConfirmFieldContainer}>
            <Typography className={classes.blockConfirmFieldKey}>
              Graduation date
            </Typography>
            <Typography className={classes.blockConfirmFieldValue}>
              {finalState.educationHistory.dateOfGrad}
            </Typography>
          </div>
          <div className={classes.blockConfirmFieldContainer}>
            <Typography className={classes.blockConfirmFieldKey}>
              School name
            </Typography>
            <Typography className={classes.blockConfirmFieldValue}>
              {finalState.educationHistory.schoolName}
            </Typography>
          </div>
          <div className={classes.blockConfirmFieldContainer}>
            <Typography className={classes.blockConfirmFieldKey}>
              School diploma
            </Typography>
            <Typography className={classes.blockConfirmFieldValue}>
              {finalState.educationHistory.schoolDiploma === 0
                ? "American"
                : finalState.educationHistory.schoolDiploma === 1
                ? "IGCSE"
                : "National"}
            </Typography>
          </div>
          <div className={classes.blockConfirmFieldContainer}>
            <Typography className={classes.blockConfirmFieldKey}>
              School GPA
            </Typography>
            <Typography className={classes.blockConfirmFieldValue}>
              {finalState.educationHistory.schoolGPA}
            </Typography>
          </div>
          <div className={classes.blockConfirmFieldContainer}>
            <Typography className={classes.blockConfirmFieldKey}>
              School address
            </Typography>
            <Typography className={classes.blockConfirmFieldValue}>
              {finalState.educationHistory.schoolAddress}
            </Typography>
          </div>
        </div>

        <div className={classes.blockConfirmContainer}>
          <Typography className={classes.blockConfirmTitle}>
            Major Selection
          </Typography>
          <div className={classes.blockConfirmFieldContainer}>
            <Typography className={classes.blockConfirmFieldKey}>
              Faculty
            </Typography>
            <Typography className={classes.blockConfirmFieldValue}>
              {
                faculties.find(
                  (item) => item._id === finalState.majorSelection.faculty
                )?.facultyName
              }
            </Typography>
          </div>
          <div className={classes.blockConfirmFieldContainer}>
            <Typography className={classes.blockConfirmFieldKey}>
              Degree
            </Typography>
            <Typography className={classes.blockConfirmFieldValue}>
              {finalState.majorSelection.degreeType === 0
                ? "Bachelors"
                : "Masters"}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmApplication;
