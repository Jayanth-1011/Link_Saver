import { verifyToken } from '../utils/jwt.js'; // Importing the JWT utility function

const protect = (req, res, next) => {
  const token = req.cookies.jwt; // Extract the JWT from the cookie

  // Check if the token is not provided
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify the token
  const decoded = verifyToken(token);

  // If token is invalid or expired
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  // If token is valid, attach the decoded user information to the request object
  req.user = decoded;

  // Continue to the next middleware/controller
  next();
};

export default protect;
