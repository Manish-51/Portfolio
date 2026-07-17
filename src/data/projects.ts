import type { Project } from "../types";

export const projectsData: Project[] = [
  {
    id: "p1",
    title: "TrackBoard — Spotify Music Analytics",
    category: "Data Analytics",
    summary:
      "A 26-page analytics report and companion site exploring listening trends through Power BI.",
    description:
      "A full analytics study built from real CSV-derived listening statistics, featuring a Power BI dashboard with custom DAX measures, hand-tuned charts, and a five-page Django project site under the TrackBoard identity.",
    stack: ["Power BI", "DAX", "Python", "Django"],
    year: "2026",
    featured: true,
    links: {
      live: "/project/p1",
    },
    media: [
      {
        id: "p1-photo",
        type: "image",
        label: "Project screenshot",
        src: "/projects/sample-image.svg",
        alt: "TrackBoard screenshot",
      },
      {
        id: "p1-video",
        type: "video",
        label: "Project preview video",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "p1-file",
        type: "file",
        label: "Download project file",
        src: "/projects/sample-project-file.txt",
      },
    ],
    accent: "from-emerald-400/40 to-amber-500/30",
  },
  {
    id: "p2",
    title: "Zomato Restaurant Analysis",
    category: "Data Analytics",
    summary:
      "An end-to-end restaurant analytics project uncovering customer preferences, sales patterns, and operational insights using Zomato data.",
    description:
      "A comprehensive analysis of real-world Zomato restaurant records featuring interactive dashboards, custom KPIs, and visual storytelling to identify top cuisines, pricing trends, ratings distribution, and location-based performance, enabling data-driven decisions for restaurant growth.",
    stack: ["Power BI", "DAX", "Python", "SQL"],
    year: "2026",
    featured: true,
    links: {
      live: "/project/p2",
    },
    media: [
      {
        id: "p2-photo",
        type: "image",
        label: "Project screenshot",
        src: "/projects/sample-image.svg",
        alt: "Zomato Restaurant Analysis screenshot",
      },
      {
        id: "p2-video",
        type: "video",
        label: "Project preview video",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "p2-file",
        type: "file",
        label: "Download project file",
        src: "/projects/sample-project-file.txt",
      },
    ],
    accent: "from-amber-500/40 to-obsidian-700/20",
  },
  {
    id: "p3",
    title: "E-commerce Sales Analysis Dashboards",
    category: "Data Analytics",
    summary:
      "An interactive sales analytics dashboard providing actionable insights into e-commerce performance and customer behavior.",
    description:
      "A comprehensive analysis of transactional e-commerce data featuring custom KPIs, dynamic visualizations, and drill-down reports to uncover sales trends, product performance, customer segments, and regional revenue patterns, enabling data-driven business decisions.",
    stack: ["Power BI", "DAX", "Python", "SQL"],
    year: "2026",
    links: {
      live: "/project/p3",
    },
    media: [
      {
        id: "p3-photo",
        type: "image",
        label: "Project screenshot",
        src: "/projects/sample-image.svg",
        alt: "E-commerce Sales Analysis screenshot",
      },
      {
        id: "p3-video",
        type: "video",
        label: "Project preview video",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "p3-file",
        type: "file",
        label: "Download project file",
        src: "/projects/sample-project-file.txt",
      },
    ],
    accent: "from-obsidian-700/40 to-emerald-400/20",
  },
  {
    id: "p4",
    title: "Air Cargo Analysis & Dashboard",
    category: "Data Analytics",
    summary:
      "An interactive air cargo analytics dashboard delivering insights into shipment performance and logistics efficiency.",
    description:
      "A comprehensive analysis of air cargo operations using real shipment data, featuring custom KPIs, dynamic visualizations, and drill-down reports to uncover trends in cargo volume, route utilization, delivery timeliness, and carrier performance, enabling data-driven optimization of logistics and supply chain operations.",
    stack: ["Power BI", "DAX", "Python", "SQL"],
    year: "2026",
    links: {
      live: "/project/p4",
    },
    media: [
      {
        id: "p4-photo",
        type: "image",
        label: "Project screenshot",
        src: "/projects/sample-image.svg",
        alt: "Air Cargo Analysis screenshot",
      },
      {
        id: "p4-video",
        type: "video",
        label: "Project preview video",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "p4-file",
        type: "file",
        label: "Download project file",
        src: "/projects/sample-project-file.txt",
      },
    ],
    accent: "from-amber-400/30 to-emerald-400/30",
  },
  {
    id: "p5",
    title: "Superstore Sales Analysis & Dashboard",
    category: "Data Analytics",
    summary: "An interactive sales analytics dashboard providing actionable insights into superstore performance and customer behavior.",
    description:
      "A comprehensive analysis of superstore transactional data featuring custom KPIs, dynamic visualizations, and drill-down reports to uncover sales trends, product performance, customer segments, and regional revenue patterns, enabling data-driven business decisions.",
    stack: ["Power BI", "DAX", "Python", "SQL"],
    year: "2026",
    links: {
      live: "/project/p5",
    },
    media: [
      {
        id: "p5-photo",
        type: "image",
        label: "Project screenshot",
        src: "/projects/sample-image.svg",
        alt: "Superstore Sales Analysis screenshot",
      },
      {
        id: "p5-video",
        type: "video",
        label: "Project preview video",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "p5-file",
        type: "file",
        label: "Download project file",
        src: "/projects/sample-project-file.txt",
      },
    ],
    accent: "from-amber-500/20 to-obsidian-700/30",
  },
  {
    id: "p6",
    title: "AirBnb Analytics & Dashboard",
    category: "Data Analytics",
    summary:
     "An interactive Airbnb analytics dashboard uncovering booking trends, pricing patterns, and host performance insights.",
    description:
     "A comprehensive analysis of Airbnb listing and reservation data featuring custom KPIs, dynamic visualizations, and drill-down reports to identify occupancy trends, seasonal demand, neighborhood performance, and guest preferences, enabling data-driven decisions for hosts and property managers.",
    stack: ["Power BI", "DAX", "Python", "SQL"],
    year: "2026",
    links: {
      live: "/project/p6",
    },
    media: [
      {
        id: "p6-photo",
        type: "image",
        label: "Project screenshot",
        src: "/projects/sample-image.svg",
        alt: "Airbnb Analytics screenshot",
      },
      {
        id: "p6-video",
        type: "video",
        label: "Project preview video",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "p6-file",
        type: "file",
        label: "Download project file",
        src: "/projects/sample-project-file.txt",
      },
    ],
    accent: "from-obsidian-600/40 to-amber-400/20",
  },
  {
    id: "p7",
    title: "Healthcare Operations Analysis & Dashboard",
    category: "Data Analytics",
    summary: "An interactive healthcare analytics dashboard revealing patient trends and hospital performance metrics.",
    description:
      "A comprehensive analysis of healthcare operations using anonymized patient and facility data, featuring custom KPIs, dynamic visualizations, and drill-down reports to identify admission patterns, treatment outcomes, resource utilization, and departmental efficiency, enabling data-driven improvements in patient care and operational planning.",
    stack: ["Power BI", "DAX", "Python", "SQL"],
    year: "2026",
    links: {
      live: "/project/p7",
    },
    media: [
      {
        id: "p7-photo",
        type: "image",
        label: "Project screenshot",
        src: "/projects/sample-image.svg",
        alt: "Healthcare Operations Analysis screenshot",
      },
      {
        id: "p7-video",
        type: "video",
        label: "Project preview video",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "p7-file",
        type: "file",
        label: "Download project file",
        src: "/projects/sample-project-file.txt",
      },
    ],
    accent: "from-amber-500/20 to-obsidian-700/30",
  },
];
