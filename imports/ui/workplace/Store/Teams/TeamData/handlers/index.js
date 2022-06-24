const { TeamData } = require("../../..");

export const handleInputChange = (inp) => {
  TeamData.set("TeamData", { title: inp.title });
};
