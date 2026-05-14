import { cookies } from "next/headers";
import { users, userById } from "./data";
import type { Role, User } from "./types";

// Demo auth: a signed cookie holds the active user id. In production this
// is fronted by Clerk/Auth0 sessions; the surface area used by the app is
// identical (getCurrentUser, setActiveUser, signOut).

const COOKIE = "5e47_uid";

export async function getCurrentUser(): Promise<User | null> {
  const store = await cookies();
  const uid = store.get(COOKIE)?.value;
  if (!uid) return null;
  return userById(uid) ?? null;
}

export async function setActiveUser(userId: string) {
  const store = await cookies();
  store.set(COOKIE, userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function signOut() {
  const store = await cookies();
  store.delete(COOKIE);
}

export function listDemoUsers(role?: Role) {
  return role ? users.filter((u) => u.role === role) : users;
}
