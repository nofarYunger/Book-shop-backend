const { User, Order } = require("../../models/");
const bcrypt = require("bcrypt");

async function register(req, res) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  try {
    // we added validation to the user model (unique and not null )
    //create a new user with a hashed password
    const newUser = await User.create(
      Object.assign(req.body, { hashedPassword: hash })
    );
    //add a token to the connection
    // sends the obj the the client with the hashed password and the token.
    const { user, token } = await newUser.authorize();
    //creating a new order
    const order = await user.createOrder();

    return res.json({ token, user, order });
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
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
    const { user, token } = await User.authenticate(email, password);
    //We are looking for the newest order for the specific user (the user has multiple orders and we wont the active one)
    // we order the orders descending and take only the first one(we can olso do it with the id because its incremented)
    let order = await Order.findAll({
      limit: 1,
      where: {
        UserId: user.id,
      },
      order: [["createdAt", "DESC"]],
    });
    order = order[0];

    return res.json({ user, order, token });
  } catch (err) {
    console.log(err);
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
