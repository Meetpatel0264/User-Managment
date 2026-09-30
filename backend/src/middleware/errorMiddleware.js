export function errorHandler(error, req, res, next) {
  console.error(error);

  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((item) => item.message);

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: messages
    });
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern ?? {})[0] || "field";

    return res.status(409).json({
      success: false,
      message: `${field} already exists`
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid request value"
    });
  }

  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON request body"
    });
  }

  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? "Internal server error"
        : error.message || "Request failed"
  });
}