import Link from "next/link";
import { useGlobalContext } from "@/app/services/context/GlobalContext";
import { useModalContext } from "@/app/services/context/ModalContext";
import { useSidebarContext } from "@/app/services/context/SidebarContext";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SettingsIcon from "@mui/icons-material/Settings";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function ChatSidebarFooter() {
  const { user, chats, setChats } = useGlobalContext();
  const { setIsSettingsModalOpen } = useModalContext();
  const { deleteConfirm, setDeleteConfirm } = useSidebarContext();

  const handleLogout = async () => {
    try {
      const userId = user?.userId;
      const endpoint = "/api/logout";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      };
      const response = await fetch(endpoint, options);
      const data = await response.json();
      // toast
      console.log("you are logged out");
    } catch (error) {
      console.log("ERROR", error);
    }
  }
  
  const handleDeleteClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setChats([]);
        // Call the API or perform any other necessary action here
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };


  return (
    <div className="flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm">
      {chats.length > 0 && (
        <>
          <button
            onClick={() => handleDeleteClick()}
            className="flex w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10"
          >
            <FileUploadIcon />
            <span>Clear Chats</span>
          </button>
        </>
      )}

      <button className="flex items-center gap-3 w-full cursor-pointer select-none rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10">
        <label
          htmlFor="fileImport"
          className="flex items-center gap-3 w-full h-full"
        >
          <input
            type="file"
            accept=".json"
            name="fileImport"
            id="fileImport"
            className="hidden"
          />
          <FileUploadIcon />
          <span>Import data</span>
        </label>
      </button>
      <button className="flex items-center gap-3 w-full cursor-pointer select-none rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10">
        <Link
          href="/chats/history"
          download={<p>history</p>}
          rel="noreferrer"
          className="flex items-center gap-3 w-full h-full"
        >
          <FileDownloadIcon />
          <span>Export data</span>
        </Link>
      </button>
      <button
        onClick={() => setIsSettingsModalOpen(true)}
        className="flex w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10"
      >
        <SettingsIcon />
        <span>Settings</span>
      </button>

      {/* user.logout */}
      <button
        onClick={() => handleLogout()}
        className="flex w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10"
      >
        <SettingsIcon />
        <span>Logout</span>
      </button>
    </div>
  );
}
