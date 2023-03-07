import { useState } from "react";
import Editor from "./Editor";

interface PageProps {
  searchResult: any[];
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (oldData: any, newData: any) => void;
  names: string[];
}

export default function ManagePage(props: PageProps) {
  const [EditorActive, setEditorActive] = useState(false);
  const [data, setData] = useState<{}>();
  const [uuid, setUUID] = useState("");

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    setUUID(event.currentTarget.value);
    setData(
      props.searchResult.find(
        (entity: any) => entity.id == event.currentTarget.value,
      ),
    );
    setEditorActive(true);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    alert("Delete " + event.currentTarget.value + " ?");
  };

  return (
    <div>
      <input
        type={"text"}
        className={
          "w-64 rounded-lg bg-white text-gray-800 focus:outline-none focus:shadow-outline flex-grow"
        }
        placeholder={"Search..."}
        onChange={props.handleSearch}
      />
      {EditorActive ? (
        <Editor
          data={data}
          id={uuid}
          onSubmit={props.handleSubmit}
          type={typeof data}
          names={props.names}
        />
      ) : null}
      <table className={"border-collapse table-auto w-full text-sm mt-5"}>
        <thead>
          <tr className={""}>
            {props.names.map((key: string) => {
              return (
                <th key={key} className={"font-medium p-4 pl-8"}>
                  {key}
                </th>
              );
            })}
            <th className={"font-medium p-4 pl-1"}></th>
            <th className={"font-medium p-4 pl-1"}></th>
          </tr>
        </thead>
        <tbody className={"rounded-lg"}>
          {props.searchResult.map((entity: typeof props.searchResult[0]) => {
            return (
              <tr key={entity.id} className={"rounded-lg"}>
                {props.names.map((key: string) => {
                  if (typeof entity[key] === "boolean") {
                    return (
                      <td key={key} className={"p-4 pl-8"}>
                        {entity[key] ? "Yes" : "No"}
                      </td>
                    );
                  } else {
                    return (
                      <td key={key} className={"p-4 pl-8"}>
                        {entity[key]}
                      </td>
                    );
                  }
                })}
                <td className={"p-4 pl-1"}>
                  <button
                    className={
                      "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    }
                    value={entity.id}
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                </td>
                <td className={"p-4 pl-1"}>
                  <button
                    className={
                      "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    }
                    value={entity.id}
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
