import { Login, Registration } from "../../pages/auth";
import EmployerProfile from "../../pages/employer/myProfile";
import JobSeekerProfile from "../../pages/jobSeeker/myProfile";
import VendorProfile from "../../pages/vendor/myProfile";

// prefix => `/`
export const ROUTES = [
  {
    id: "login",
    name: "login",
    path: "/login",
    component: Login,
  },
  {
    id: "register",
    name: "register",
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
];
