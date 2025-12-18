import { Button } from "@/components/animate-ui/components/buttons/button";
import { Expand, Shrink } from "lucide-react";
import { useState } from "react";

export default function Fullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(!document.fullscreenElement);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  console.log(document.fullscreenElement);

  return (
    <Button
      onClick={toggleFullscreen}
      size={"icon"}
      className="!bg-primary/10 text-foreground cursor-pointer"
    >
      {!isFullscreen ? <Expand /> : <Shrink />}
    </Button>
  );
}
