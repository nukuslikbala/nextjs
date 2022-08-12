import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { leave, warning } from "components/utils/icon";
import CourseLeave from "components/Course/courseLeave";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const router = useRouter();
  const [tableShow, setTableShow] = useState(false);
  const [data, setData] = useState(null);
  const [courseLeave, setCourseLeave] = useState(false);
  const [user, setUser] = useState([]);
  useEffect(() => {
    let isMounted = true;
    axios
      .get("/api/courses/")
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("/api/leaveaccount/")
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link href="/admin/dashboard">
            <a className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
              Sun'iy idrok
            </a>
          </Link>

          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/">
                    <a className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                      Sun'iy idrok
                    </a>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Admin Layout Pages
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link href="/admin/dashboard">
                  <a
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/dashboard") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/dashboard") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    Dashboard
                  </a>
                </Link>
              </li>

              <li>
                <div
                  className="select-none flex items-center group cursor-pointer"
                  onClick={() => {
                    setTableShow(!tableShow);
                  }}
                >
                  <p
                    className={
                      "text-xs cursor-pointer uppercase py-3 font-bold block text-blueGray-700 group-hover:text-blueGray-500"
                    }
                  >
                    <i className="fas fa-users mr-2 text-sm text-blueGray-300"></i>{" "}
                    o'quvchilar
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ml-4 text-blueGray-700  transition duration-500 group-hover:text-blueGray-500 transform ${
                      tableShow && "-rotate-180"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                {tableShow && (
                  <div className="text-xs uppercase font-bold flex flex-col">
                    {data.map((el) => (
                      <Link key={el.id} href={`/admin/tables/${el.id}`}>
                        <a
                          className={`my-2 pl-6 flex items-end ${
                            router.asPath === `/admin/tables/${el.id}/`
                              ? "text-lightBlue-500 hover:text-lightBlue-600"
                              : "text-blueGray-700 hover:text-blueGray-500"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>{" "}
                          <span>{el.name}</span>
                        </a>
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              <li className="items-center">
                <Link href="/admin/courses/">
                  <a
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/courses") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-table mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/courses") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    kurslar
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/payment/totall/">
                  <a
                    className={`text-xs uppercase py-3 font-bold flex items-center group ${
                      router.asPath === `/admin/payment/totall/`
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4  group-hover:text-blueGray-500" ${
                        router.asPath === "/admin/payment/totall/"
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-300 hover:text-blueGray-500"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path
                        fillRule="evenodd"
                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span className="ml-2">To'lovlar Tarixi</span>
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/users/new_users/">
                  <a
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/users/new_users") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-users mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/users/new_users") !==
                        -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    ></i>{" "}
                    yangi o'quvchilar
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/course_end/">
                  <a
                    className={`text-xs uppercase py-3 font-bold flex items-center group ${
                      router.asPath === `/admin/course_end/`
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500"
                    }`}
                  >
                    <div
                      className={`h-5 w-5 group-hover:text-blueGray-500" ${
                        router.asPath === "/admin/course_end/"
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-300 hover:text-blueGray-500"
                      }`}
                    >
                      {leave}
                    </div>

                    <span className="ml-2">tugatilgan guruhlar</span>
                  </a>
                </Link>
              </li>
              <li
                className="items-center cursor-pointer"
                onClick={() => setCourseLeave(true)}
              >
                <div className="text-xs uppercase py-3 font-bold flex items-center">
                  <div className="w-5 h-5 text-blueGray-300">{warning}</div>
                  <span className="ml-2">chiqib ketkanlar</span>
                </div>
              </li>
              <li className="items-center">
                <Link href="/admin/users/deleted/">
                  <a
                    className={`text-xs uppercase py-3 font-bold flex items-center group ${
                      router.asPath === `/admin/users/deleted/`
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 group-hover:text-blueGray-500" ${
                        router.asPath === "/admin/users/deleted/"
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-300 hover:text-blueGray-500"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>

                    <span className="ml-2">kursni tark etkanlar</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

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
    </>
  );
}
