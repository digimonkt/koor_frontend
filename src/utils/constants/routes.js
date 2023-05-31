import { ChatBox } from "@pages/messages";
import Resource from "@pages/resource";
import Home from "@pages/home";
import AboutUs from "../../pages/about";
import { PostTender } from "@pages/tenders"; // need to relocate to employer folder
import { lazy } from "react";
// resources
const Resources = lazy(() =>
  import("@pages/resources").then((module) => ({ default: module.Resources }))
);
// auth
const Logout = lazy(() =>
  import("@pages/auth").then((module) => ({ default: module.Logout }))
);
const Login = lazy(() =>
  import("@pages/auth").then((module) => ({ default: module.Login }))
);
const Registration = lazy(() =>
  import("@pages/auth").then((module) => ({ default: module.Registration }))
);
const ForgotPassword = lazy(() =>
  import("@pages/auth").then((module) => ({ default: module.ForgotPassword }))
);
const VerifyOTP = lazy(() =>
  import("@pages/auth").then((module) => ({ default: module.VerifyOTP }))
);
const ResetPassword = lazy(() =>
  import("@pages/auth").then((module) => ({ default: module.ResetPassword }))
);
const TenderDetails = lazy(() =>
  import("@pages/tenders").then((module) => ({ default: module.TenderDetails }))
);

// notification
const Notification = lazy(() => import("@pages/notification"));

// job Seeker
const JobSeekerProfile = lazy(() =>
  import("@pages/jobSeeker").then((module) => ({
    default: module.MyProfile,
  }))
);
const JobSeekerCriteria = lazy(() =>
  import("@pages/jobSeeker").then((module) => ({
    default: module.JobCriteria,
  }))
);
const JobSeekerUpdateProfile = lazy(() =>
  import("@pages/jobSeeker").then((module) => ({
    default: module.UpdateProfile,
  }))
);
const AppliedJobs = lazy(() =>
  import("@pages/jobSeeker").then((module) => ({
    default: module.AppliedJobs,
  }))
);
const SavedJobs = lazy(() =>
  import("@pages/jobSeeker").then((module) => ({
    default: module.SavedJobs,
  }))
);
const JobSeekerPublicProfile = lazy(() =>
  import("@pages/jobSeeker").then((module) => ({
    default: module.JobSeekerPublicProfile,
  }))
);
// employer
const EmployerPublicProfile = lazy(() =>
  import("@pages/employer").then((module) => ({
    default: module.EmployerPublicProfile,
  }))
);
// employer
const VendorPublicProfile = lazy(() =>
  import("@pages/vendor").then((module) => ({
    default: module.VendorPublicProfile,
  }))
);
const ManageJobs = lazy(() =>
  import("@pages/employer").then((module) => ({
    default: module.ManageJobs,
  }))
);
const EmployerProfile = lazy(() =>
  import("@pages/employer").then((module) => ({
    default: module.MyProfile,
  }))
);
const EmployerDashboard = lazy(() =>
  import("@pages/employer").then((module) => ({
    default: module.Dashboard,
  }))
);
const EmployerManageTenders = lazy(() =>
  import("@pages/employer").then((module) => ({
    default: module.ManageTenders,
  }))
);
// vendor
const VendorMyProfile = lazy(() =>
  import("@pages/vendor").then((module) => ({
    default: module.VendorMyProfile,
  }))
);
const VendorDashboard = lazy(() =>
  import("@pages/vendor").then((module) => ({
    default: module.VendorDashboard,
  }))
);
const VendorSavedTenders = lazy(() =>
  import("@pages/vendor").then((module) => ({
    default: module.VendorSavedTenders,
  }))
);

// jobs
const PostJobs = lazy(() =>
  import("@pages/jobs").then((module) => ({
    default: module.PostJobs,
  }))
);

const ApplicantDetails = lazy(() =>
  import("@pages/jobs").then((module) => ({
    default: module.ApplicantDetails,
  }))
);

