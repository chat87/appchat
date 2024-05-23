import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";

export default function HomePage({socket}) {
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-teal-600 bg-clip-padding backdrop-filter backdrop-blur-lg ">
          <Sidebar socket={socket} />
          <MessageContainer socket={socket} />
        </div>
      </div>
    </>
  );
}
