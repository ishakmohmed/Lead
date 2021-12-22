import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "http://192.168.1.5:5000",
  },
  staging: {
    apiUrl: "https://nodejs-backend-for-lead-app.herokuapp.com",
  },
  prod: {
    apiUrl: "https://nodejs-backend-for-lead-app.herokuapp.com",
  },
};

getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;

  return settings.prod;
};

export default getCurrentSettings();
