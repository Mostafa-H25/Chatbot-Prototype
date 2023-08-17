import { useGlobalContext } from "@/services/context/GlobalContext";
import { useSidebarContext } from "@/services/context/SidebarContext";

export default function SettingsModal() {
  const { isSettingsModalOpen, setIsSettingsModalOpen, theme, toggleTheme } =
    useGlobalContext();

  return (
    <>
      <p className="m-0 pb-4 text-lg font-bold text-neutral-200">Settings</p>
      <p className="m-0 pb-2 text-sm font-bold text-neutral-200">Theme</p>
      <select
        className={`w-full bg-[#202123] p-2 text-neutral-200 cursor-pointer`}
        onChange={toggleTheme}
        value={theme}
      >
        <option value="dark">Dark mode</option>
        <option value="light">Light mode</option>
      </select>
      <button
        onClick={() => setIsSettingsModalOpen(!isSettingsModalOpen)}
        type="button"
        className="w-full px-4 py-2 mt-6 border rounded-lg shadow border-neutral-800 bg-white text-black focus:outline-none hover:bg-neutral-300"
      >
        Save
      </button>
    </>
  );
}
