import axios from "axios";
import router from "next/router";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function CourseChange({ modalState, users, id }) {
  const [courseData, setCourseData] = useState(null);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/swapping/account/${id}`)
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
  }, [id]);
  function submit() {
    axios.put(`/api/swapping/account/${id}`, {
      username: users.username === null ? "" : users.username,
      first_name: users.first_name,
      last_name: users.last_name,
      phone_number: users.phone_number,
      course: course.value,
    });
    modalState(false);
    router.reload();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
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
        <p className="text-xl mb-8 text-center">Guruh almashtirish</p>
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
