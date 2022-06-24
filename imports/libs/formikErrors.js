export const formikErrors = (err) => {
  const errors = {};
  err.inner.forEach((e) => {
    errors[`${e.path}Error`] = e.message;
  });
  // ...
  return errors;
};
