import { default as NumberFormat } from "react-number-format";

function CourseArrear({ users }) {
  return (
    <div className="rounded-t mb-0 pt-4 border-0">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full max-w-full flex-grow flex-1">
          <h3 className="font-semibold text-lg ml-4">Qarzdorlar royxati</h3>
        </div>
        <div className="block w-full overflow-x-auto p-4">
          <div className="rounded overflow-hidden">
            <table className="items-center w-full p-4 bg-transparent border-collapse">
              <thead>
                <tr className="bg-blueGray-400 text-white ">
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
                </tr>
              </thead>
              <tbody>
                {users.qarzdorlar?.map((item, i) => {
                  return (
                    <tr
                      className={`${i % 2 != 0 && "bg-blueGray-200"}`}
                      key={item.id}
                    >
                      <th className="font-bold px1 align-middle text-sm whitespace-nowrap p-2 text-center">
                        {i + 1}
                      </th>
                      <td className=" align-middle text-sm text-center whitespace-nowrap p-2">
                        {item.first_name}
                      </td>
                      <td className=" align-middle text-sm text-center whitespace-nowrap p-2">
                        {item.last_name}
                      </td>
                      <td className=" align-middle text-sm text-center whitespace-nowrap p-2">
                        {item.phone_number}
                      </td>
                      <td className=" align-middle text-sm text-center whitespace-nowrap p-2">
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
                      <td className=" align-middle text-sm text-center whitespace-nowrap p-2">
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

export default CourseArrear;
