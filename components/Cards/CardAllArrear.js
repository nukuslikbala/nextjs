import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { default as NumberFormat } from "react-number-format";

function CourseAllArrear({ users }) {
  const [data, setData] = useState(null);

  const courseName = useCallback(
    (id) => {
      for (let i = 0; i < data?.length; i++) {
        if (data[i]?.id === id) {
          return data[i].name;
        }
      }
    },
    [data]
  );
  useEffect(() => {
    axios
      .get("/api/courses/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [users]);
  return (
    <div className="rounded-t mb-0 pt-4 border-0">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full max-w-full flex-grow flex-1">
          <h3 className="font-semibold text-lg ml-4">
            O'ta qarzdorlar royxati
          </h3>
        </div>
        <div className="block w-full overflow-x-auto p-4">
          <div className="rounded overflow-hidden">
            <table className="items-center w-full p-4 bg-transparent">
              <thead>
                <tr className=" bg-blueGray-400 text-white">
                  <th className="align-middle text-center py-3 text-sm uppercase whitespace-nowrap font-semibold">
                    №
                  </th>
                  <th className="align-middle text-center py-3 text-sm uppercase whitespace-nowrap font-semibold">
                    First name
                  </th>
                  <th className="align-middle text-center py-3 text-sm uppercase whitespace-nowrap font-semibold">
                    Last name
                  </th>
                  <th className="align-middle text-center py-3 text-sm uppercase whitespace-nowrap font-semibold">
                    Phone
                  </th>
                  <th className="align-middle text-center py-3 text-sm uppercase whitespace-nowrap font-semibold">
                    Qarzdorlik
                  </th>
                  <th className="align-middle text-center py-3 text-sm uppercase whitespace-nowrap font-semibold">
                    Kurs narxi
                  </th>
                  <th className="align-middle text-center py-3 text-sm uppercase whitespace-nowrap font-semibold">
                    Kurs
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.ota_qarzdorlar?.map((item, i) => {
                  const course = courseName(item.course);
                  console.log(course);
                  return (
                    <tr
                      className={`${i % 2 != 0 && "bg-blueGray-200"}`}
                      key={item.id}
                    >
                      <th className="font-bold px1 align-middle text-sm whitespace-nowrap py-3 px-2 text-center">
                        {i + 1}
                      </th>
                      <td className=" align-middle text-sm text-center whitespace-nowrap py-3 px-2">
                        {item.first_name}
                      </td>
                      <td className=" align-middle text-sm text-center whitespace-nowrap py-3 px-2">
                        {item.last_name}
                      </td>
                      <td className=" align-middle text-sm text-center whitespace-nowrap py-3 px-2">
                        {item.phone_number}
                      </td>
                      <td className=" align-middle text-sm text-center whitespace-nowrap py-3 px-2">
                        <NumberFormat
                          value={item.qarzi}
                          className="foo text-red-600"
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix="-"
                          renderText={(value, props) => (
                            <div {...props}>{value}</div>
                          )}
                        />
                      </td>
                      <td className=" align-middle text-sm text-center whitespace-nowrap py-3 px-2">
                        <NumberFormat
                          value={item.oquvchi_narxi}
                          className="foo"
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value, props) => (
                            <div {...props}>{value}</div>
                          )}
                        />
                      </td>
                      <td className=" align-middle text-sm text-center whitespace-nowrap py-3 text-lightBlue-500 px-2">
                        <Link href={`/admin/tables/${item.course}/`}>
                          <a>{course}</a>
                        </Link>
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
  );
}

export default CourseAllArrear;
