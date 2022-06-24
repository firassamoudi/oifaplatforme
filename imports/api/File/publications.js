import FilesCollection from ".";

Meteor.publish("files.all", function ({ imgId }) {
  return FilesCollection.find({ _id: imgId }).cursor;
});
