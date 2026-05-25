import type { Metadata } from "next";
import ShowcaseClient from "./ShowcaseClient";

export const metadata: Metadata = {
  title: "Sam · member & operator screens · 5E47",
  description:
    "Mobile screens showing how Sam, the 5E47 Agent, serves members and operators — concierge, bookings, predictive scarcity, programming, growth, and audit.",
};

export default function Page() {
  return <ShowcaseClient />;
}
