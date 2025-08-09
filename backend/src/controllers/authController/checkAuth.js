exports.checkAuth = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ isAuthenticated: true, user });
  } catch {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'Strict',
        secure: process.env.NODE_ENV === 'production',
    });
    res.status(401).json({ isAuthenticated: false });
  }
};