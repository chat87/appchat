export default function Message() {
  return (
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
  );
}
