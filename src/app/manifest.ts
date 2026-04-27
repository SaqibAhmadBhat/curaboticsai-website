import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CuraBotics AI | Healthcare Technology",
    short_name: "CuraBotics AI",
    description:
      "Global healthcare technology company integrating AI automation, medical equipment procurement, and robotics systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a", // Dark styling native to CuraBotics branding
    icons: [
      {
        src: "/logo/favicon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
