import "./style.scss";

import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputBase from "@material-ui/core/InputBase";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import SearchIcon from "@material-ui/icons/Search";
import cx from "classnames";
import React, { useEffect, useState } from "react";
import Unsplash, { toJson } from "unsplash-js";

import FilesCollection from "/imports/api/File";
import LoadingDots from "/imports/ui/common/LoadingDots";

import { EntryImage } from "../../../../common/Entry";
import Typography from "../../../../common/Typography";

const UploadPreviewPlaceholder = () => (
  <Box className="ProgramVisual__upload__preview">
    <Typography
      face="Medium"
      size="1.5rem"
      height="1.5rem"
      style={{ margin: "0 0 1.4rem 0" }}
    >
      <span style={{ color: "#f9bf58", margin: "0 0.6rem 0 0" }}>Upload</span>
      or drop an image right here
    </Typography>
    <Typography face="Book" size="1.4rem" height="1.4rem" color="#838aab">
      It works for JPG, PNG formats —max size 5MB
    </Typography>
  </Box>
);

const SearchBox = ({
  value,
  searchInProgress,
  changeHandler,
  submitHandler,
}) => (
  <Box component="form" onSubmit={submitHandler}>
    <InputBase
      className="__search-entry"
      placeholder="Search images using keywords"
      value={value}
      onChange={changeHandler}
      startAdornment={
        <SearchIcon
          style={{
            fontSize: "2.3rem",
            color: "#7c8799",
            margin: "0 1.1rem 0 1.8rem",
          }}
        />
      }
      endAdornment={
        searchInProgress ? (
          <Box className="__search-loader">
            <CircularProgress size="2rem" />
          </Box>
        ) : null
      }
    />
  </Box>
);

const SearchPhotosList = ({
  side,
  photos,
  selectedPhoto,
  isUploading,
  handler,
}) => (
  <Box className="__search-photos__list">
    {photos.map((photo, index) => {
      const isSelected = `${side}__${index}` === selectedPhoto;
      return (
        <Box
          key={index}
          className={cx("__search-photos__img", {
            __selected: isSelected,
          })}
          onClick={() => handler(`${side}__${index}`)}
        >
          <CheckCircleIcon
            className="__icon"
            style={{
              width: "3rem",
              height: "3rem",
              color: "rgb(249, 192, 91)",
            }}
          />
          <Box component="img" key={index} src={photo.urls.small} alt="" />
          {isSelected && isUploading && (
            <Box className="__loading">
              <LoadingDots orange />
            </Box>
          )}
        </Box>
      );
    })}
  </Box>
);

const TabPanel = ({ children, value, index, className }) => (
  <Box
    className={className}
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
  >
    {value === index && children}
  </Box>
);

const a11yProps = (index) => ({
  id: `tab-${index}`,
  "aria-controls": `tabpanel-${index}`,
});

const ProgramVisual = ({ data, onInputChange }) => {
  // - Tabs
  const [currTab, setCurrTab] = useState(0);
  const onChangeTab = (event, newTab) => {
    setCurrTab(newTab);
  };
  // - Search
  const [searchEntry, setSearchEntry] = useState("");
  const onInputSearchChange = (e) => {
    setSearchEntry(e.target.value);
  };
  // - Parse Search
  const [isUploading, setIsUploading] = useState(false);
  const [searchInProgress, setSearchInProgress] = useState(false);
  const [photosL, setPhotosL] = useState([]);
  const [photosR, setPhotosR] = useState([]);
  // ...
  const onSearchHandler = async (e) => {
    if (searchInProgress || !searchEntry || isUploading) return;
    if (e) {
      e.preventDefault();
    }
    setSearchInProgress(true);
    // ...
    const _access = "Wn7_-aNsyGhqACkL-23wvYkvoQZ020MBcNjDCz4iEKI";
    // const _secret = "c6UtvIAPDSbDesByq94xrZ3OL7DXjsKHEbNd3MqCptY";
    const unsplash = new Unsplash({ accessKey: _access });
    // ...
    const photosRes = await unsplash.search.photos(searchEntry, 1, 60, {
      orientation: "landscape",
    });
    const photos = await toJson(photosRes);
    const photosList = photos.results;
    const resLength = Math.floor(photosList.length / 2);
    const photosListR = photosList.slice(0, resLength);
    const photosListL = photosList.slice(resLength);
    // ...
    setPhotosL(photosListL);
    setPhotosR(photosListR);
    setSearchInProgress(false);
  };
  // - Selected Photo
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const onSetSelectedPhoto = async (p) => {
    if (isUploading) return;
    setSelectedPhoto(p);
    setIsUploading(true);
    // - Download Img
    const side = p[0];
    const index = p[3];
    const photosList = side === "l" ? photosL : photosR;
    const img = photosList[index];
    const imgUrl = img.urls.full;
    // ...
    const res = await fetch(imgUrl);
    const blob = await res.blob();
    const file = new File([blob], "img-from-unsplash.jpeg");
    if (!file) return;
    // - Delete Old Img
    if (data.imgId) {
      FilesCollection.remove({ _id: data.imgId });
    }
    // - Upload Img
    FilesCollection.insert({
      file,
      streams: "dynamic",
      chunkSize: "dynamic",
      onStart() {},
      onUploaded(error, fileObj) {
        setIsUploading(false);
        onInputChange({ imgId: fileObj._id });
      },
    });
  };
  useEffect(() => {
    let searchFor = "";
    const sectors = data.sector.map((s) => s.label);
    if (sectors.length) {
      searchFor = sectors.toString().replace(/,/g, ", ");
    }
    // ...
    setSearchEntry(searchFor);
  }, [data.sector]);
  useEffect(() => {
    onSearchHandler();
  }, [searchEntry]);
  // ...
  return (
    <Box className="ProgramVisual">
      <Tabs value={currTab} onChange={onChangeTab}>
        <Tab label="Select visual" disableRipple {...a11yProps(0)} />
        <Tab label="Upload visual" disableRipple {...a11yProps(1)} />
      </Tabs>

      <TabPanel className="ProgramVisual__unsplash" value={currTab} index={0}>
        <SearchBox
          value={searchEntry}
          searchInProgress={searchInProgress}
          changeHandler={onInputSearchChange}
          submitHandler={onSearchHandler}
        />

        <Box className="__search-photos">
          <SearchPhotosList
            side="l"
            photos={photosL}
            selectedPhoto={selectedPhoto}
            isUploading={isUploading}
            handler={onSetSelectedPhoto}
          />
          <SearchPhotosList
            side="r"
            photos={photosR}
            selectedPhoto={selectedPhoto}
            isUploading={isUploading}
            handler={onSetSelectedPhoto}
          />
        </Box>
      </TabPanel>

      <TabPanel className="ProgramVisual__upload" value={currTab} index={1}>
        <Box
          className={cx("ProgramVisual__upload__inner", {
            __hide: !!data.imgId,
          })}
        >
          <EntryImage
            name="imgId"
            value={data.imgId}
            onImgChange={onInputChange}
            Component={() => <UploadPreviewPlaceholder />}
          />
        </Box>
      </TabPanel>
    </Box>
  );
};

export default ProgramVisual;
