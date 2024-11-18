import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * Bug: webhoo stoped to work because api/webhook was not set a s public: https://clerk.com/docs/integrations/webhooks/sync-data#set-the-webhook-route-as-public-in-your-middleware
 */
const isPublicRoute = createRouteMatcher([
  "/",
  "/login(.*)", 
  "/register(.*)", 
  "/onboarding(.*)",
  "/test(.*)",  
  "/api/webhooks(.*)",  
])

export default clerkMiddleware(async (auth, req) => {
  console.log("runnig middleware")
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  const isPrivateRoute = !isPublicRoute(req); 
  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && isPrivateRoute) {
    console.log("about to redirect to sign in")
    console.log({userId})
    console.log({isPrivateRoute})
    console.log("url: "+req.url)
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Catch users who do not have `onboardingComplete: true` in their publicMetadata
  // Redirect them to the /onboading route to complete onboarding
  console.log({sessionClaims})  
  if (userId && !sessionClaims?.metadata?.onboardingComplete && req.nextUrl.pathname !== "/onboarding") {
    console.log("user not onboarded, redirecting to onboarding page")
    const onboardingUrl = new URL("/onboarding", req.url);
    return NextResponse.redirect(onboardingUrl);
  }

  console.log(req.url)
  console.log({userId})
  // If the user is logged in and the route is protected, let them view.
  /*if (userId && isPrivateRoute) {
    return NextResponse.next();
  }*/
  //return NextResponse.next();

});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ],
};