const handleDuplicateError = (error: any) => {
  const statusCode = 400;
  // Regular expression to match text within quotes
  const extractedValue = error.errorResponse.errmsg.match(/"([^"]+)"/)[1];

  const errorSources = [
    {
      path: '',
      message: `${extractedValue} has already existed.`,
    },
  ];
  //   ! existed property -> duplicate error message
  return {
    statusCode,
    message: error.message,
    errorSources,
  };
};
export default handleDuplicateError;
