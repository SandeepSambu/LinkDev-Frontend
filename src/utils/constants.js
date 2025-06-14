const DEV_URL = "http://localhost:5000";
const PROD_URL = "https://linkdev-backend-gspv.onrender.com";

export const BASE_URL =
  import.meta.env.MODE === "development" ? DEV_URL : PROD_URL;
