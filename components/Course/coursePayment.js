import axios from "axios";
import { useState } from "react";
import NumberFormat from "react-number-format";
export default function CoursePayment({ modalState, course }) {
  const [value, setValue] = useState(course.total_price);
  function submit(e) {
    axios
      .put(`/api/courses/${course.id}/edit/`, {
        id: course.id,
        name: course.name,
        total_price: value,
        channel_id: course.channel_id,
        lesson_number: course.lesson_number,
        number_student: course.number_student,
        is_active: course.is_active,
      })
      .then(() => {
        modalState(false);
      });
  }
  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center">
      <div
        className="fixed inset-0 z-100"
        onClick={() => {
          modalState(false);
        }}
      ></div>
      <form
        onSubmit={submit}
        className="bg-white relative z-110 rounded shadow-lg border p-12"
      >
        <p className="text-xl mb-8 text-center">Kursni narxini o'zgartirish</p>
        <NumberFormat
          className="foo rounded border-gray-300 py-3 mb-8 w-72"
          thousandSeparator={true}
          placeholder="Tolov"
          value={value}
          renderText={(value, props) => <div {...props}>{value}</div>}
          onValueChange={(values) => {
            setValue(values.value);
          }}
        />
        <div className="flex justify-end text-sm">
          <input
            className="cursor-pointer bg-lightBlue-500 text-white rounded px-4 py-2"
            type={"submit"}
            value="Qabul qilish"
            onClick={submit}
          />
          <div
            className="ml-3 cursor-pointer bg-red-600 text-white rounded px-4 py-2"
            onClick={() => {
              modalState(false);
            }}
          >
            Bekor qilish
          </div>
        </div>
      </form>
    </div>
  );
}
