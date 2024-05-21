import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";

export default function HomePage() {
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-primary bg-clip-padding backdrop-filter backdrop-blur-lg ">
          <Sidebar />
          <MessageContainer />
        </div>
      </div>
    </>
  );
}
