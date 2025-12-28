import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  // Skip Clerk webhook
  if (req.nextUrl.pathname === "/api/webhooks/clerk") {
    return;
  }

  const session = await auth();

  if (!session.userId) {
    return session.redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Match all routes EXCEPT static files AND webhook
    "/((?!_next|api/webhooks/clerk|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
