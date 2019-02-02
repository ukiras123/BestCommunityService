
export const rentService = {
  addRental,
  removeARental
};

function addRental(details) {

  const currentUser = JSON.parse(localStorage.getItem("user")) || null;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if(currentUser){
    const userId = currentUser.id;
    let objIndex = users.findIndex(obj => obj.id === userId);
    if(users[objIndex].rental && users[objIndex].rental !== [])
    {
      users[objIndex].rental.push(details);
    }else{
      users[objIndex].rental = [];
      users[objIndex].rental.push(details);
    }
     // Update Users
     localStorage.setItem("users", JSON.stringify(users));
  }
}


function removeARental(rentalId) {

  const currentUser = JSON.parse(localStorage.getItem("user")) || null;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if(currentUser){
    const userId = currentUser.id;
    let objIndex = users.findIndex(obj => obj.id === userId);
    if(users[objIndex].rental && users[objIndex].rental !== [])
    {
      let updatedRental = users[objIndex].rental.filter(rent => rent.id !== rentalId);
      users[objIndex].rental = updatedRental;
    }
     // Update Users
     localStorage.setItem("users", JSON.stringify(users));
  }
}