import { Login, Logout, Registration } from "../../pages/auth";
import { ManageJobs, MyProfile as EmployerProfile } from "../../pages/employer";
import JobSeekerCriteria from "../../pages/jobSeeker/jobCriteria";
import VendorProfile from "../../pages/vendor/myProfile";
import JobSeekerProfile from "../../pages/jobSeeker/myProfile";
import UpdateProfile from "../../pages/jobSeeker/updateProfile";

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
    name: "jobCriteria",
    path: "/my-profile/job-criteria",
    component: JobSeekerCriteria,
  },
  {
    id: "addProfileInfo",
    name: "addProfileInfo",
    path: "/my-profile/update-profile",
    component: UpdateProfile,
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
];
