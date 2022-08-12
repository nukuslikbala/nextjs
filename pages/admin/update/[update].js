import axios from "axios";
import Admin from "layouts/Admin.js";
import { useRouter } from "next/router";
import Update from "components/Update";
import useAsyncLoader from "components/useAsyncLoader";
import { useLoggedInOrRiderect } from "components/auth";

export default function UpdatePage() {
  const router = useRouter();
  const { update } = router.query;
  const isLoggedIn = useLoggedInOrRiderect();

  const { isLoading, notFound, error, data } = useAsyncLoader({
    url: `/api/account/${update}/edit/`,
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
          <Update user={data} />
        </div>
      </div>
    </>
  );
}

UpdatePage.layout = Admin;
