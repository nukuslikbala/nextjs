import CoursePayment from "components/Course/coursePayment";
import React, { useState } from "react";
import { default as NumberFormat } from "react-number-format";
import { createPopper } from "@popperjs/core";
import axios from "axios";
import { useRouter } from "next/router";

function CoursesAll({ data }) {
  const [course, setCourse] = useState(data);
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
                      course={item}
                      index={i}
                      key={item.id}
                      courseAll={course}
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

export default CoursesAll;

function ChangePrice({ course, index, courseAll, courseState }) {
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

      <td className="border-t-0 align-middle text-xs text-center whitespace-nowrap cursor-pointer select-none py-3 px-2">
        <DropDown
          course={course}
          courseAll={courseAll}
          courseState={courseState}
        />
      </td>
    </tr>
  );
}

const DropDown = ({ course, courseState, courseAll }) => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();
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

  return (
    <>
      {visible && <CoursePayment course={course} modalState={setVisible} />}
      {dropdownPopoverShow && (
        <div
          className="fixed inset-0"
          onClick={() => {
            setDropdownPopoverShow(false);
          }}
        ></div>
      )}
      <div
        className="text-blueGray-500 py-1"
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
        <div
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={() => {
            setVisible(true);
            setDropdownPopoverShow(false);
          }}
        >
          Kurs narxini ozgartirish
        </div>

        <div
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-red-600 cursor-pointer"
          }
          onClick={() => {
            let newValue = courseAll.filter((el) => el.id !== course.id);
            courseState(newValue);
            axios.put(`/api/courses/${course.id}/edit/`, {
              id: course.id,
              name: course.name,
              total_price: course.total_price,
              channel_id: course.channel_id,
              lesson_number: course.lesson_number,
              number_student: course.number_student,
              is_active: false,
            });

            setDropdownPopoverShow(false);
          }}
        >
          Guruhni to'xtatish
        </div>
      </div>
    </>
  );
};
