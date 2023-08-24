import { useGlobalContext } from "@/app/services/context/GlobalContext";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

interface Props {
  side: string;
  state: boolean;
  toggleState: any;
}

export default function SidebarButton({ side, state, toggleState }: Props) {
  const { theme } = useGlobalContext();
  function handleClick(): void {
    toggleState(!state);
  }
  return (
    <>
      {/* check if left or right sidebar */}
      {side === "left" ? (
        <>
          <button
            onClick={() => handleClick()}
            type="button"
            className={`py-4 ${theme === "dark" ? "text-white" : "text-black"}`}
          >
            {/* check if sidebar is opened or closed */}
            {state ? (
              <KeyboardDoubleArrowLeftIcon />
            ) : (
              <KeyboardDoubleArrowRightIcon />
            )}
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => handleClick()}
            type="button"
            className={`py-4 ${theme === "dark" ? "text-white" : "text-black"}`}
          >
            {/* check if sidebar is opened or closed */}
            {state ? (
              <KeyboardDoubleArrowRightIcon />
            ) : (
              <KeyboardDoubleArrowLeftIcon />
            )}
          </button>
        </>
      )}
    </>
  );
}
