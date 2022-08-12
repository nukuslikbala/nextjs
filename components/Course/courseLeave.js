import Link from "next/link";

function CourseLeave({ data }) {
  if (data === null) {
    return (
      <>
        <p className="mb-8 text-xl font-semibold">Course Info</p>
        <p>Loading....</p>
      </>
    );
  }

  return (
    <>
      <p className="mb-8 text-xl font-semibold">Kurs haqida</p>
      {data.map(
        (item) =>
          item.leave_account > 0 && (
            <Link href={`/admin/tables/${item.id}/`} key={item.id}>
              <a className="mb-4 p-6 bg-white rounded shadow-lg border flex justify-between items-center">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm font-semibold text-red-600">
                  {item.leave_account}
                </p>
              </a>
            </Link>
          )
      )}
    </>
  );
}

export default CourseLeave;
