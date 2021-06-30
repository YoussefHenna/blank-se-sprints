import * as api from "./ChangePasswordRequests";
import { useHistory } from "react-router-dom";
import { useStyles } from "./ChangePasswordStyles";
import { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { ReactComponent as PasswordLogo } from "./components/svg/forgotPasswordAnimation.svg";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import { MouseEvent } from "react";
import axios from "../../util/Axios";

interface ChangePasswordProps {
  userType: "student" | "admin" | "instructor";
}

const ChangePasswordPage: React.FC<ChangePasswordProps> = (props) => {
  const history = useHistory();
  //Use this to navigate to different screens
  //Example: history.replace("/student/schedule") to navigate to student schedule page

  //Use like this <div className={classes.whateverStyle}/>
  const classes = useStyles();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const toKeyValue = (userType: "student" | "admin" | "instructor"): string => {
    switch (userType) {
      case "student":
        return "Student";
      case "admin":
        return "Admin";
      case "instructor":
        return "Instructor";
    }
  };
  const key = toKeyValue(props.userType);

  async function changePassword(e: any) {
    e.preventDefault();

    try {
      const changePasswordData = {
        username,
        password,
        passwordConfirm,
        key,
      };

      await axios.post("/auth/changePassword", changePasswordData, {
        withCredentials: true,
      });
      history.replace("/login");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <form className={classes.formContainer} onSubmit={changePassword}>
        <Grid container className={classes.flexContainer}>
          <Grid container className={classes.greyBox}>
            <TopBar title="Online Student Portal" />
            <PasswordLogo
              style={{
                display: "block",
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </Grid>
          <Grid container className={classes.redBox}>
            <Container>
              <Grid
                container
                className={classes.formBox}
                justify="center"
                direction="column"
                alignItems="center"
              >
                <Typography variant="h3" className={classes.logIn}>
                  Change Password
                </Typography>

                <Grid
                  container
                  direction="column"
                  justify="space-between"
                  alignItems="center"
                  style={{
                    width: "80%",
                    maxWidth: "400px",
                  }}
                >
                  <TextField
                    label="Username"
                    margin="dense"
                    variant="filled"
                    onChange={(e) => setUserName(e.target.value)}
                    value={username}
                    style={{
                      width: "100%",
                    }}
                  ></TextField>
                  <TextField
                    type="password"
                    label="Password"
                    margin="dense"
                    variant="filled"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    style={{
                      width: "100%",
                    }}
                  ></TextField>
                  <TextField
                    type="password"
                    label="Confirm Password"
                    margin="normal"
                    variant="filled"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    value={passwordConfirm}
                    style={{
                      width: "100%",
                    }}
                  ></TextField>
                </Grid>
                <Grid
                  item
                  style={{
                    display: "inline",
                    width: "80%",
                    maxWidth: "400px",
                    justifyContent: "center",
                    marginTop: "40px",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{
                      width: "100%",
                    }}
                  >
                    Confirm Change
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ChangePasswordPage;
