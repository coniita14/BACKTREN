import jwt from "jsonwebtoken";

export function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      rol: user.rol,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    },
  );
}

export function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Token requerido",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Token inválido",
    });
  }
}

export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: "Token requerido",
      });
    }

    const role = String(req.user.rol || "").toUpperCase();
    const hasAccess = allowedRoles.some(
      (allowed) => String(allowed).toUpperCase() === role,
    );

    if (!hasAccess) {
      return res.status(403).json({
        error: "No tienes permisos para realizar esta acción.",
      });
    }

    next();
  };
}
