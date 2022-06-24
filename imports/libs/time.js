/**
 * Petit Time formatter
 */

const humanizeDuration = require("humanize-duration");

export const timeSpent = ({ start, end }) => {
  const stamp = new Date(end) - new Date(start);
  return humanizeDuration(stamp, {
    units: ["w", "d", "h", "m", "s"],
    conjunction: " and ",
    round: true,
  });
};
