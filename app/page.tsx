"use client"
import { RedirectType, redirect } from "next/navigation";
import AdminNav from "./AdminNav";
import Map from "./map";

export default function Home() {
  const user: boolean = true;

  if (!user) {
    redirect("/auth/login", RedirectType.push);
  }
  else {
    return (

      <div className="w-full h-full">
        <AdminNav />
        <Map />
      </div>
    )
  }
}