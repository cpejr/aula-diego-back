const jwt = require("jsonwebtoken");

module.exports = {
  async authenticateToken(request, response, next) {
    const authHeader = request.headers.authorization;

    const [scheme, token] = authHeader
      ? authHeader.split(" ")
      : [undefined, undefined];


      if( token || !token === null){
          return response.status(401).json({error:'No token providen!'})
      }

      if (!/^Bearer$/i.test(scheme))
      return response.status(401).json({ error: "Token badformatted" });

    
    const validToken = await new Promise((res)=>{
        jwt.verify(token,process.env.ACCES_TOKEN_SECRET,(err,user)=>{
            if(err){
                return (false)
            }
            request.session = user.user[0];

            return res(true)
        });
    });

    if(validToken) return next()
    return response.status(403).json({ error: "Invalid authorization token" });
  },
};
