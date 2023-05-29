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
    icon: SVG.UnSave,
    title: "Saved Jobs",
    id: "savedJobs",
    isDisable: false,
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
    to: "/manage-tenders",
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
    to: "/dashboard",
    isDisable: true,
  },
  {
    to: "/my-profile",
    icon: SVG.ProfileIcon,
    title: "My Profile",
    id: "myProfile",
    isDisable: false,
  },
  {
    to: "/tender/applied",
    icon: SVG.UnSave,
    title: "Applied Tenders",
    id: "appliedTenders",
    isDisable: false,
  },
  {
    to: "/tender/saved",
    icon: SVG.UnSave,
    title: "Saved Tenders",
    id: "savedTenders",
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
    to: "/chat",
  },
]);

export const navigationOptions = (role) => {
  switch (role) {
    case USER_ROLES.employer:
      return EmployerNavigationOptions.filter((item) => !item.isDisable).map(
        (option) => ({
          ...option,
          to: `/employer${option.to}`,
        })
      );
    case USER_ROLES.jobSeeker:
      return JobSeekerNavigationOptions.filter((item) => !item.isDisable).map(
        (option) => ({
          ...option,
          to: `/${USER_ROLES.jobSeeker}${option.to}`,
        })
      );
    case USER_ROLES.vendor:
      return VendorNavigationOptions.map((option) => ({
        ...option,
        to: `/vendor${option.to}`,
      }));
    default:
      return [];
  }
};
