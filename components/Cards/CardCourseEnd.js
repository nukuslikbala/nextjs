import React, { useEffect, useState } from "react";
import { default as NumberFormat } from "react-number-format";
import axios from "axios";
import { useRouter } from "next/router";

function EndCourse() {
  const [course, setCourse] = useState(null);
  useEffect(() => {
    let isMounted = true;
    axios
      .get("/api/stoppedcourse/")
      .then(function (response) {
        setCourse(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="rounded-t mb-0 pt-4 border-0">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full max-w-full flex-grow flex-1">
          <h3 className="font-semibold text-lg ml-4">Kurslar royxati</h3>
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
                    kurs
                  </th>
                  <th className="align-middle text-center py-3 text-sm uppercase whitespace-nowrap font-semibold">
                    dars
                  </th>
                  <th className="align-middle text-center py-3 text-sm uppercase whitespace-nowrap font-semibold">
                    o'quvchilar soni
                  </th>
                  <th className="align-middle text-center py-3 text-sm uppercase whitespace-nowrap font-semibold">
                    kurs narxi
                  </th>
                  <th className="align-middle text-center py-3 text-sm uppercase whitespace-nowrap font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {course?.map((item, i) => {
                  return (
                    <ChangePrice
                      courseAll={course}
                      course={item}
                      index={i}
                      key={item.id}
                      courseState={setCourse}
                    />
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

export default EndCourse;

function ChangePrice({ course, index, courseState, courseAll }) {
  const router = useRouter();
  return (
    <tr className={`${index % 2 != 0 && "bg-blueGray-200"}`} key={course.id}>
      <th className="font-bold px1 align-middle text-sm whitespace-nowrap py-3 px-2 text-center">
        {index + 1}
      </th>
      <td className="align-middle text-sm text-center whitespace-nowrap py-3 px-2">
        {course.name}
      </td>
      <td className="align-middle text-sm text-center whitespace-nowrap py-3 px-2">
        {course.lesson_number}
      </td>
      <td className="align-middle text-sm text-center whitespace-nowrap py-3 px-2">
        {course.number_student}
      </td>

      <td className=" align-middle text-sm text-center whitespace-nowrap py-3 px-2">
        <NumberFormat
          value={course.total_price}
          className="foo"
          displayType={"text"}
          thousandSeparator={true}
          renderText={(value, props) => <div {...props}>{value}</div>}
        />
      </td>

      <td
        className="border-t-0 uppercase underline font-semibold text-lightBlue-500 align-middle text-xs text-center whitespace-nowrap cursor-pointer select-none py-3 px-2"
        onClick={() => {
          if (course.lesson_number >= 120) {
            return;
          }
          let newValue = courseAll.filter((el) => el.id !== course.id);
          courseState(newValue);
          axios.put(`/api/courses/${course.id}/edit/`, {
            id: course.id,
            name: course.name,
            total_price: course.total_price,
            channel_id: course.channel_id,
            lesson_number: course.lesson_number,
            number_student: course.number_student,
            is_active: true,
          });
        }}
      >
        qayta tiklash
      </td>
    </tr>
  );
}
