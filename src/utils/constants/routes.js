import AuthenticatedRouteExample from "../../pages/authenticatedRouteExample";
import PublicRouteExample from "../../pages/publicRouteExample";
import UnauthenticatedRouteExample from "../../pages/unauthenticatedRouteExample";

export const PUBLIC_ROUTE = [
  {
    id: "publicRouteExample",
    path: "/",
    element: PublicRouteExample,
  },
];

export const AUTHENTICATED_ROUTE = [
  {
    id: "authenticatedRouteExample",
    path: "/authenticated",
    element: AuthenticatedRouteExample,
  },
];

export const UNAUTHENTICATED_ROUTE = [
  {
    id: "unauthenticatedRouteExample",
    path: "/unauthenticated",
    element: UnauthenticatedRouteExample,
  },
];
