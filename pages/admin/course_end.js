import Admin from "layouts/Admin.js";
import useAsyncLoader from "components/useAsyncLoader";
import { useLoggedInOrRiderect } from "components/auth";
import EndCourse from "components/Cards/CardCourseEnd";

export default function CourseEnd() {
  const isLoggedIn = useLoggedInOrRiderect();

  const { isLoading, notFound, error, data } = useAsyncLoader({
    url: "/api/stoppedcourse/",
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
            <EndCourse course={data} />
          </div>
        </div>
      </div>
    </>
  );
}

CourseEnd.layout = Admin;
