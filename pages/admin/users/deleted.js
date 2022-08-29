// layout for page

import Admin from "layouts/Admin.js";

import DeleteTable from "components/Cards/DeleteTable";
import useAsyncLoader from "components/useAsyncLoader";
import { useLoggedInOrRiderect } from "components/auth";

export default function Delete() {
  const isLoggedIn = useLoggedInOrRiderect();

  const { isLoading, notFound, error, data } = useAsyncLoader({
    url: "/api/deleteaccountlist/",
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
          {data.map((el) => (
            <DeleteTable key={el.id} table={el} />
          ))}
        </div>
      </div>
    </>
  );
}

Delete.layout = Admin;
