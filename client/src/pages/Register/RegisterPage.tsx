import * as api from "./RegisterRequests";
import { useHistory } from "react-router-dom";
import { useStyles } from "./RegisterStyles";
import { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { ReactComponent as LaptopLogo } from "./components/svg/laptopAnimation.svg";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = (props) => {
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
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </Grid>
        <Grid container className={classes.redBox}>
          <Container>
            <Grid container className={classes.formBox} justify="center">
              <Typography variant="h3" className={classes.logIn}>
                Register
              </Typography>
              <div className={classes.center}>
                <ButtonGroup
                  size="medium"
                  variant="outlined"
                  style={{
                    display: "flex",
                    justifyContent: "initial",
                    marginLeft: "43px",
                    marginBottom: "25px",
                    marginTop: "25px",
                    color: "#B6B6B6",
                    borderColor: "#B6B6B6",
                    maxWidth: "300px",
                    minWidth: "200px",
                  }}
                >
                  <Button className={classes.buttonStyle}>Student</Button>
                  <Button className={classes.buttonStyle}> Ta </Button>
                  <Button className={classes.buttonStyle}> Admin </Button>
                </ButtonGroup>
                <Grid
                  container
                  justify="space-between"
                  style={{
                    marginLeft: "43px",
                    maxWidth: "400px",
                    minWidth: "300px",
                  }}
                >
                  <TextField
                    label="Firstname"
                    margin="dense"
                    variant="filled"
                  ></TextField>
                  <TextField
                    label="Lastname"
                    margin="normal"
                    variant="filled"
                  ></TextField>
                  <TextField
                    label="Username"
                    margin="normal"
                    variant="filled"
                  ></TextField>
                  <TextField
                    type="password"
                    label="Password"
                    margin="normal"
                    variant="filled"
                  ></TextField>
                  <TextField
                    type="password"
                    label="Confirm Password"
                    margin="normal"
                    variant="filled"
                  ></TextField>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      display: "inline",
                      minWidth: "300px",
                      maxWidth: "300px",
                      maxHeight: "100px",
                      minHeight: "55px",
                      justifyContent: "center",
                      marginTop: "50px",
                      marginRight: "100px",
                    }}
                  >
                    Register
                  </Button>
                </Grid>
              </div>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterPage;
