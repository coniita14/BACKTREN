import jwt from "jsonwebtoken";

export function crearToken(usuario) {
  const payload = {
    id: usuario.id,
    rol: usuario.rol,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
}
