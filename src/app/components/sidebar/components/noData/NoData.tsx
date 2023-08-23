import FolderOffIcon from "@mui/icons-material/FolderOff";

export default function NoData() {
  return (
    <div className="flex flex-col items-center gap-2 mt-8 select-none text-center text-white opacity-50">
      <FolderOffIcon />
      <span className="text-[14px] leading-normal">No data.</span>
    </div>
  );
}
