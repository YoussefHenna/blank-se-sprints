import * as api from "./LoginRequests";
import { useHistory } from "react-router-dom";
import { useStyles } from "./LoginStyles";
import { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { ReactComponent as LaptopLogo } from "./components/svg/laptopAnimation.svg";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = (props) => {
  const history = useHistory();
  //Use this to navigate to different screens
  //Example: history.replace("/student/schedule") to navigate to student schedule page

  //Use like this <div className={classes.whateverStyle}/>
  const classes = useStyles();

  return (
    <>
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
                Log In
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
                <Button className={classes.buttonStyle}>Student</Button>
                <Button className={classes.buttonStyle}> Ta </Button>
                <Button className={classes.buttonStyle}> Admin </Button>
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
                  style={{
                    width: "100%",
                  }}
                ></TextField>
                <TextField
                  type="password"
                  label="Password"
                  margin="normal"
                  variant="filled"
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
                  style={{
                    width: "100%",
                  }}
                >
                  Log In
                </Button>
              </Grid>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Button className={classes.buttonPassword}>
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
    </>
  );
};

export default LoginPage;
