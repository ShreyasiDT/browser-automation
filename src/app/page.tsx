"use client";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col">
      <UserButton />
      <OrganizationSwitcher />
    </div>
  );
}
