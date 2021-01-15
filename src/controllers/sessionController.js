const UserModel = require("../models/UserModel");
const FirebaseModel = require("../models/FirebaseModel");
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

module.exports = {
  async signin(request, response) {
    try {
      const loggedWithGoogle = request.body.google ? true : false;
      const { email, password } = request.body;
      let firebaseUid;

      if (!loggedWithGoogle) {
        try {
          firebaseUid = await FirebaseModel.createSession(email, password);
        } catch (error) {
          return response.status(403).json({ message: "Invalid Credentials" });
        }
        var user = await UserModel.getUserByUid(firebaseUid);
      }
      if (loggedWithGoogle) {
        var user = await UserModel.getUserByEmail(email);
      }
      );
      const accessToken = jwt.sign({ user }, process.env.AUTH_TOKEN_SECRET, {
        expiresIn: "30d",
      });
      return user
        ? response.status(200).json({ accessToken, user })
        : response.status(400).json({ message: "User was not found" });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ message: "Error while trying to validate credentials" });
    }
  },

  async verifyToken(request, response) {
    const authHeader = request.headers.authorization;
    const [scheme, token] = authHeader
      ? authHeader.split(" ")
      : [undefined, undefined];

    if (!token || token === null)
      return response.status(401).json({ error: "No token provided" });

    if (!/^Bearer$/i.test(scheme))
      return response.status(401).json({ error: "Token badformatted" });

    const verify = await new Promise((res) => {
      jwt.verify(token, process.env.AUTH_TOKEN_SECRET, (err, user) => {
        if (err) console.log(err);
        if (err) return res({ verified: false, user: {} });

        return res({ verified: true, user: user.user });
      });
    });

    if (verify !== undefined)
      return response.status(200).json(({ valid, user } = verify));
    return response.status(403).json({ error: "Invalid authorization token" });
  },

  async forgotPassword(request, response) {
    try {
      const { email } = request.body;
      await FirebaseModel.forgotPassword(email);
      return response.status(200).json({ message: "Enviado com sucesso!" });
    } catch (error) {
      console.warn(error);
      return response.status(500).json({ error: "internal server error " });
    }
  },
};
