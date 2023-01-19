import { Login, Logout, Registration } from "../../pages/auth";
import {
  ManageJobs,
  MyProfile as EmployerProfile,
  Dashboard as EmployerDashboard,
} from "../../pages/employer";
import JobSearch from "../../pages/jobSearch";
import { PostJobs } from "../../pages/jobs";
import {
  JobCriteria as JobSeekerCriteria,
  MyProfile as JobSeekerProfile,
  UpdateProfile as JobSeekerUpdateProfile,
  AppliedJobs,
  SavedJobs,
} from "../../pages/jobSeeker";
import VendorProfile from "../../pages/vendor/myProfile";

// prefix => `/`
export const ROUTES = [
  {
    id: "logout",
    name: "Logout",
    path: "/logout",
    component: Logout,
  },
];

// prefix => `/`
export const UNAUTHENTICATED_ROUTES = [
  {
    id: "login",
    name: "Login",
    path: "/login",
    component: Login,
  },
  {
    id: "register",
    name: "Register",
    path: "/",
    component: Registration,
  },
];

//
export const AUTHENTICATED_ROUTES = [
  {
    id: "jobSearch",
    name: "jobSearch",
    path: "/job-search",
    component: JobSearch,
  },
];

// prefix => `/job-seeker`
export const JOB_SEEKER_ROUTES = [
  {
    id: "myProfile",
    name: "My Profile",
    path: "/my-profile",
    component: JobSeekerProfile,
  },
  {
    id: "jobCriteria",
    name: "Job Criteria",
    path: "/my-profile/job-criteria",
    component: JobSeekerCriteria,
  },
  {
    id: "addProfileInfo",
    name: "Add Profile Info",
    path: "/my-profile/update-profile",
    component: JobSeekerUpdateProfile,
  },
  {
    id: "appliedJobs",
    name: "Applied Jobs",
    path: "/jobs/applied",
    component: AppliedJobs,
  },
  {
    id: "savedJobs",
    name: "Saved Jobs",
    path: "/jobs/saved",
    component: SavedJobs,
  },
];

// prefix => `/vendor`
export const VENDOR_ROUTES = [
  {
    id: "myProfile",
    name: "My Profile",
    path: "/my-profile",
    component: VendorProfile,
  },
];

// prefix => `/employer`
export const EMPLOYER_ROUTES = [
  {
    id: "myProfile",
    name: "My Profile",
    path: "/my-profile",
    component: EmployerProfile,
  },
  {
    id: "manageJobs",
    name: "Manage Jobs",
    path: "/manage-jobs",
    component: ManageJobs,
  },
  {
    id: "dashboard",
    name: "Dashboard",
    path: "/dashboard",
    component: EmployerDashboard,
  },
  {
    id: "postJobs",
    name: "Post Jobs",
    path: "/jobs/post",
    component: PostJobs,
  },
];
