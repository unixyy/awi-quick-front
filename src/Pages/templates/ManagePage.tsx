
interface PageProps {
  searchResult: any[];
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface volunteer {
  username: string;
  email: string;
  isAdmin: boolean;
  id: string;
}

export default function ManagePage(props : PageProps){
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
      <div>
        {props.searchResult.map((entity : volunteer) => {
          return (
            <div className={"border"}>
              <div>{entity.id}</div>
              <div>{entity.email}</div>
              <div>{entity.username}</div>
              <div>{entity.isAdmin}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}