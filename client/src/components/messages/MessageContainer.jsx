
import { useContext, useEffect, useState } from "react";
// import Message from "./Message";
import { BsSend } from "react-icons/bs";
import { MessageContext } from "../../contexts/MessageContext";

export default function MessageContainer({ socket }) {
  const { name } = useContext(MessageContext)
  const [messageSent, setMessageSent] = useState("")
  const [messages, setMessages] = useState([])

  if (!name) {
    return (
      <>
        <div className="md:min-w-[450px] flex flex-col">

          <div className="px-4 py-2 mb-2">

            <h1>masih kosong</h1>
          </div>

        </div>
      </>
    )
  }

  return (
    // header
    <div className="md:min-w-[450px] flex flex-col">
      <div className="bg-slate-500 px-4 py-2 mb-2">
        <span className="label-text">To: </span>{" "}
        <span className="text-gray-900 font-bold">{name}</span>
      </div>
      {/* pesan */}
      <div className="px-4 flex-1 overflow-auto">
        <div className={`chat chat-end`}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://i.pinimg.com/736x/97/7e/56/977e568da382e808209b9294e0c0c10a.jpg"
              />
            </div>
          </div>
          <div className={`chat-bubble text-white bg-blue-500  pb-2`}>
            This isMessage
          </div>
          <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
            20:15
          </div>
        </div>
      </div>
      {/* input pesan */}
      <form className="px-4 my-3" >
        <div className="w-full relative">
          <input
            type="text"
            className="border text-sm rounded-lg block w-full p-2.5  bg-gray-200 border-gray-600 text-white"
            placeholder="Send a message"
          />
          <button
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
          >
            <BsSend />
          </button>
        </div>
      </form>
    </div>
  );
}
