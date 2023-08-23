import Message from "@/app/interfaces/message.interface";

interface Props {
  message: Message | undefined;
}
export default function SingleMessage({ message }: Props) {
  return (
    <div className="flex flex-col-reverse">
      <div className="flex flex-col items-end gap-2 self-end m-2 max-w-[512px] border border-neutral-600 rounded-md bg-gray-800/10 py-3 px-4">
        <p>{message?.question}</p>
        <p className="text-xs text-gray-400">{String(message?.createdAt)}</p>
      </div>
      <div className="flex flex-col items-end gap-2 self-start m-2 max-w-[512px] border border-neutral-600 rounded-md bg-gray-800/10 py-3 px-4">
        <p>{message?.answer}</p>
        <p className="text-xs text-gray-400">{String(message?.createdAt)}</p>
      </div>
    </div>
  );
}
