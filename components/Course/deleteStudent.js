import axios from "axios";
import router from "next/router";
import { useEffect, useState } from "react";
import Select from "react-select";

function DeleteStudent({ modalState, id, users }) {
  const [text, setText] = useState("");
  function submit() {
    axios.put(`/api/delete/account/${id}/`, {
      username: users.username === null ? "" : users.username,
      first_name: users.first_name,
      last_name: users.last_name,
      phone_number: users.phone_number,
      course: users.course,
      delete_cause: text,
      delete: true,
    });
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
        <input
          type={"text"}
          className="mb-6 w-48 rounded border-gray-400"
          placeholder="Sababi"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <div className="flex justify-center text-sm">
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

export default DeleteStudent;
