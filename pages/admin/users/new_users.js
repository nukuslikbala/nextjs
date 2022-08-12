import React, { useEffect, useState } from "react";

// layout for page

import Admin from "layouts/Admin.js";
import NullTable from "components/Cards/NullTable";
import useAsyncLoader from "components/useAsyncLoader";
import { useLoggedInOrRiderect } from "components/auth";

export default function NewStudents() {
  const isLoggedIn = useLoggedInOrRiderect();

  const { isLoading, notFound, error, data } = useAsyncLoader({
    url: "/api/unknownaccount/",
  });

  if (!isLoggedIn) {
    return null;
  }

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
          {data.map(
            (el) =>
              el.accounts.length > 0 && <NullTable key={el.id} table={el} />
          )}
        </div>
      </div>
    </>
  );
}

NewStudents.layout = Admin;
