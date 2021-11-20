const error = (data) => {
  return {
    status: data.status,
    message: data.message,
  };
};

const successfully = (data) => {
  return {
    status: data.status,
    data: data.users,
  };
};

module.exports = {
  error,
  successfully,
};
