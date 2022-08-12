import axios from "axios";
import router from "next/router";
import { useEffect, useState } from "react";
import { default as NumberFormat } from "react-number-format";

export default function ChangePrice({ modalState, users }) {
  const [price, setPrice] = useState("");

  function submit(e) {
    axios
      .put(`/api/account/${users.id}/edit/`, {
        username: users.username === "" ? users.first_name : users.username,
        first_name: users.first_name,
        last_name: users.last_name,
        phone_number: users.phone_number,
        course: users.course,
        oquvchi_narxi: price,
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
          placeholder="Kurs narxi"
          renderText={(value, props) => <div {...props}>{value}</div>}
          onValueChange={(values, sourceInfo) => {
            setPrice(values.value);
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
