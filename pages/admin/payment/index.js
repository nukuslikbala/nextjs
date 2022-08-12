import React from "react";

import Admin from "layouts/Admin.js";
import Payment from "components/Payment";
import useAsyncLoader from "components/useAsyncLoader";
import { useLoggedInOrRiderect } from "components/auth";

export default function PaymentPage() {
  const isLoggedIn = useLoggedInOrRiderect();

  const { isLoading, notFound, error, data } = useAsyncLoader({
    url: "/api/payment/",
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
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <Payment data={data} />
          </div>
        </div>
      </div>
    </>
  );
}

PaymentPage.layout = Admin;
