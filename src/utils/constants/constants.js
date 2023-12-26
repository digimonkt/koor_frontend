import { USER_ROLES } from "@utils/enum";
import { SVG } from "../../assets/svg";
export const DATE_FORMAT = "MM-DD-YYYY";
export const DATABASE_DATE_FORMAT = "YYYY-MM-DD";
export const YEAR_FORMAT = "YYYY";
export const MONTH_YEAR_FORMAT = "MMMM YYYY";
export const SALARY_MIN = "";
export const SALARY_MAX = "";
export const TESTIMONIAL_MAX_WORD = 450;
export const AD_AFTER_RECORDS = 5;
export const BLACKLIST_REASON_LIST = [
  { label: "Spam", value: "Spam" },
  { label: "Offensive Behavior", value: "Offensive Behavior" },
  { label: "Fake Information", value: "Fake Information" },
  { label: "Malicious activity", value: "Malicious Activity" },
];
export const OTHER_BUTTON = [
  {
    icon: <SVG.Reciept />,
    svg: <SVG.ArrowForward />,
    text: "Find Tender",
    url: "/search/tenders",
    section: "tenders",
  },
  {
    icon: <SVG.ProfileIcon />,
    svg: <SVG.ArrowForward />,
    text: "Find Talent",
    url: "/search/talents",
    section: "talents",
  },
  {
    icon: <SVG.Work />,
    svg: <SVG.ArrowForward />,
    text: "Find Job",
    url: "/search/jobs",
    section: "jobs",
  },
];

export const BOTOM_BAR_NAVBAR = (ROLE) => [
  {
    label:
      ROLE === USER_ROLES.employer
        ? "Talent"
        : ROLE === USER_ROLES.vendor
          ? "Tenders"
          : "Jobs",
    icon:
      ROLE === USER_ROLES.employer ? (
        <SVG.employeUserGroup />
      ) : (
        <SVG.JobsSeekerIcon />
      ),
    address:
      ROLE === USER_ROLES.employer
        ? "search/talents"
        : ROLE === USER_ROLES.vendor
          ? "search/tenders"
          : "job_seeker/job-feed",
  },
  {
    label: ROLE === USER_ROLES.employer ? "My posts" : "Saved",
    icon:
      ROLE === USER_ROLES.employer ? <SVG.myPosts /> : <SVG.JobsSeekerIcon />,
    address:
      ROLE === USER_ROLES.employer
        ? "employer/manage-jobs"
        : ROLE === USER_ROLES.vendor
          ? "vendor/tender/saved"
          : "job_seeker/jobs/saved",
  },
  {
    label: ROLE === USER_ROLES.employer ? "Messages" : "Messages",
    icon: <SVG.MessageIcon />,
    address:
      ROLE === USER_ROLES.employer
        ? "employer/chat"
        : ROLE === USER_ROLES.vendor
          ? "vendor/chat"
          : "job_seeker/chat",
  },

  {
    label: ROLE === USER_ROLES.employer ? "Dashboard" : "Profile",
    icon:
      ROLE === USER_ROLES.employer ? (
        <SVG.employerDashboard />
      ) : (
        <SVG.UserProfile />
      ),
    address:
      ROLE === USER_ROLES.employer
        ? "employer/dashboard"
        : ROLE === USER_ROLES.vendor
          ? "vendor/my-profile"
          : "job_seeker/my-profile",
  },
];

export const TABS_VALUE = {
  tab1: 0,
  tab2: 1,
  tab3: 2,
};
