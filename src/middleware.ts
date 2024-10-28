import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isTeacherRoute = createRouteMatcher(["/teacher(.*)"]);
const isStudentRoute = createRouteMatcher(["/student(.*)"]);
export default clerkMiddleware(async (auth, req) => {
  // Restrict admin routes to users with specific permissions
  if (isAdminRoute(req)) {
    await auth.protect((has) => {
      return has({ role: "org:admin" });
    });
  }
  if (isTeacherRoute(req)) {
    await auth.protect((has) => {
      return has({ role: "org:teacher" });
    });
  }
  if (isStudentRoute(req)) {
    await auth.protect((has) => {
      return has({ role: "org:student" });
    });
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
