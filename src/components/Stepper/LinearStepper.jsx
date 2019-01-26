import React from "react";
import { makeStyles } from "@material-ui/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { history } from "../../_helpers";
import { Step1, Step2, Step3 } from "../../container/Steps";
import { volunteerActions } from "../../redux/actions/volunteer.action";
import { alertActions } from "../../redux/actions";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: 8,
    textAlign: "center"
  },
  alignCenter: {
    textAlign: "center"
  },
  instructions: {
    marginTop: 8,
    marginBottom: 8
  },
  image: {
    width: 300,
    height: "auto"
  },
  smallImage: {
    width: 60,
    height: 40
  }
}));

function getSteps() {
  return ["Your Information", "Select Your Interest", "Quick Survey"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    case 2:
      return <Step3 />;
    default:
      return "Unknown step";
  }
}

function validateEmail(email) {
  console.log("checking email " + email);
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function HorizontalLinearStepper(props) {
  const { dispatch, volunteerInfo, alert } = props;
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  function isStepOptional(step) {
    return step === -1;
  }

  function isStepSkipped(step) {
    return skipped.has(step);
  }

  function handleNext() {
    dispatch(alertActions.clear());

    if (activeStep === 0) {
      console.log("This is first");
      const { firstName, lastName, email } = volunteerInfo.info;
      if (!(firstName && lastName && email)) {
        console.log(
          "Not all fields are provided" + JSON.stringify(volunteerInfo)
        );
        dispatch(alertActions.error("Please fill all required fields"));
        return;
      }
      const isValid = validateEmail(email);
      if (!isValid) {
        dispatch(alertActions.error("Email is invalid"));
        return;
      }
    }else if (activeStep === 1) {
      console.log("This is first");
      const { interest } = volunteerInfo.interest;
      if (!interest) {
        console.log(
          "Not all fields are provided" + JSON.stringify(volunteerInfo)
        );
        dispatch(alertActions.error("Please fill all required fields"));
        return;
        }
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  }

  function handleBack() {
    dispatch(alertActions.clear());
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleSkip() {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  }

  function handleFinish() {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
    console.log("Sending it out finally" + JSON.stringify(volunteerInfo));
    dispatch(volunteerActions.sendEmail(volunteerInfo));
    setTimeout(function() {
      history.push("/");
    }, 2000);
  }
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div className={classes.alignCenter}>
        {activeStep === steps.length ? (
          <div>
            <img
              className={classes.image}
              alt="complex"
              src="https://pngimg.com/uploads/thank_you/thank_you_PNG69.png"
            />

            <Typography variant="subheading" className={classes.instructions}>
              Redirecting back to home page
              <img
                className={classes.smallImage}
                alt="complex"
                src="https://loading.io/spinners/typing/lg.-text-entering-comment-loader.gif"
              />
            </Typography>
          </div>
        ) : (
          <div className={classes.alignCenter}>
            {alert && alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
            {getStepContent(activeStep)}
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={
                  activeStep === steps.length - 1 ? handleFinish : handleNext
                }
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HorizontalLinearStepper;
