import * as api from "./ChangePasswordRequests";
import { useHistory } from "react-router-dom";
import { useStyles } from "./ChangePasswordStyles";
import { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { ReactComponent as LaptopLogo } from "./components/svg/laptopAnimation.svg";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import { MouseEvent } from "react";
import axios from "../../util/Axios";

const ChangePasswordPage: React.FC = () => {
  const history = useHistory();
  //Use this to navigate to different screens
  //Example: history.replace("/student/schedule") to navigate to student schedule page

  //Use like this <div className={classes.whateverStyle}/>
  const classes = useStyles();
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
        setKey("Teacher");

        break;
      case "btn3":
        setKey("Admin");
        break;
      default:
        setKey("");
    }
  };

  async function changePassword(e: any) {
    e.preventDefault();

    try {
      const changePasswordData = {
        username,
        password,
        passwordConfirm,
        key,
      };

      await axios.post(
        "http://localhost:3500/auth/changePassword",
        changePasswordData,
        {
          withCredentials: true,
        }
      );
      history.replace("/login");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <form onSubmit={changePassword}>
        <Grid container className={classes.flexContainer}>
          <Grid container className={classes.greyBox}>
            <TopBar title="Online Student Portal" />
            <LaptopLogo
              style={{
                display: "block",
                width: "65%",
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
                    className={classes.buttonStyle}
                    id="btn1"
                    variant={key === "Student" ? "contained" : undefined}
                    style={
                      key === "Student"
                        ? { color: "white", background: "#DB3B38" }
                        : undefined
                    }
                    onClick={handleClick}
                  >
                    Student
                  </Button>
                  <Button
                    className={classes.buttonStyle}
                    id="btn2"
                    variant={key === "Teacher" ? "contained" : undefined}
                    style={
                      key === "Teacher"
                        ? { color: "white", background: "#DB3B38" }
                        : undefined
                    }
                    onClick={handleClick}
                  >
                    {" "}
                    Ta{" "}
                  </Button>
                  <Button
                    className={classes.buttonStyle}
                    id="btn3"
                    variant={key === "Admin" ? "contained" : undefined}
                    style={
                      key === "Admin"
                        ? { color: "white", background: "#DB3B38" }
                        : undefined
                    }
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
