import { USER_ROLES } from "../enum";
import AuthorizedRouteComponent from "./authenticated";
import RoleRouteComponent from "./roleAuthenticated";
import PublicRouteComponent from "./public";
import UnauthorizedRouteComponent from "./unauthenticated";

export const PublicRoute = PublicRouteComponent;
export const UnauthorizedRoute = UnauthorizedRouteComponent;

// authorized routes
export const AuthorizedRoute = AuthorizedRouteComponent;

export const EmployerRoute = RoleRouteComponent(USER_ROLES.employer);
export const JobSeekerRoute = RoleRouteComponent(USER_ROLES.jobSeeker);
export const VendorRoute = RoleRouteComponent(USER_ROLES.vendor);
