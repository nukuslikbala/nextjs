import axios from "axios";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import ChangePayment from "./changePayment";

function History({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/account/${id}/paymenthistory/`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  if (data === null) {
    return (
      <>
        <p className="mb-8 text-xl font-semibold">History</p>
        <p>Loading....</p>
      </>
    );
  }

  return (
    <>
      <p className="mb-8 text-xl font-semibold">History</p>
      {data.map((item) => (
        <div key={item.id}>
          <HistoryCard user={item} />
        </div>
      ))}
    </>
  );
}

export default History;

function HistoryCard({ user }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {visible && (
        <ChangePayment
          modalState={setVisible}
          user={user}
          user_id={user.account}
        />
      )}
      <div
        className="mb-4 p-6 bg-white rounded shadow-lg border flex justify-between items-center"
        onClick={() => {
          setVisible(true);
        }}
      >
        <div>
          <p className="text-sm font-semibold">
            ID: <span>{user.id}</span>
          </p>
          <p className="text-sm font-medium text-emerald-500 mt-1">
            {user.title}
          </p>
        </div>
        <div className="ml-8">
          <NumberFormat
            prefix="+"
            value={user.price}
            className="foo text-sm font-semibold text-red-600 text-right"
            displayType={"text"}
            thousandSeparator={true}
            renderText={(value, props) => <div {...props}>{value}</div>}
          />
          <p className="text-xs mt-1 text-right">
            {user && user.created_at.slice(0, 10)}
          </p>
        </div>
      </div>
    </>
  );
}
