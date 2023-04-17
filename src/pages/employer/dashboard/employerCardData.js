import { SVG } from "@assets/svg";

export const employerCard = (count) => [
  {
    icon: <SVG.ActiveJob />,
    title: count.activeJobs,
    subtitle: "active job post",
    bgcolor: "#FCB74F",
    boxshadow: "0px 5px 25px rgba(252, 183, 79, 0.5)",
  },
  {
    icon: <SVG.UserGroupIcon />,
    title: count.appliedJobs,
    subtitle: "applications on job received",
    bgcolor: "#5CC1E0",
    boxshadow: "0px 5px 25px rgba(92, 193, 224, 0.5)",
  },
  {
    icon: <SVG.ActiveJob />,
    title: count.activeTender,
    subtitle: "active Tender posts",
    bgcolor: "#61C78A",
    boxshadow: "0px 5px 25px rgba(97, 199, 138, 0.5)",
  },
  {
    icon: <SVG.UserGroupIcon />,
    title: count.appliedTender,
    subtitle: "applications on tender received",
    bgcolor: "#9C62E8",
    boxshadow: "0px 5px 25px rgba(156, 98, 232, 0.5)",
  },
];
