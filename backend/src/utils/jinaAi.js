// utils/summarizeWithJina.js
import axios from "axios";

export const summarizeWithJina = async (url) => {
  try {
    const res = await axios.get(`https://r.jina.ai/${url}`);
    console.log(res.data)
    return res.data; // Clean readable content
  } catch (err) {
    console.error("Jina summary error:", err.message);
    return "Summary not available";
  }
};
