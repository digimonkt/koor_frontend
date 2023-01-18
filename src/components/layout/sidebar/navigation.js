import { SVG } from "../../../assets/svg";
import { USER_ROLES } from "../../../utils/enum";

const JobSeekerNavigationOptions = Object.freeze([
  {
    to: "/my-profile",
    icon: SVG.ProfileIcon,
    title: "My Profile",
    id: "myProfile",
  },
  {
    to: "/jobs/applied",
    icon: SVG.CircleRightIcon,
    title: "Applied jobs",
    id: "appliedJobs",
  },
  {
    to: "/jobs/saved",
    icon: SVG.SaveIcon,
    title: "Saved Jobs",
    id: "savedJobs",
  },
  {
    to: "/messages",
    icon: SVG.MessageIcon,
    title: "Messages",
    id: "messages",
    count: 2,
  },
]);
const EmployerNavigationOptions = Object.freeze([
  {
    to: "/dashboard",
    icon: SVG.DashboardIcon,
    title: "Dashboard",
    id: "dashboard",
  },
  {
    to: "/manage-jobs",
    icon: SVG.JobsIcon,
    title: "Manage jobs",
    id: "manageJobs",
  },
  {
    to: "/manage-tenders",
    icon: SVG.TendersIcon,
    title: "Manage tenders",
    id: "manageTenders",
  },
  {
    to: "/calender",
    icon: SVG.CalenderIcon,
    title: "Calender",
    id: "calender",
  },
  {
    to: "/messages",
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
      return EmployerNavigationOptions.map((option) => ({
        ...option,
        to: `/employer${option.to}`,
      }));
    case USER_ROLES.jobSeeker:
      return JobSeekerNavigationOptions.map((option) => ({
        ...option,
        to: `/job-seeker${option.to}`,
      }));
    case USER_ROLES.VendorNavigationOptions:
      return VendorNavigationOptions.map((option) => ({
        ...option,
        to: `/vendor${option.to}`,
      }));
    default:
      return [];
  }
};
