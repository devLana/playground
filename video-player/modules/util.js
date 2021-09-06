const appendZero = t => {
  if (t < 10) return `0${t}`;
  return t;
};

export default appendZero;
