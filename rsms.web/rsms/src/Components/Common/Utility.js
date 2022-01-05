export const getCurrentDateTimeString = () => {
  return new Date().toLocaleString("sv").replace(" ", "T").substring(0, 16);
};
