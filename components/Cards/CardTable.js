import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createPopper } from "@popperjs/core";

import { default as NumberFormat } from "react-number-format";
import Link from "next/link";
import History from "components/Payment/history";
import ChangePrice from "components/Payment/changePrice";
import CourseChange from "components/Course/courseChange";
import DeleteStudent from "components/Course/deleteStudent";

export default function CardTable({ color, users }) {
  let lesson_number = parseInt(users.lesson_number / 12 + 1);
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  console.log(users);
  function sum(payments, total_price, start) {
    let s = 0;

    let payment = [];

    payments.forEach((element) => {
      s += element.price;
    });

    for (let i = 1; i <= 10; i++) {
      if (i < start) {
        payment.push({ paid: "-/-", status: "" });
      } else if (total_price <= s) {
        s -= total_price;
        payment.push({ paid: total_price, status: "text-emerald-500" });
      } else if (total_price > s && s >= 0) {
        let a = null;
        if (lesson_number >= i) {
          if (s >= 0 && lesson_number >= i) {
            a = "text-red-600";
          }
        }
        payment.push({ paid: s, status: a });
        s = 0;
      } else {
        payment.push({ paid: 0, status: "" });
      }
    }
    return payment;
  }
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 pl-4 pt-4 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg uppercase " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                {users.name}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto p-4">
          {/* Projects table */}
          <div className="rounded overflow-hidden">
            <table className="items-center w-full p-4 bg-transparent">
              <thead>
                <tr className="bg-blueGray-400 text-white">
                  <th className="align-middle text-center py-3 px-2 text-xs uppercase whitespace-nowrap font-semibold">
                    №
                  </th>
                  <th className="align-middle text-center py-3 px-2 text-xs uppercase whitespace-nowrap font-semibold">
                    Name
                  </th>

                  <th className="align-middle text-center py-3 px-2 text-xs uppercase whitespace-nowrap font-semibold">
                    Phone
                  </th>

                  {month.map((item, i) => {
                    return (
                      <th
                        key={i}
                        className={`align-middle text-center py-3 px-2 text-xs uppercase whitespace-nowrap font-semibold ${
                          item === lesson_number &&
                          "bg-lightBlue-600 text-white"
                        }`}
                      >
                        {item}
                      </th>
                    );
                  })}
                  <th className="align-middle text-center py-3 text-xs uppercase whitespace-nowrap font-semibold px-2">
                    Summa
                  </th>
                  <th className="align-middle text-center py-3 text-xs uppercase whitespace-nowrap font-semibold px-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.account.map((el, i) => {
                  const payments = sum(
                    el.payment,
                    el.oquvchi_narxi,
                    el.start_course
                  );
                  let check = true;
                  if (
                    el.first_name == "Unknown" &&
                    el.last_name == "Unknown" &&
                    el.phone_number == "Unknown"
                  ) {
                    check = false;
                  }

                  return check ? (
                    <tr
                      className={`${i % 2 != 0 && "bg-blueGray-200"}`}
                      key={el.id}
                    >
                      <th className="font-bold align-middle text-xs whitespace-nowrap py-4 px-2 text-center">
                        {i + 1}
                      </th>
                      <td className="align-middle text-xs text-center whitespace-nowrap py-4 px-2">
                        {el.first_name} {el.last_name}
                      </td>
                      <td className="align-middle text-xs text-center whitespace-nowrap py-4 px-2">
                        {el.phone_number}
                      </td>
                      {payments.map((payment, i) => {
                        return (
                          i < 10 && (
                            <Payment
                              paid={payment.paid}
                              status={payment.status}
                              key={i}
                              index={i}
                            />
                          )
                        );
                      })}
                      <td className="align-middle text-xs text-center whitespace-nowrap p-2">
                        <NumberFormat
                          value={el.oquvchi_narxi}
                          className="foo font-bold"
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value, props) => (
                            <div {...props}>{value}</div>
                          )}
                        />
                      </td>
                      <td className="align-middle text-xs text-center whitespace-nowrap cursor-pointer select-none p-2">
                        <DropDown id={el.id} data={el} />
                      </td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

function Payment({ paid, status }) {
  return (
    <td className="align-middle text-xs text-center whitespace-nowrap p-2">
      <div className={`flex items-center justify-center ${status}`}>
        {paid !== "-/-" ? (
          <>
            <i className="fas fa-circle mr-1"></i>
            <NumberFormat
              value={paid}
              className="foo"
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value, props) => <div {...props}>{value}</div>}
            />
          </>
        ) : (
          <p>{paid}</p>
        )}
      </div>
    </td>
  );
}
const DropDown = ({ data, id, priceState, submitState }) => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);

  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const [changePrice, setChangePrice] = useState(false);
  const [changeCourse, setChangeCourse] = useState(false);
  const [deleteStudent, setDeleteStudent] = useState(false);
  return (
    <>
      {deleteStudent && (
        <DeleteStudent modalState={setDeleteStudent} id={id} users={data} />
      )}
      {changePrice && (
        <ChangePrice
          modalState={setChangePrice}
          users={data}
          priceState={priceState}
        />
      )}
      {changeCourse && (
        <CourseChange
          modalState={setChangeCourse}
          submit={submitState}
          id={id}
          users={data}
        />
      )}
      {dropdownPopoverShow && (
        <div
          className="fixed inset-0"
          onClick={() => {
            setDropdownPopoverShow(false);
          }}
        ></div>
      )}
      <div
        className="text-blueGray-500 py-1 px-3"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </div>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base relative z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 border"
        }
      >
        <Link href={`/admin/update/${data.id}`}>
          <a
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
          >
            O'zgartirish
          </a>
        </Link>

        <div
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer"
          }
          onClick={() => {
            setHistoryVisible(true);
            setDropdownPopoverShow(false);
          }}
        >
          To'lovlar
        </div>
        <div
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer"
          }
          onClick={() => {
            setChangePrice(true);
            setDropdownPopoverShow(false);
          }}
        >
          Chegirma
        </div>
        <div
          className={
            "text-sm cursor-pointer py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-emerald-500"
          }
          onClick={() => {
            setChangeCourse(true);
            setDropdownPopoverShow(false);
          }}
        >
          Guruhni almashtirish
        </div>
        <div
          className={
            "text-sm cursor-pointer py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-red-600"
          }
          onClick={() => {
            setDeleteStudent(true);
            setDropdownPopoverShow(false);
          }}
        >
          Guruhdan chiqarish
        </div>
      </div>
      {historyVisible ? (
        <>
          <div
            className="fixed inset-0 z-90"
            onClick={() => {
              setHistoryVisible(false);
            }}
          ></div>
          <div className="fixed top-0 bottom-0 bg-white z-100 right-0 px-6 py-4 shadow-lg text-left overflow-y-scroll min-w-300-px">
            <History id={id} historyState={setHistoryVisible} />
          </div>
        </>
      ) : null}
    </>
  );
};
