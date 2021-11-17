const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = async (req, res, next) => {
  const { url, body } = req;

  if (url === '/login') {
    const { email, password } = body;

    await delay(1000);

    if (email === 'john.doe@gmail.com' && password === '111111') {
      return res.send({ message: 'OK' });
    } else {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
  }

  next();
};
