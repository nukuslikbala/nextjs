import React from "react";
import Link from "next/link";

import { useUser } from "components/auth";
import UserDropdown from "components/Dropdowns/UserDropdown";

export default function Navbar(props) {
  const user = useUser();
  console.log(user);
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between items-center">
            <Link href="/">
              <a className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase">
                sun'iy idrok
              </a>
            </Link>

            <div className="flex items-center">
              <Link href={"/admin/dashboard/"}>
                <a className="mr-4 uppercase font-bold">dashboard</a>
              </Link>
              {user ? (
                <UserDropdown />
              ) : (
                <Link href={"/login"}>
                  <a className="uppercase font-bold">login</a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
