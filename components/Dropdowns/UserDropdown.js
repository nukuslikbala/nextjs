import axios from "axios";
import { useSetUser, useUser } from "components/auth";
import router from "next/router";
import { useState } from "react";

const UserDropdown = () => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const user = useUser();
  const setUser = useSetUser();
  const openDropdownPopover = () => {
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
    <>
      {dropdownPopoverShow && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeDropdownPopover}
        ></div>
      )}
      <div className="relative">
        <div
          className="text-blueGray-500 select-none block cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            dropdownPopoverShow
              ? closeDropdownPopover()
              : openDropdownPopover();
          }}
        >
          <div className="items-center flex">
            <span className="w-12 h-12 text-sm text-white bg-purple-500 inline-flex items-center justify-center rounded-full">
              {`${user?.first_name[0]}${user?.last_name[0]}`}
            </span>
          </div>
        </div>
        <div
          className={`bg-white text-base absolute right-0 z-50 m-4 py-2  text-left rounded shadow-lg min-w-48 ${
            dropdownPopoverShow ? "block " : "hidden"
          }`}
        >
          <span className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
            {user?.first_name + " " + user?.last_name}
          </span>

          <span className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
            @{user?.username}
          </span>

          <div className="h-0 my-1 border border-solid border-blueGray-100" />
          <span
            className="text-sm cursor-pointer inline-block py-2 px-4 font-semibold w-full whitespace-nowrap bg-transparent text-red-600"
            onClick={() => {
              axios
                .post("/api/logout/", {
                  username: user.username,
                })
                .then(function (response) {
                  setUser(null);
                  router.replace(router.query.next ?? "/");
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}
          >
            Log out
          </span>
        </div>
      </div>
    </>
  );
};

export default UserDropdown;
