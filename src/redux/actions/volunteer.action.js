import { volunteerConstants } from '../constants';
import { userService } from '../services';

export const volunteerActions = {
    addVolunteer
};

function addVolunteer(details) {
    return { type: volunteerConstants.ADD_VOLUNTEER, details };
}

function sendEmail(details){
    return { type: volunteerConstants.EMAIL_SEND };
}