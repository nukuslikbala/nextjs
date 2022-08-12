import React, { useEffect, useState } from "react";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats";
import HeaderLink from "components/Headers/HeaderLink";
import { useRouter } from "next/router";
import axios from "axios";

export default function Admin({ children }) {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  let s = 0;
  const [count, setCount] = useState(0);
  useEffect(() => {
    axios.get("/api/unknownaccount/").then((response) => {
      setUsers(response.data);
    });
  }, []);
  useEffect(() => {
    for (let i = 0; i < users.length; i++) {
      s += users[i].accounts.length;
      setCount(s);
    }
  }, [users]);
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
          <HeaderLink />
          {router.asPath === "/admin/dashboard/" && (
            <HeaderStats users={users} totall={count} />
          )}
        </div>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">{children}</div>
      </div>
    </>
  );
}
