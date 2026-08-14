import "dotenv/config";

export const config = {
  port: process.env.PORT,

  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,

  jwtSecret: process.env.JWT_SECRET,

  rateLimit: {
    auth: {
      windowMs: 60 * 1000,
      max: 5,
      message:
        "Demasiados intentos de inicio de sesión. Intente nuevamente en 1 minuto.",
    },
    general: {
      windowMs: 60 * 1000,
      max: 120,
      message:
        "Se excedió el límite de peticiones. Intente nuevamente más tarde.",
    },
    write: {
      windowMs: 60 * 1000,
      max: 30,
      message:
        "Ha superado el límite de operaciones de escritura. Intente nuevamente más tarde.",
    },
    admin: {
      windowMs: 60 * 1000,
      max: 200,
    },
    teacher: {
      windowMs: 60 * 1000,
      max: 150,
    },
    student: {
      windowMs: 60 * 1000,
      max: 100,
    },
    public: {
      windowMs: 60 * 1000,
      max: 60,
    },
  },
};
