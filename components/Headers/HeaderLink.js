import axios from "axios";
import { payment } from "components/utils/icon";
import Link from "next/link";
import { useEffect, useState } from "react";

function HeaderLink() {
  const [data, setData] = useState({});
  useEffect(() => {
    let isMounted = true;
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
  return (
    <div className="px-4 md:px-10 mx-auto w-full">
      <div>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <Link href={"/admin/payment/"}>
              <a className="relative flex flex-col min-w-0 break-words bg-white rounded h-full mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5 className="uppercase font-bold text-sm">
                        Tolov qilish
                      </h5>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div className="text-white bg-emerald-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ">
                        <div className="w-5 h-5">{payment}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </div>
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="uppercase font-bold text-xs mb-2">
                      O'quvchilar soni
                    </h5>
                    <span className="font-semibold text-lg text-lightBlue-500">
                      {data.oquvchi_soni}
                    </span>
                  </div>
                  <div className="relative w-auto pl-4 flex-initial">
                    <div className="text-white bg-lightBlue-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ">
                      <i className="far fa-chart-bar"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <Link href={"/admin/users/current_arrear/"}>
              <a className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5 className="uppercase font-bold text-xs mb-2">
                        Qarzdorlar
                      </h5>
                      <span className="font-semibold text-lg text-red-600">
                        {data.qarzdorlar?.length}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div className="text-white bg-red-600 p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ">
                        <i className="fas fa-users"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </div>

          <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
            <Link href={"/admin/users/all_arrear/"}>
              <a className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                  <div className="flex items-center flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                      <h5 className="mb-2 uppercase font-bold text-xs">
                        O'ta qarzdorlar
                      </h5>
                      <span className="font-semibold text-lg text-red-600">
                        {data.ota_qarzdorlar?.length}
                      </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                      <div className="text-white bg-red-600 p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ">
                        <i className="fas fa-users"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderLink;