const tenderApplicantDetails = lazy(() =>
  import("@pages/tenders").then((module) => ({
    default: module.ApplicantDetails,
  }))
);

const JobDetails = lazy(() =>
  import("@pages/jobs").then((module) => ({
    default: module.JobDetails,
  }))
);
const ApplyForJob = lazy(() =>
  import("@pages/jobs").then((module) => ({
    default: module.ApplyForJob,
  }))
);
const ApplyForTender = lazy(() =>
  import("@pages/tenders").then((module) => ({
    default: module.ApplyForTender,
  }))
);
const AppliedTender = lazy(() =>
  import("@pages/vendor").then((module) => ({
    default: module.AppliedTender,
  }))
);
const Search = lazy(() => import("@pages/search"));
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

  {
    id: "resource",
    name: "Resource",
    path: "/resource",
    component: Resource,
  },

  {
    id: "about-us",
    name: "About Us",
    path: "/about-us",
    component: AboutUs,
  },

  {
    id: "search",
    name: "Search",
    path: "/search/:type",
    component: Search,
  },
  {
    id: "jobDetails",
    name: "Job Details",
    path: "/jobs/details/:jobId",
    component: JobDetails,
  },
  {
    id: "tenderDetails",
    name: "Tender Details",
    path: "/tender/details/:tenderId",
    component: TenderDetails,
  },
  {
    id: "home",
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    id: "browse-tenders",
    name: "Browse Tenders",
    path: "/browse-tenders",
    component: Home,
  },
  {
    id: "job-seeker-public-profile",
    name: "Job Seeker Public Profile",
    path: "/job-seeker/:userId/profile",
    component: JobSeekerPublicProfile,
  },
  {
    id: "employer-public-profile",
    name: "Employer Public Profile",
    path: "/employer/:userId/profile",
    component: EmployerPublicProfile,
  },
  {
    id: "vendor-public-profile",
    name: "Vendor Public Profile",
    path: "/vendor/:userId/profile",
    component: VendorPublicProfile,
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
    path: "/register",
    component: Registration,
  },

  {
    id: "forgot-password",
    name: "Forgot Password",
    path: "/forgot-password",
    component: ForgotPassword,
  },
  {
    id: "verifyOTP",
    name: "Verify OTP",
    path: "/verify-otp",
    component: VerifyOTP,
  },
  {
    id: "resetPassword",
    name: "Reset Password",
    path: "/reset-password",
    component: ResetPassword,
  },
];

//
export const AUTHENTICATED_ROUTES = [
  {
    id: "applyJob",
    name: "Apply Job",
    path: "/job/apply/:jobId",
    component: ApplyForJob,
  },
  {
    id: "applyTender",
    name: "Apply Tender",
    path: "/tender/apply/:tenderId",
    component: ApplyForTender,
  },
  {
    id: "notification",
    name: "Notifications",
    path: "/notification",
    component: Notification,
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
    path: "/my-profile",
    component: VendorMyProfile,
  },
  {
    id: "dashboard",
    name: "Dashboard",
    path: "/dashboard",
    component: VendorDashboard,
  },
  {
    id: "vendorAppliedTender",
    name: "Vendor Applied Tender",
    path: "/tender/applied",
    component: AppliedTender,
  },
  {
    id: "vendorSavedJobs",
    name: "vendor saved Jobs",
    path: "/tender/saved",
    component: VendorSavedTenders,
  },
  {
    id: "chat",
    name: "chat",
    path: "/chat",
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
    path: "/manage-tenders",
    component: EmployerManageTenders,
  },
  {
    id: "applicantDetails",
    name: "Applicant Detials",
    path: "/manage-jobs/:jobId/applicant-details/:applicationId",
    component: ApplicantDetails,
  },
  {
    id: "tenderApplicantDetails",
    name: "Tender Applicant Details",
    path: "/manage-tenders/:Id/applicant-details/:applicationId",
    component: tenderApplicantDetails,
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
