const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://frontend-nine-iota-87.vercel.app"
    : "http://localhost:3000";

export default baseUrl;
