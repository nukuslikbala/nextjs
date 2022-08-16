// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";

import Admin from "layouts/Admin.js";
import { useLoggedInOrRiderect, useUser } from "components/auth";

export default function Dashboard() {
  const isLoggedIn = useLoggedInOrRiderect();
  const user = useUser();
  if (!user) {
    return null;
  }
  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      {/* <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div> */}
    </>
  );
}

Dashboard.layout = Admin;
