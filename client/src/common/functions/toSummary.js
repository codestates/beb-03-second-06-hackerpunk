function toSummary(str) {
  return str.slice(0, 8) + "..." + str.slice(str.length - 6);
}

export default toSummary;
