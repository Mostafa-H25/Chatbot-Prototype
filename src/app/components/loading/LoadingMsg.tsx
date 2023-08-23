import Image from "next/image";
import IMG_LOGO from "../../../public/logo.png";
export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center w-full">
      <div className="w-10 h-10 relative animate-spin">
        <Image alt="logo" src={IMG_LOGO} fill />
      </div>
      <p className="text-sm text-muted-foreground">AI is Thinking...</p>
    </div>
  );
};
