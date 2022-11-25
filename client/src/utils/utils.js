const isSmallSize = (value) => value === "small" || value === "xsmall";
const uniqueKey = (pre) => `${pre}_${new Date().getTime()}`;

export { isSmallSize, uniqueKey };
