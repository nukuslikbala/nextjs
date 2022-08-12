import React, { useEffect, useState } from "react";

// layout for page

import Admin from "layouts/Admin.js";
import axios from "axios";
import CourseArrear from "components/Cards/CardArrear";
import useAsyncLoader from "components/useAsyncLoader";
import { useLoggedInOrRiderect } from "components/auth";

export default function CurrentArear() {
  const isLoggedIn = useLoggedInOrRiderect();

  const { isLoading, notFound, error, data } = useAsyncLoader({
    url: "/api/statusapi/",
  });

  if (!isLoggedIn) {
    return null;
  }

  if (isLoading) {
    return "Loading";
  }
  if (notFound) {
    return "Not Found";
  }
  if (error) {
    return "ERROR";
  }

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
            <CourseArrear users={data} />
          </div>
        </div>
      </div>
    </>
  );
}

CurrentArear.layout = Admin;
