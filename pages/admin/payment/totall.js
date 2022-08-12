import React from "react";

import Admin from "layouts/Admin.js";

import useAsyncLoader from "components/useAsyncLoader";
import { useLoggedInOrRiderect } from "components/auth";
import TotallPayments from "components/Cards/TotallPayments";

export default function HistoryPage() {
  const isLoggedIn = useLoggedInOrRiderect();

  const { isLoading, notFound, error, data } = useAsyncLoader({
    url: "/api/generalpaymenthistory/",
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
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
            <TotallPayments payments={data} />
          </div>
        </div>
      </div>
    </>
  );
}

HistoryPage.layout = Admin;
