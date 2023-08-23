import Message from "@/app/interfaces/message.interface";

import SingleMessage from "./message/Message";

interface Props {
  messages: Message[] | undefined;
}
export default function Messages({ messages }: Props) {
  return (
    <div className="flex flex-col-reverse justify-start flex-1 mb-12 overflow-y-auto scrollbar">
      {messages?.map((message) => {
        if (message)
          return (
            <div key={message?.messageId}>
              <SingleMessage message={message} />
              );
            </div>
          );
      })}
    </div>
  );
}
