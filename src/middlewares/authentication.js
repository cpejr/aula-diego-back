const jwt = require("jsonwebtoken");

module.exports = {
  async authenticateToken(request, response, next) {
    try {
      const authHeader = request.headers.authorization;
      const [scheme, token] = authHeader
        ? authHeader.split(" ")
        : [undefined, undefined];

      if (!token || token === null)
        return response.status(401).json({ error: "No token provided" });

      if (!/^Bearer$/i.test(scheme))
        return response.status(401).json({ error: "Token badformatted" });

      const decoded = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);

      request.session = decoded;

      return next();
    } catch (error) {
      console.log(error);
      return response
        .status(403)
        .json({ error: "Invalid authorization token" });
    }
  },

  async isAdmin(request, response, next) {
    const type = request.session.user.type;

    if (type !== "admin" && type !== "master") {
      return response.status(401).json({ error: "Access denied!" });
    } else {
      next();
    }
  },

  async isMaster(request, response, next) {
    const type = request.session.user.type;

    if (type !== "master") {
      return response.status(401).json({ error: "Access denied!" });
    } else {
      next();
    }
  },

  async authenticateOptionalToken(request, response, next) {
    const authHeader = request.headers.authorization;
    const [scheme, token] = authHeader
      ? authHeader.split(" ")
      : [undefined, undefined];

    if (!token || token === null)
      return response.status(401).json({ error: "No token provided" });

    if (!/^Bearer$/i.test(scheme))
      return response.status(401).json({ error: "Token badformatted" });

    const validToken = await new Promise((res) => {
      jwt.verify(token, process.env.AUTH_TOKEN_SECRET, (err, user) => {
        if (err) return res(false);
        request.session = user;

        return res(true);
      });
    });

    return next();
  },
};
