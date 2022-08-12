import React, { useEffect, useMemo, useState } from "react";

import { leave, newUser, warning } from "components/utils/icon";
import Link from "next/link";
import CourseLeave from "components/Course/courseLeave";
import axios from "axios";

export default function HeaderStats({ totall }) {
  const [courseLeave, setCourseLeave] = useState(false);
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    axios
      .get("/api/leaveaccount/")
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("/api/statusapi/")
      .then(function (response) {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const sum = useMemo(() => {
    let s = 0;
    user.forEach((item) => {
      if (item.leave_account > 0) {
        s += item.leave_account;
      }
    });
    return s;
  }, [user]);

  return (
    <>
      {courseLeave && (
        <>
          <div
            className="fixed inset-0 z-90"
            onClick={() => {
              setCourseLeave(false);
            }}
          ></div>
          <div className="fixed top-0 bottom-0 bg-white z-100 right-0 px-6 py-4 shadow-lg text-left overflow-y-scroll min-w-300-px">
            <CourseLeave data={user} />
          </div>
        </>
      )}
      <div className="px-4 md:px-10 mx-auto w-full mt-8">
        <div>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <Link href={"/admin/users/new_users/"}>
                <a className="relative flex flex-col min-w-0 break-words h-full bg-white rounded mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="mb-2 uppercase font-bold text-xs">
                          Yangi o'quvchilar
                        </h5>
                        <span className="font-semibold text-lg text-orange-500">
                          {totall}
                        </span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white bg-orange-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ">
                          <div className="w-5 h-5">{newUser}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <div
                className="cursor-pointer relative flex flex-col min-w-0 break-words h-full bg-white rounded mb-6 xl:mb-0 shadow-lg"
                onClick={() => {
                  setCourseLeave(true);
                }}
              >
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5 className="mb-2 uppercase font-bold text-xs">
                        Chiqib ketkanlar
                      </h5>
                      <span className="font-semibold text-lg text-red-600">
                        {sum}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div className="text-white bg-red-600 p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ">
                        <div className="w-5 h-5">{warning}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full  lg:w-6/12 xl:w-3/12 px-4">
              <Link href={"/admin/users/deleted/"}>
                <a className="relative flex flex-col min-w-0 break-words h-full bg-white rounded mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex items-center flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="mb-2 uppercase font-bold text-xs">
                          Kursni tark etkanlar
                        </h5>
                        <span className="font-semibold text-lg text-red-600">
                          {data.delete_account}
                        </span>
                        <h5 className="mb-2 uppercase text-sm font-bold"></h5>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white bg-red-600 p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ">
                          <div className="w-5 h-5">{leave}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words h-full bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5 className="uppercase font-bold text-xs mb-2">
                        Qorzdorlar summasi
                      </h5>
                      <span className="font-semibold text-lg text-red-600">
                        {data.qarzdorlik_summasi}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div className="text-white bg-red-600 p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ">
                        <i className="fas fa-chart-pie"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
