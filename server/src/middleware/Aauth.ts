import jwt from "jsonwebtoken";

// Admin Authentication MiddleWare

function Aauth(req, res, next) {
  try {
    const token = req.cookies.token;
    const { key } = req.body;
    const JWT_SECRET = "thH],!aQ?$n]J*^L!4^8sR.p*/Kaz{EY)7eqdJP$";

    if (!key || key === "" || key !== "Admin")
      return res.status(400).json({ errMsg: "Please enter a valid key" });

    if (!token) return res.status(401).json({ errMsg: "Unauthorized User" });

    type MyToken = {
      user: String;
    };

    const verified = jwt.verify(token, JWT_SECRET) as MyToken;

    req.user = verified.user;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errMsg: "Unauthorized User" });
  }
}

export default Aauth;
