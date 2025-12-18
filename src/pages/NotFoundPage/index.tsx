import { Link } from "react-router";

import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="mt-20 text-center">
      <Icon src="/icons/404.svg" className="text-primary mx-auto size-96" />
      <h1 className="text-foreground/70 text-4xl font-bold">
        Something went wrong
      </h1>
      <p className="text-foreground/50 mt-4 text-xl">
        Sorry we were unable to find this page
      </p>
      <Link to="/">
        <Button className="mt-4" onClick={() => window.history.back()}>
          Back to Previous
        </Button>
      </Link>
    </div>
  );
}
