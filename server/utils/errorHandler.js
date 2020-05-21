module.exports = (res, code, error) => {
  res.status(code).json({
    success: false,
    status: error.message ? error.message : error,
  });
};
