export default function TitleTextOverImage(params: { src: string, text: string }) {
  return (
    <div className={"w3-container"}>
      <img
        title={"Board Game"}
        src={params.src}
        alt="Board Game"
        className=" w-full h-[calc(80vh-10rem)] object-cover rounded-t-lg pointer-events-none"
      />
      <div className={"w3-centered text-6xl"}>{params.text}</div>
    </div>
  );
}
