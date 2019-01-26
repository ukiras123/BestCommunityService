import { volunteerConstants } from '../constants';

export const volunteerActions = {
    addVolunteer
};

function addVolunteer(details) {
    return { type: volunteerConstants.ADD_VOLUNTEER, details };
}
