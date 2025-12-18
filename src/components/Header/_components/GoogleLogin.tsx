import { Button } from "@/components/animate-ui/primitives/buttons/button";
import Icon from "@/components/Icon";

export default function GoogleLogin() {
  return (
    <Button type="button" className="cursor-pointer rounded-full p-0">
      <Icon src="/icons/googleicon.svg" className="size-10" />
    </Button>
  );
}
