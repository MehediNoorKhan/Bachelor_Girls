import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";

export default function Search() {
  // attach a debounced input listener to the rendered input (uses the placeholder to find it)
  (() => {
    const selector = 'input[placeholder="Search"]';
    const input = document.querySelector<HTMLInputElement>(selector);
    if (!input || input.dataset.debounceAttached) return;

    input.dataset.debounceAttached = "1";
    let timer: number | undefined;

    const onInput = (e: Event) => {
      const value = (e.target as HTMLInputElement).value;
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        // perform the debounced action here
        console.log("Searching for:", value);
        // e.g. call an API or update state via a callback
      }, 300); // debounce delay in ms
    };

    input.addEventListener("input", onInput);

    // optional cleanup when the element is removed
    const observer = new MutationObserver(() => {
      if (!document.contains(input)) {
        if (timer) window.clearTimeout(timer);
        input.removeEventListener("input", onInput);
        observer.disconnect();
      }
    });
    observer.observe(document, { childList: true, subtree: true });
  })();

  return (
    <InputGroup className="border-primary max-w-sm rounded-[12px]">
      <InputGroupInput placeholder="Search" />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}
