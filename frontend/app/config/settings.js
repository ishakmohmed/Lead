import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "http://192.168.1.4:5000",
  },
  staging: {
    apiUrl: "http://192.168.1.4:5000",
  },
  prod: {
    apiUrl: "http://192.168.1.4:5000",
  },
};

getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;

  return settings.prod;
};

export default getCurrentSettings();
