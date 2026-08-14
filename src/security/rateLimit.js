import { config } from "../config.js";

const requests = new Map();

function getClientKey(req) {
  if (req.user?.id) {
    return `user:${req.user.id}`;
  }

  const forwardedFor = req.headers["x-forwarded-for"];
  const ip = forwardedFor
    ? forwardedFor.split(",")[0].trim()
    : req.ip || req.socket?.remoteAddress || "unknown";

  return `ip:${ip}`;
}

function getEndpointType(req) {
  const route = (req.originalUrl || req.path || "").toLowerCase();

  if (
    route.includes("/login") ||
    route.includes("/register") ||
    route.includes("/signup") ||
    route.includes("/recover") ||
    route.includes("/reset") ||
    route.includes("/recuperar")
  ) {
    return "auth";
  }

  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    return "write";
  }

  return "general";
}

function getRoleType(req) {
  const role = (req.user?.rol || "").toUpperCase();

  if (["ADMIN", "ADMINISTRADOR"].includes(role)) return "admin";
  if (["PROFESOR", "DOCENTE", "TEACHER"].includes(role)) return "teacher";
  if (["ALUMNO", "ESTUDIANTE", "STUDENT"].includes(role)) return "student";

  return "public";
}

function getLimitConfig(req) {
  const endpointType = getEndpointType(req);
  const roleType = getRoleType(req);
  const defaults = config.rateLimit || {};

  const endpointRules = defaults[endpointType] || {};
  const roleRules = defaults[roleType] || {};

  return {
    windowMs: Number(
      endpointRules.windowMs ||
        roleRules.windowMs ||
        defaults.general?.windowMs ||
        60000,
    ),
    max: Number(
      endpointRules.max || roleRules.max || defaults.general?.max || 120,
    ),
    message:
      endpointRules.message ||
      roleRules.message ||
      defaults.general?.message ||
      "Demasiadas peticiones. Intente nuevamente más tarde.",
  };
}

export function rateLimitMiddleware(options = {}) {
  return (req, res, next) => {
    const limitConfig = {
      ...getLimitConfig(req),
      ...options,
    };

    const key = `${req.method}:${req.originalUrl || req.path}:${getClientKey(req)}`;
    const now = Date.now();
    const entry = requests.get(key) || {
      count: 0,
      resetAt: now + limitConfig.windowMs,
    };

    if (now > entry.resetAt) {
      entry.count = 0;
      entry.resetAt = now + limitConfig.windowMs;
    }

    if (entry.count >= limitConfig.max) {
      const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));

      res.setHeader("Retry-After", String(retryAfter));
      res.setHeader("X-RateLimit-Limit", String(limitConfig.max));
      res.setHeader("X-RateLimit-Remaining", "0");

      return res.status(429).json({
        success: false,
        message: limitConfig.message,
        retryAfter,
      });
    }

    entry.count += 1;
    requests.set(key, entry);

    res.setHeader("X-RateLimit-Limit", String(limitConfig.max));
    res.setHeader(
      "X-RateLimit-Remaining",
      String(Math.max(limitConfig.max - entry.count, 0)),
    );
    res.setHeader("X-RateLimit-Reset", String(Math.ceil(entry.resetAt / 1000)));

    next();
  };
}
