import {useEffect, useState} from "react";

export interface EditorProps {
  onSubmit : (olddata : any,newdata : any) => void;
  id : string;
  data : any;
  type : any;
  names: string[];
}

export default function Editor(props : EditorProps) {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(props.data);
  },[props.data])


  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    // console.log(name, value)
    setData({...data, [name]: value});
  }

  const handleCheckBox = (event : React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = event.target;
    // console.log(name, checked)
    setData({...data, [name]: checked});
  }

  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(props.data,data);
  }

  return (
    <div className={""}>

      <form className={"flex flex-col align-center"} onSubmit={handleSubmit}>
        {
          Object.entries(data).map((prop : typeof props.type) => {
            if (typeof prop[1] === "boolean") {
              return (
                <div key={prop[0]} className={"my-5 space-x-5"}>
                  <label>{prop[0]}</label>
                  <input className={"dark:bg-white"} type={"checkbox"} name={prop[0]} checked={prop[1]} onChange={handleCheckBox}/>
                </div>
              )
            }else if (typeof prop[1] === "string") {
              return (
                <div key={prop[0]} className={"flex flex-col my-5"}>
                  <label>{prop[0]}</label>
                  <input className={"w-64 dark:bg-white"} type={"text"} name={prop[0]} value={prop[1]} onChange={handleChange}/>
                </div>
              )
            }else if (typeof prop[1] === "number") {
              return (
                <div key={prop[0]} className={"flex flex-col my-5"}>
                  <label>{prop[0]}</label>
                  <input className={"w-64 dark:bg-white"} type={"number"} name={prop[0]} value={prop[1]} onChange={handleChange}/>
                </div>
              )
            }
          })
          }

      <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>Submit</button>
      </form>
    </div>
  )
}