import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { default as NumberFormat } from "react-number-format";
import Select from "react-select";

function Payment({ data }) {
  const [courseValue, setCourseValue] = useState({});
  const [studentValue, setStudentValue] = useState({});
  const [courses, setCourses] = useState(null);
  const [students, setStudents] = useState([]);
  const [paymentId, setPaymentId] = useState(null);
  const [paymentInp, setPaymentInp] = useState("");
  const [titleInp, setTitleInp] = useState("");
  const router = useRouter();
  useEffect(() => {
    let newCourse = [];
    data.forEach((el) => {
      newCourse.push({ value: el.id, label: el.name });
    });
    setCourses(newCourse);
  }, [data]);

  useEffect(() => {
    let newStudents = [];
    data.forEach((el) => {
      if (el.id === courseValue.value) {
        el.accounts.forEach((el) => {
          if (
            el.first_name !== "Unknown" &&
            el.last_name !== "Unknown" &&
            el.phone_number !== "Unknown"
          ) {
            newStudents.push({
              value: el.id,
              label: el.first_name + " " + el.last_name,
            });
          }
        });
      }
    });

    setStudents(newStudents);
  }, [data, courseValue]);

  useEffect(() => {
    setPaymentId(studentValue.value);
  }, [studentValue]);
  console.log(paymentId);
  function submit(e) {
    e.preventDefault();
    axios
      .post("/api/payment/", {
        title: titleInp,
        account: paymentId,
        price: paymentInp,
      })
      .then(function (response) {
        router.push(`/admin/tables/${courseValue.value}/`);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return (
    <form onSubmit={submit}>
      <div className="relative w-full rounded">
        <div className="rounded h-full p-12">
          <p className="text-2xl font-semibold">Payment</p>
          <div>
            <Select
              className="my-8"
              onChange={setCourseValue}
              options={courses}
              instanceId
            />
            {students.length > 0 && (
              <Select
                className="my-8"
                options={students}
                onChange={setStudentValue}
                instanceId
              />
            )}

            {paymentId && (
              <>
                <input
                  type="text"
                  placeholder="Title"
                  value={titleInp}
                  onChange={(e) => {
                    setTitleInp(e.target.value);
                  }}
                  className="outline-none rounded border-gray-300 py-1 mr-8"
                />
                <NumberFormat
                  className="foo rounded border-gray-300 py-1"
                  thousandSeparator={true}
                  placeholder="Payment"
                  renderText={(value, props) => <div {...props}>{value}</div>}
                  onValueChange={(values, sourceInfo) => {
                    setPaymentInp(values.value);
                  }}
                />
                <input
                  className="ml-8 cursor-pointer px-6 py-2 rounded bg-lightBlue-600 text-sm text-white"
                  type={"submit"}
                  value="Submit"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default Payment;
