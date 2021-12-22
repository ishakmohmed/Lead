import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "https://nodejs-backend-for-lead-app.herokuapp.com/",
  },
  staging: {
    apiUrl: "https://nodejs-backend-for-lead-app.herokuapp.com/",
  },
  prod: {
    apiUrl: "https://nodejs-backend-for-lead-app.herokuapp.com/",
  },
};

getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;

  return settings.prod;
};

export default getCurrentSettings();
