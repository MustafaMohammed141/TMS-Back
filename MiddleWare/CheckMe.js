const allowedIP = process.env.IP;

const Me = (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  if (ip.includes(allowedIP)) {
    return next();
  } else {
    return res.status(403).send(`Access denied. {${ip}}`);
  }
};
module.exports = { Me };
