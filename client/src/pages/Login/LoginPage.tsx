import * as api from "./LoginRequests";
import { useHistory } from "react-router-dom";
import { useStyles } from "./LoginStyles";
import { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { ReactComponent as LoginLogo } from "./components/svg/loginAnimation.svg";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import { MouseEvent } from "react";
import axios from "../../util/Axios";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = (props) => {
  const history = useHistory();
  //Use this to navigate to different screens
  //Example: history.replace("/student/schedule") to navigate to student schedule page

  //Use like this <div className={classes.whateverStyle}/>
  const classes = useStyles();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // const handleRedirect = () => {
  //   history.push("/student/major");
  // };

  async function login(e: any) {
    e.preventDefault();

    try {
      const loginData = {
        username,
        password,
      };

      const { role } = await api.requestLogin(loginData);

      switch (role) {
        case "Student":
          history.replace("/student/courses");
          break;
        case "Instructor":
          history.replace("/instructor/classes");
          break;
        case "Admin":
          history.replace("/admin/courses");
          break;
        default:
          history.replace("/login");
      }
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <form className={classes.formContainer} onSubmit={login}>
        <Grid container className={classes.flexContainer}>
          <Grid container className={classes.greyBox}>
            <TopBar title="Online Student Portal" />
            <LoginLogo
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
                  Log In
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
                    margin="normal"
                    variant="filled"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
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
                    Log In
                  </Button>
                </Grid>
                <Grid container direction="column" alignItems="center">
                  <Grid item>
                    <Button
                      className={classes.buttonPassword}
                      onClick={() => {
                        history.replace("/register");
                      }}
                    >
                      Don't have an account?
                    </Button>
                  </Grid>
                  {/* <Grid item>
                  <Button className={classes.buttonPassword}>
                    Forgot Password?
                  </Button>
                </Grid> */}
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default LoginPage;
