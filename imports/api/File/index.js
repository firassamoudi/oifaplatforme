import { FilesCollection } from "meteor/ostrio:files";

const Collection = new FilesCollection({
  // debug: true,
  storagePath: process.env.STORAGE_PATH,
  collectionName: "files",
  allowClientCode: true, // Disallow remove files from Client
  // onBeforeUpload(file) {
  //   // Allow upload files under 10MB, and only in png/jpg/jpeg formats
  //   if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
  //     return true;
  //   }
  //   return "Please upload image, with size equal or less than 10MB";
  // },
});

export default Collection;
