import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request) {

  const session = await auth.api.getSession({
    query: {
      disableCookieCache: true,
    },
    headers: await headers(),
  });

  // session na thakle redirect
  if (!session || !session.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // session thakle continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/rooms/:id", "/addRooms","/myListings","/myBooking","/updateRoom/:id"],
};