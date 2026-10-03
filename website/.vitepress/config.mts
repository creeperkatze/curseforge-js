import { version } from "../../package.json";
import { defineDocsConfig } from "./shared/docs";

export default defineDocsConfig({
  name: "curseforge-js",
  description: "A framework-agnostic fully typed JavaScript client for the CurseForge API.",
  repo: "creeperkatze/curseforge-js",
  version,
  guide: [
    { text: "Getting Started", link: "/guide/getting-started" },
    { text: "Error Handling", link: "/guide/error-handling" },
    { text: "Custom Fetch", link: "/guide/custom-fetch" },
    { text: "Games & Categories", link: "/guide/games" },
    { text: "Mods", link: "/guide/mods" },
    { text: "Files", link: "/guide/files" },
    { text: "Fingerprints", link: "/guide/fingerprints" },
    { text: "Users", link: "/guide/users" },
  ],
  api: new URL("../api", import.meta.url),
});
