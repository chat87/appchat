import { useContext } from "react";
import { MessageContext } from "../../contexts/MessageContext";

// MessageContainer
export default function Conversations({ card }) {

  const { setName } = useContext(MessageContext);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      <div
        className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer"
        onClick={() => (!card.self ? setName({ card }) : null)}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src="https://i.pinimg.com/736x/97/7e/56/977e568da382e808209b9294e0c0c10a.jpg"
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-lg text-gray-200">{card.username}</p>
            <span className="text-base">
              {card.self ? (
                <>
                  <p>saya</p>
                </>
              ) : (
                <>
                  <p></p>
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </div>
  );
}
