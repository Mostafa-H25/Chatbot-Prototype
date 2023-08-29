import Message from '@/interfaces/message.interface';

import SingleMessage from './message/Message';
import { FC, HTMLAttributes } from 'react';
import { useGlobalContext } from '@/services/context/GlobalContext';

interface MessageProps extends HTMLAttributes<HTMLDivElement> {}
const Messages: FC<MessageProps> = ({ className, ...props }) => {
  const { messages } = useGlobalContext();
  const inverseMessages = [...messages].reverse();
  return (
    <div className='flex flex-col-reverse flex-1 px-2 py-3 mb-12'>
      <div className='flex-1 flex-grow' />
      {inverseMessages?.map((message) => {
        if (message)
          return (
            <div
              key={message?.messageId}
              className={`px-4 py-2 rounded-lg my-2 ${
                message.isUserMessage ? 'bg-[#434654]' : 'bg-white'
              }`}>
              <div
                className={`flex items-end ${
                  message.isUserMessage && 'justify-end'
                }`}>
                <div
                  className={`flex flex-col space-y-2 text-sm max-w-2xl mx-2 overflow-x-hidden ${
                    message.isUserMessage
                      ? 'order-1 items-end'
                      : 'order-2 items-start'
                  }`}>
                  <p
                    className={` ${
                      message.isUserMessage ? 'text-white' : 'text-gray-900'
                    }`}>
                    {/* <SingleMessage text={message.text} />  */}
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          );
      })}
    </div>
  );
};

export default Messages;
