import Conversation from "./Conversation";

export default function Conversations() {
  return (
    <div className="py-2 flex flex-col overflow-auto">
      <Conversation />
      <Conversation />
      <Conversation />

      {/* {conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))} */}
    </div>
  );
}
