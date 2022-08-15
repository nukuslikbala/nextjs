import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { default as NumberFormat } from "react-number-format";
import Select from "react-select";

function DeleteTable({ table }) {
  return (
    <>
      <div className="relative bg-white flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ">
        <div className="rounded-t mb-0 pt-4 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg ml-4">{table.name}</h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto p-4">
          <div className="rounded overflow-hidden">
            <div className="rounded overflow-hidden">
              <table className="w-full p-4 bg-transparent">
                <thead>
                  <tr className="bg-blueGray-400 text-white">
                    <th className="text-center py-3 text-sm uppercase font-semibold">
                      №
                    </th>
                    <th className="text-center py-3 text-sm uppercase font-semibold">
                      First name
                    </th>
                    <th className="text-center py-3 text-sm uppercase font-semibold">
                      Last name
                    </th>
                    <th className="text-center py-3 text-sm uppercase font-semibold">
                      Phone
                    </th>
                    <th className="text-center py-3 text-sm uppercase font-semibold">
                      Kurs narxi
                    </th>
                    <th className="text-center py-3 text-sm uppercase font-semibold">
                      Tolov qilingan
                    </th>
                    <th className="text-center py-3 text-sm uppercase font-semibold">
                      Qarzdorlik
                    </th>
                    <th className="text-center py-3 text-sm uppercase font-semibold">
                      Sabab
                    </th>
                    <th className="text-center py-3 text-sm uppercase font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {table.accounts.map((item, i) => {
                    return (
                      <tr
                        className={`${i % 2 != 0 && "bg-blueGray-200"}`}
                        key={item.id}
                      >
                        <th className="font-bold text-sm text-center px-2 py-3">
                          {i + 1}
                        </th>
                        <td className="text-sm text-center px-2 py-3">
                          {item.first_name}
                        </td>
                        <td className="text-sm text-center px-2 py-3">
                          {item.last_name}
                        </td>
                        <td className="text-sm text-center px-2 py-3">
                          {item.phone_number}
                        </td>
                        <td className="text-sm text-center px-2 py-3">
                          {item.oquvchi_narxi}
                        </td>
                        <td className="text-sm text-center px-2 py-3">
                          <NumberFormat
                            value={
                              !item.umumiy_summasi ? 0 : item.umumiy_summasi
                            }
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            renderText={(value, props) => (
                              <div {...props}>{value}</div>
                            )}
                          />
                        </td>
                        <td
                          className={`text-sm ${
                            item.qarzi > 0 ? "text-emerald-500" : "text-red-600"
                          } text-center px-2 py-3`}
                        >
                          <NumberFormat
                            value={item.qarzi}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.qarzi > 0 && "+"}
                            renderText={(value, props) => (
                              <div {...props}>{value}</div>
                            )}
                          />
                        </td>
                        <td className="text-sm text-center px-2 py-3">
                          {!item.delete_cause ? "Not given" : item.delete_cause}
                        </td>
                        <td className="text-sm text-center cursor-pointer px-2 py-3">
                          <DropDown users={item} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteTable;

function DropDown({ users }) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [courseVisible, setCourseVisible] = useState(false);
  const [paymentVisible, setPaymentVisible] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [course, setCourse] = useState(null);
  const [payment, setPayment] = useState({
    title: "",
    price: "",
    account: users.id,
  });

  useEffect(() => {
    axios
      .get(`/api/swapping/account/${users.id}`)
      .then(function (response) {
        setCourseData(response.data);

        let newCourse = [];
        response.data.forEach((el) => {
          newCourse.push({ value: el.id, label: el.name });
        });
        setCourseData(newCourse);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [users.id]);
  function submitCourse() {
    axios.put(`/api/swapping/account/${users.id}`, {
      username: users.username === null ? "" : users.username,
      first_name: users.first_name,
      last_name: users.last_name,
      phone_number: users.phone_number,
      course: course.value,
    });
    axios.put(`/api/delete/account/${users.id}/`, {
      username: users.username === null ? "" : users.username,
      first_name: users.first_name,
      last_name: users.last_name,
      phone_number: users.phone_number,
      course: users.course,
      delete_cause: users.delete_cause,
      delete: false,
    });
    setCourseVisible(false);
    router.reload();
  }
  const submitPayment = useCallback(() => {
    axios.post(`/api/payment/${users.id}/deleteaccount/`, payment);
    setPayment(null);
  }, [payment]);

  return (
    <>
      <div
        onClick={() => {
          setVisible(true);
        }}
      >
        <i className="fas fa-ellipsis-v text-gray-500"></i>
      </div>
      {courseVisible && (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
          <div
            className="fixed inset-0"
            onClick={() => {
              setCourseVisible(false);
            }}
          ></div>
          <form
            onSubmit={submitCourse}
            className="bg-white relative z-110 rounded shadow-lg border p-12"
          >
            <p className="text-xl mb-8 text-center">Kursga qaytarish</p>
            <Select
              className="my-8 text-left w-60"
              onChange={setCourse}
              options={courseData}
              instanceId
            />
            <div className="flex justify-end">
              <input
                className="cursor-pointer bg-lightBlue-500 text-white rounded px-4 py-2"
                type={"submit"}
                value="Qabul qilish"
                onClick={submitCourse}
              />
              <div
                className="ml-3 cursor-pointer bg-red-600 text-white rounded px-4 py-2"
                onClick={() => {
                  setCourseVisible(false);
                }}
              >
                Bekor qilish
              </div>
            </div>
          </form>
        </div>
      )}
      {paymentVisible && (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
          <div
            className="fixed inset-0"
            onClick={() => {
              setPaymentVisible(false);
            }}
          ></div>
          <form
            onSubmit={submitPayment}
            className="bg-white relative z-110 flex flex-col rounded shadow-lg border p-12"
          >
            <p className="text-xl mb-8 text-center">Tolov qilish</p>
            <input
              type={"text"}
              placeholder="Title"
              className="rounded border-gray-300 mb-4"
              onChange={(e) => {
                setPayment((prevValue) => {
                  return { ...prevValue, title: e.target.value };
                });
              }}
            />
            <NumberFormat
              className="foo rounded border-gray-300 py-2 w-60"
              thousandSeparator={true}
              placeholder="Tolov"
              renderText={(value, props) => <div {...props}>{value}</div>}
              onValueChange={(values, sourceInfo) => {
                setPayment((prevValue) => {
                  return { ...prevValue, price: values.value };
                });
              }}
            />
            <div className="flex justify-center mt-6">
              <input
                className="cursor-pointer bg-lightBlue-500 text-white rounded px-4 py-2"
                type={"submit"}
                value="Qabul qilish"
                onClick={submitPayment}
              />
              <div
                className="ml-3 cursor-pointer bg-red-600 text-white rounded px-4 py-2"
                onClick={() => {
                  setPaymentVisible(false);
                }}
              >
                Bekor qilish
              </div>
            </div>
          </form>
        </div>
      )}
      {visible && (
        <>
          <div
            className="fixed inset-0"
            onClick={() => {
              setVisible(false);
            }}
          ></div>
          <div className="absolute p-6 mt-2 right-16 bg-white border text-right rounded shadow-sm">
            <div
              className="cursor-pointer"
              onClick={() => {
                setCourseVisible(true);
                setVisible(false);
              }}
            >
              Kursga qaytarish
            </div>
            <div
              className="cursor-pointer mt-3"
              onClick={() => {
                setPaymentVisible(true);
                setVisible(false);
              }}
            >
              Tolov qilish
            </div>
          </div>
        </>
      )}
    </>
  );
}
