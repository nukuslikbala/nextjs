/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect } from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import router from "next/router";

export default function Index() {
  useEffect(() => {
    router.push("/login/");
  }, []);
  return (
    <>
      <IndexNavbar fixed />
      <section className="pt-16 items-center flex h-screen justify-end">
        <img className="h-full" src="/img/pattern_nextjs.png" alt="..." />
      </section>
    </>
  );
}
