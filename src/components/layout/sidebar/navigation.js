import { SVG } from "@assets/svg";
import { USER_ROLES } from "@utils/enum";

const JobSeekerNavigationOptions = Object.freeze([
  {
    to: "/my-profile",
    icon: SVG.ProfileIcon,
    title: "My Profile",
    id: "myProfile",
    isDisable: false,
  },
  {
    to: "/jobs/applied",
    icon: SVG.CircleRightIcon,
    title: "Applied jobs",
    id: "appliedJobs",
    isDisable: false,
  },
  {
    to: "/jobs/saved",
    icon: SVG.SaveIcon,
    title: "Saved Jobs",
    id: "savedJobs",
    isDisable: false,
  },
  {
    to: "/messages",
    icon: SVG.MessageIcon,
    title: "Messages",
    id: "messages",
    count: 2,
    isDisable: true,
  },
]);
const EmployerNavigationOptions = Object.freeze([
  {
    to: "/dashboard",
    icon: SVG.DashboardIcon,
    title: "Dashboard",
    id: "dashboard",
    isDisable: false,
  },
  {
    to: "/manage-jobs",
    icon: SVG.JobsIcon,
    title: "Manage jobs",
    id: "manageJobs",
    isDisable: false,
  },
  {
    to: "/employer-manage-tenders",
    icon: SVG.TendersIcon,
    title: "Manage tenders",
    id: "manageTenders",
    isDisable: false,
  },
  {
    to: "/calender",
    icon: SVG.CalenderIcon,
    title: "Calender",
    id: "calender",
    isDisable: true,
  },
  {
    to: "/chat",
    icon: SVG.MessageIcon,
    title: "Messages",
    id: "messages",
    count: 2,
    isDisable: false,
  },
]);

const VendorNavigationOptions = Object.freeze([
  {
    icon: SVG.DashboardIcon,
    title: "Dashboard",
    id: "dashboard",
    to: "/dashboard-2",
  },
  {
    to: "/my-profile-2",
    icon: SVG.ProfileIcon,
    title: "My Profile",
    id: "myProfile",
    isDisable: false,
  },
  {
    to: "/job/saved",
    icon: SVG.SaveIcon,
    title: "Saved Jobs",
    id: "savedJobs",
    isDisable: false,
  },

  {
    icon: SVG.CalenderIcon,
    title: "Calender",
    id: "calender",
    isDisable: true,
  },
  {
    icon: SVG.MessageIcon,
    title: "Messages",
    id: "messages",
    count: 2,
    to: "/chat-2",
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
    case USER_ROLES.vendor:
      return VendorNavigationOptions.map((option) => ({
        ...option,
        to: `/vendor${option.to}`,
      }));
    default:
      return [];
  }
};
