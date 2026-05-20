import type { Metadata } from "next";
import ShowcaseClient from "./ShowcaseClient";

export const metadata: Metadata = {
  title: "Member screens · 5E47",
  description:
    "A 4×4 grid of the mobile views members move through inside the 5E47 app.",
};

export default function Page() {
  return <ShowcaseClient />;
}
