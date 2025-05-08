import axios from "axios";
import * as cheerio from "cheerio";
import { URL } from "url";

export const getFavicon = async (pageUrl) => {
  try {
    const response = await axios.get(pageUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Referer": pageUrl,
      },
    });

    const $ = cheerio.load(response.data);
    const baseUrl = new URL(pageUrl).origin;

    let favicon =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href") ||
      "/favicon.ico"; // fallback

    if (!favicon.startsWith("http")) {
      favicon =
        baseUrl + (favicon.startsWith("/") ? favicon : "/" + favicon);
    }

    return favicon;
  } catch (err) {
    console.error("Error fetching favicon:", err.message);
    return null;
  }
};
