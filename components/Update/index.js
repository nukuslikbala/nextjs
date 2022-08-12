import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function Update({ user }) {
  const [phoneInp, setPhoneInp] = useState(user.phone_number);
  const [fnameInp, setFnameInp] = useState(user.first_name);
  const [lnameInp, setLnameInp] = useState(user.last_name);
  const router = useRouter();
  function submit(e) {
    e.preventDefault();
    axios
      .put(`/api/account/${user.id}/edit/`, {
        first_name: fnameInp,
        last_name: lnameInp,
        phone_number: phoneInp[0] === "+" ? phoneInp : `+${phoneInp}`,
        username: user.username === "" ? fnameInp : user.username,
        course: user.course,
      })
      .then(() => {
        router.push(`/admin/tables/${user.course}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <form onSubmit={submit}>
      <div className="relative w-full rounded bg-white">
        <div className="rounded h-full p-12 flex flex-col max-w-580-px mx-auto py-12">
          <p className="mb-8 text-2xl font-bold">Update User</p>
          <input
            className="rounded border-gray-300 p-2 mb-8"
            value={fnameInp}
            type="text"
            placeholder="First name"
            onChange={(e) => {
              setFnameInp(e.target.value);
            }}
          />
          <input
            className="rounded border-gray-300 p-2 mb-8"
            value={lnameInp}
            type="text"
            placeholder="Last name"
            onChange={(e) => {
              setLnameInp(e.target.value);
            }}
          />
          <PhoneInput
            inputStyle={{ padding: "20px 0 20px 48px" }}
            className="mb-8"
            country={"uz"}
            value={phoneInp}
            onChange={(value) => setPhoneInp(value)}
          />
          <input
            className="px-6 py-2 rounded bg-lightBlue-600 text-sm text-white cursor-pointer"
            type={"submit"}
            value="Submit"
          />
        </div>
      </div>
    </form>
  );
}

export default Update;
