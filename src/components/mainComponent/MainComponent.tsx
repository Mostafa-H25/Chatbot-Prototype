export default function MainComponent() {
  return (
    <main className="flex flex-1">
      <div className="relative flex flex-col flex-1 overflow-hidden bg-[#343541]">
        <div className="mx-auto flex h-full w-[300px] flex-col justify-center space-y-6 sm:w-[600px]">
          {/* Welcome */}
          <div className="text-center text-4xl font-bold text-white">
            Welcome to Chatbot UI
          </div>

          {/* Sub-title */}
          <div className="text-center text-lg text-white">
            <div className="mb-8 hidden">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Chatbot UI is an open source clone of OpenAI's ChatGPT UI.
            </div>
            <div className="mb-2 font-bold">
              Important: Chatbot UI is 100% unaffiliated with OpenAI.
            </div>
          </div>

          {/* Paragraph */}
          <div className="text-center text-gray-400">
            <div className="mb-2">
              Chatbot UI allows you to plug in your API key to use this UI with
              their API.
            </div>
            <div className="mb-2">
              It is <span className="italic">only</span> used to communicate
              with their API.
            </div>
            <div className="mb-2">
              Please set your OpenAI API key in the bottom left of the sidebar.
            </div>
            <div>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              If you don't have an OpenAI API key, you can get one here:
              <a
                href="https://platform.openai.com/account/api-keys"
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                openai.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
