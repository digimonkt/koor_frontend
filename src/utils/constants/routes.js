import { Login, Logout, Registration } from "@pages/auth";
import {
  ManageJobs,
  MyProfile as EmployerProfile,
  Dashboard as EmployerDashboard,
  ManageTenders as EmployerManageTenders,
} from "@pages/employer";
import {
  PostJobs,
  JobSearch,
  ApplicantDetails,
  JobDetails,
  ApplyForJob,
} from "@pages/jobs";

import {
  JobCriteria as JobSeekerCriteria,
  MyProfile as JobSeekerProfile,
  UpdateProfile as JobSeekerUpdateProfile,
  AppliedJobs,
  SavedJobs,
} from "@pages/jobSeeker";
import { ChatBox } from "@pages/messages";
import { Resources } from "@pages/resources";
import { PostTender } from "@pages/tenders";
import { VendorMyProfile, VendorDashboard } from "@pages/vendor";

// prefix => `/`
export const ROUTES = [
  {
    id: "logout",
    name: "Logout",
    path: "/logout",
    component: Logout,
  },
  {
    id: "resources",
    name: "Resources",
    path: "/resources",
    component: Resources,
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
  {
    id: "applyJob",
    name: "Apply Job",
    path: "/job/apply/:jobId",
    component: ApplyForJob,
  },
  {
    id: "jobDetails",
    name: "Job Details",
    path: "/jobs/details/:jobId",
    component: JobDetails,
  },
];

// prefix => `/job_seeker`
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
  {
    id: "chat",
    name: "chat",
    path: "/chat",
    component: ChatBox,
  },
];

// prefix => `/vendor`
export const VENDOR_ROUTES = [
  {
    id: "myProfile",
    name: "My Profile",
    path: "/my-profile-2",
    component: VendorMyProfile,
  },
  {
    id: "dashboard",
    name: "Dashboard",
    path: "/dashboard-2",
    component: VendorDashboard,
  },
  {
    id: "vendorsavedJobs",
    name: "vendor saved Jobs",
    path: "/job/saved",
    component: SavedJobs,
  },
  {
    id: "chat",
    name: "chat",
    path: "/chat-2",
    component: ChatBox,
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
    id: "manageTenders",
    name: "Manage Tenders",
    path: "/employer-manage-tenders",
    component: EmployerManageTenders,
  },
  {
    id: "applicantDetails",
    name: "Applicant Detials",
    path: "/manage-jobs/applicant-details",
    component: ApplicantDetails,
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
  {
    id: "postTender",
    name: "Post Tender",
    path: "/tender/post",
    component: PostTender,
  },
  {
    id: "chat",
    name: "chat",
    path: "/chat",
    component: ChatBox,
  },
];
