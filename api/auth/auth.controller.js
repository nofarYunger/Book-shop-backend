const bcrypt = require("bcrypt");
const { models } = require("../../models");

async function register(req, res) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  try {
    // we added validation to the user model (unique and not null )
    //create a new user with a hashed password
    const user = await models.User.create(
      Object.assign(req.body, { hashedPassword: hash })
    );
    //add a token to the connection
    const data = await user.authorize();
    // sends the obj the the client with the hashed password and the token.

    return res.json(data);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  // if the email or password are missing, we use status code 400
  // indicating a bad request was made and send back a message
  if (!email || !password) {
    return res.status(400).send("Request missing email or password param");
  }
  try {
    const user = await models.User.authenticate(email, password);
    return res.json(user);
  } catch (err) {
    return res.status(400).send("invalid email or password");
  }
}

async function logout(req, res) {
  // The logout request is sent with authorization
  //  so we should have access to the user
  // on the req .
  console.log(req);
  const {
    user,
    cookies: { auth_token: authToken },
  } = req;

  // we only want to attempt the logout if the user is
  // present in the req object, meaning it already
  // passed the authentication middleware. but we'll check again..
  if (user && authToken) {
    await req.user.logout(authToken);
    return res.status(204).send();
  }

  // if the user is missing, the user is not logged in, so we
  // use status code 400 indicating a bad request was made
  // and send back a message
  return res.status(400).send({ errors: [{ message: "not authenticated" }] });
}

// If the user is logged in the req object should contain
// a uesr object so we'll send it back to the client.
async function getLoggedinUser(req, res) {
  if (req.user) {
    res.send(req.user);
  }
  res.status(404).send({ errors: [{ message: "missing auth token" }] });
}
module.exports = {
  register,
  login,
  logout,
  getLoggedinUser,
};
