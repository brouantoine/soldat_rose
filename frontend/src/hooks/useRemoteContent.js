import { useEffect, useState } from "react";
import localConfig from "../content/site.config";

  const CONTENT_URL =
  "https://raw.githubusercontent.com/brouantoine/soldat_rose_portfolio_content/main/content.json";

export default function useRemoteContent() {
  const [content, setContent] = useState(localConfig);

  useEffect(() => {
    fetch(CONTENT_URL, { cache: "no-store" })
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(remote => setContent({ ...localConfig, ...remote })) // merge simple
      .catch(() => setContent(localConfig));
  }, []);

  return content;
}
