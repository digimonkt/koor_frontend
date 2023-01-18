import { SVG } from "../../../assets/svg";
import { USER_ROLES } from "../../../utils/enum";

const JobSeekerNavigationOptions = Object.freeze([
  {
    to: "",
    icon: SVG.ProfileIcon,
    title: "My Profile",
    id: "myProfile",
  },
  {
    icon: SVG.CircleRightIcon,
    title: "Applied jobs",
    id: "appliedJobs",
  },
  {
    icon: SVG.SaveIcon,
    title: "Saved Jobs",
    id: "savedJobs",
  },
  {
    icon: SVG.MessageIcon,
    title: "Messages",
    id: "messages",
    count: 2,
  },
]);
const EmployerNavigationOptions = Object.freeze([
  {
    icon: SVG.DashboardIcon,
    title: "Dashboard",
    id: "dashboard",
  },
  {
    icon: SVG.JobsIcon,
    title: "Manage jobs",
    id: "manageJobs",
  },
  {
    icon: SVG.TendersIcon,
    title: "Manage tenders",
    id: "manageTenders",
  },
  {
    icon: SVG.CalenderIcon,
    title: "Calender",
    id: "calender",
  },
  {
    icon: SVG.MessageIcon,
    title: "Messages",
    id: "messages",
    count: 2,
  },
]);

const VendorNavigationOptions = Object.freeze([
  {
    icon: SVG.DashboardIcon,
    title: "Dashboard",
    id: "dashboard",
  },
  {
    icon: SVG.ProfileIcon,
    title: "My Profile",
    id: "myProfile",
  },

  {
    icon: SVG.CalenderIcon,
    title: "Calender",
    id: "calender",
  },
  {
    icon: SVG.MessageIcon,
    title: "Messages",
    id: "messages",
    count: 2,
  },
]);

export const navigationOptions = (role) => {
  switch (role) {
    case USER_ROLES.employer:
      return EmployerNavigationOptions;
    case USER_ROLES.jobSeeker:
      return JobSeekerNavigationOptions;
    case USER_ROLES.VendorNavigationOptions:
      return VendorNavigationOptions;
    default:
      return [];
  }
};
