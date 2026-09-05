import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
// Session-task routes are reached while the session is still `pending`, which
// `auth.protect()` treats as signed out — that would bounce the user back to
// sign-in and the task could never be completed. These routes guard themselves.
const isSessionTaskRoute = createRouteMatcher(["/choose-organization"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request) && !isSessionTaskRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
