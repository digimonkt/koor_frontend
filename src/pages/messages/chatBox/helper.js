import { IMAGES } from "@assets/images";
import { SVG } from "@assets/svg";

const role = localStorage.getItem("role");
export const chatsidebar = [
  {
    user: IMAGES.User,
    title: "Junges Müller",
    icon: <SVG.StarIcon />,
    subtitle: "Online Research Participant",
    pragraph: "Hi! Thanks for replying me back. Currently...",
    active: role === "jobSeeker" ? "jobseekeractive" : "active",
  },
  {
    title: "Sofia Melbourne",

    subtitle: "Online Research Participant (Work From Home…",
    pragraph: "Hey 👋",
  },
  {
    user: IMAGES.User,
    title: "Sofia Melbourne",

    subtitle: "Internship In Tourism & Hospitality",
    pragraph: <>Right now I’m away. We can talk at 5PM. </>,
  },
  {
    user: IMAGES.User,
    title: "Nakkharash Abzolombey",

    subtitle: "Internship In Tourism & Hospitality",
    pragraph: "One moment please",
  },
  {
    title: "Sofia Melbourne",

    subtitle: "Online Research Participant (Work From Home…",
    pragraph: "Hey 👋",
  },
];
