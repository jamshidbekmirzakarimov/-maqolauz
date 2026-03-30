import jwt from "jsonwebtoken";

export const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh token berilmadi" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.SECRET_KEY,
      { expiresIn: "30s" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message: "Refresh token xato yoki expired",
      error: error.message,
    });
  }
};
