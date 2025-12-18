import { Link } from "react-router";
import { Button } from "../ui/button";

export default function ErrorPage() {
  return (
    <section className="">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-screen-xl flex-col items-center justify-center px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto text-center">
          <h1 className="text-primary dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
            500
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Internal Server Error.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            We are already working to solve the problem.{" "}
          </p>
          <Link to="/" className="text-primary underline">
            <Button>Go back</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
