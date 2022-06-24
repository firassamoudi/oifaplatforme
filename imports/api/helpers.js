export const throwError = (id, error = "") => {
  throw new Meteor.Error(id, error);
};

export const ifYouAre = (roles) => {
  const userId = Meteor.userId();
  if (!userId) return false;
  // ...
  const hasRole = Roles.userIsInRole(userId, roles);
  if (!hasRole) return throwError("what?", "what? again!");
};

export const alertUser = (type, userId = []) => {
  // console.log(`${type} ::`, userId);
};
