const rp = require("request-promise");

function sendEmail(user) {
  console.log("Sending Email for new Registration to " + user.email);
  const requestOptions = {
    uri: `https://or5erx9lei.execute-api.us-east-1.amazonaws.com/prod`,
    method: "POST",
    body: { register: true, name: user.firstName, email: user.email },
    json: true
  };
  const response = rp(requestOptions);
  return response.id;
}

async function checkEmail(user) {
  console.log("Sending Email for Checking to " + user.email);
  const requestOptions = {
    uri: `https://or5erx9lei.execute-api.us-east-1.amazonaws.com/prod`,
    method: "POST",
    body: { checkemail: true, email: user.email },
    json: true
  };
  const response = await rp(requestOptions);
  console.log(response);
  return response;
}

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem("users")) || [];

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function configureFakeBackend() {
  let realFetch = window.fetch;
  window.fetch = function(url, opts) {
    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(async () => {
        // authenticate
        if (url.endsWith("/users/authenticate") && opts.method === "POST") {
          // get parameters from post request
          let params = JSON.parse(opts.body);

          // find if any user matches login credentials
          let filteredUsers = users.filter(user => {
            return (
              user.username === params.username &&
              user.password === params.password
            );
          });

          if (filteredUsers.length) {
            // if login details are valid return user details and fake jwt token
            let user = filteredUsers[0];
            let responseJson = {
              id: user.id,
              email: user.email,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              token: "fake-jwt-token"
            };
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(responseJson))
            });
          } else {
            // else return error
            reject("Username or password is incorrect");
          }

          return;
        }


        // Update
        if (opts && opts.method === "PUT") {
          // get new user object from post body
          let newUser = JSON.parse(opts.body);
          let objIndex = users.findIndex((obj => obj.id === newUser.id));
          users[objIndex].firstName = newUser.firstName;
          users[objIndex].lastname = newUser.lastname;
          users[objIndex].password = newUser.password;

          // Update User
          localStorage.setItem("users", JSON.stringify(users));
          let localUser = JSON.parse(localStorage.getItem("user"));
          localUser.firstName = newUser.firstName;
          localUser.lastName = newUser.lastName;
          localStorage.setItem("user", JSON.stringify(localUser));

          // respond 200 OK
          resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(localUser)) });

          return;
        }





        // get users
        if (url.endsWith("/users") && opts.method === "GET") {
          // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
          if (
            opts.headers &&
            opts.headers.Authorization === "Bearer fake-jwt-token"
          ) {
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(users))
            });
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }

          return;
        }

        // get user by id
        if (url.match(/\/users\/\d+$/) && opts.method === "GET") {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (
            opts.headers &&
            opts.headers.Authorization === "Bearer fake-jwt-token"
          ) {
            // find user by id in users array
            let urlParts = url.split("/");
            let id = parseInt(urlParts[urlParts.length - 1]);
            let matchedUsers = users.filter(user => {
              return user.id === id;
            });
            let user = matchedUsers.length ? matchedUsers[0] : null;

            // respond 200 OK with user
            resolve({ ok: true, text: () => JSON.stringify(user) });
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }

          return;
        }

        // register user
        if (url.endsWith("/users/register") && opts.method === "POST") {
          // get new user object from post body
          let newUser = JSON.parse(opts.body);

          // validation
          let duplicateUser = users.filter(user => {
            return user.username === newUser.username;
          }).length;
          if (duplicateUser) {
            reject('Username "' + newUser.username + '" is already taken');
            return;
          }

          if (!validateEmail(newUser.email)) {
            reject(`Email ${newUser.email} is not valid`);
          }

          try {
            const emailCheckRes = await checkEmail(newUser);
            console.log("Email check res" + JSON.stringify(emailCheckRes));
            if (emailCheckRes.status !== "valid") {
              reject(`Email ${newUser.email} is not valid`);
              return;
            }
          } catch (err) {
            reject(`Email ${newUser.email} is not valid`);
            return;
          }

          // save new user
          newUser.id = users.length
            ? Math.max(...users.map(user => user.id)) + 1
            : 1;
          users.push(newUser);
          localStorage.setItem("users", JSON.stringify(users));
          sendEmail(newUser);
          // respond 200 OK
          resolve({ ok: true, text: () => Promise.resolve() });

          return;
        }

        // delete user
        if (url.match(/\/users\/\d+$/) && opts.method === "DELETE") {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (
            opts.headers &&
            opts.headers.Authorization === "Bearer fake-jwt-token"
          ) {
            // find user by id in users array
            let urlParts = url.split("/");
            let id = parseInt(urlParts[urlParts.length - 1]);
            for (let i = 0; i < users.length; i++) {
              let user = users[i];
              if (user.id === id) {
                // delete user
                users.splice(i, 1);
                localStorage.setItem("users", JSON.stringify(users));
                localStorage.removeItem("user");
                break;
              }
            }

            // respond 200 OK
            resolve({ ok: true, text: () => Promise.resolve() });
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }

          return;
        }

        // pass through any requests not handled above
        realFetch(url, opts).then(response => resolve(response));
      }, 500);
    });
  };
}
