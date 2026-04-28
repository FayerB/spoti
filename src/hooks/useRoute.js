import { useState, useEffect } from "react";

export function useRoute() {
  const [path, setPath] = useState(window.location.hash || "#/");
  useEffect(() => {
    const h = () => setPath(window.location.hash || "#/");
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);
  return path;
}

export function navigate(to) {
  window.location.hash = to;
}