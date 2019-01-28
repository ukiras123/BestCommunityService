import { volunteerConstants } from "../constants";
import { userService } from "../services";

export const volunteerActions = {
  addVolunteer,
  sendEmail
};

function addVolunteer(details) {
  return { type: volunteerConstants.ADD_VOLUNTEER, details };
}

function sendEmail(details) {
  userService.sendEmailToVolunteer(details);
  return { type: volunteerConstants.EMAIL_SEND };
}
