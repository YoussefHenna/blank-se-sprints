import * as api from "./RegisterRequests";
import axios from "../../util/Axios";
import { useHistory } from "react-router-dom";
import { useStyles } from "./RegisterStyles";
import { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { ReactComponent as RegisterLogo } from "./components/svg/SignUpAnimation.svg";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import { MouseEvent } from "react";
import { useEffect } from "react";

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = (props) => {
  const history = useHistory();
  //Use this to navigate to different screens
  //Example: history.replace("/student/schedule") to navigate to student schedule page

  //Use like this <div className={classes.whateverStyle}/>
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [key, setKey] = useState("Student");

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget as Element;
    const value = target.id;
    switch (value) {
      case "btn1":
        setKey("Student");
        break;
      case "btn2":
        setKey("Instructor");

        break;
      case "btn3":
        setKey("Admin");
        break;
      default:
        setKey("");
    }
  };

  async function register(e: any) {
    e.preventDefault();

    try {
      const registerData = {
        firstName,
        lastName,
        username,
        password,
        passwordVerify: passwordConfirm,
        key,
      };

      await axios.post("/auth/", registerData, {
        withCredentials: true,
      });
      history.replace("/login");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <form className={classes.formContainer} onSubmit={register}>
        <Grid container className={classes.flexContainer}>
          <Grid container className={classes.greyBox}>
            <TopBar title="Online Student Portal" />
            <RegisterLogo
              style={{
                display: "block",
                width: "85%",
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
                  Register
                </Typography>
                <ButtonGroup
                  size="medium"
                  variant="outlined"
                  style={{
                    display: "flex",
                    justifyContent: "initial",
                    marginBottom: "25px",
                    marginTop: "25px",
                    color: "#B6B6B6",
                    borderColor: "#B6B6B6",
                    maxWidth: "300px",
                    width: "70%",
                  }}
                >
                  <Button
                    id="btn1"
                    variant={key === "Student" ? "contained" : undefined}
                    style={
                      key === "Student"
                        ? { color: "white", background: "#DB3B38" }
                        : undefined
                    }
                    className={classes.buttonStyle}
                    onClick={handleClick}
                  >
                    Student
                  </Button>
                  <Button
                    id="btn2"
                    variant={key === "Instructor" ? "contained" : undefined}
                    style={
                      key === "Instructor"
                        ? { color: "white", background: "#DB3B38" }
                        : undefined
                    }
                    className={classes.buttonStyle}
                    onClick={handleClick}
                  >
                    {" "}
                    Ta{" "}
                  </Button>
                  <Button
                    id="btn3"
                    variant={key === "Admin" ? "contained" : undefined}
                    style={
                      key === "Admin"
                        ? { color: "white", background: "#DB3B38" }
                        : undefined
                    }
                    className={classes.buttonStyle}
                    onClick={handleClick}
                  >
                    {" "}
                    Admin{" "}
                  </Button>
                </ButtonGroup>

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
                    label="Firstname"
                    margin="dense"
                    variant="filled"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    style={{
                      width: "100%",
                    }}
                  ></TextField>
                  <TextField
                    label="Lastname"
                    margin="normal"
                    variant="filled"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    style={{
                      width: "100%",
                    }}
                  ></TextField>
                  <TextField
                    label="Username"
                    margin="normal"
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
                    margin="normal"
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
                      marginBottom: "35px",
                    }}
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Button
                    className={classes.buttonPassword}
                    onClick={() => {
                      history.replace("/login");
                    }}
                  >
                    Already have an account?
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

export default RegisterPage;
