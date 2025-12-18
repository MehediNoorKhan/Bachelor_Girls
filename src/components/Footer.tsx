import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="from-success/5 to-primary/5 mt-20 bg-gradient-to-r py-10">
      <div className="container mx-auto grid gap-10 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Logo + App Links */}
        <div className="flex flex-1 flex-col items-center gap-10">
          <img src={"/images/logo.png"} alt="Logo" className="w-36" />
          <div className="flex flex-wrap justify-center gap-2">
            <img
              src={"/images/googlePlay.png"}
              alt="Google Play"
              className="h-10"
            />
            <img
              src={"/images/appStore.png"}
              alt="App Store"
              className="h-10"
            />
          </div>
        </div>

        {/* Quick Click */}
        <div className="flex flex-1 flex-col gap-4 text-center md:text-left">
          <h3 className="text-xl font-semibold">Quick Click</h3>
          <ul className="text-muted-foreground flex flex-col gap-2">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Service
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="flex flex-1 flex-col gap-4 text-center md:text-left">
          <h3 className="text-xl font-semibold">Support</h3>
          <ul className="text-muted-foreground flex flex-col gap-2">
            <li>
              <a href="#" className="hover:underline">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Address + Contact + Social */}
        <div className="flex flex-1 flex-col gap-4 max-md:items-center">
          <h3 className="text-xl font-semibold">Address</h3>
          <div>
            <div className="mb-1 flex justify-center gap-5 md:justify-start">
              <Icon src="/icons/map.svg" className="mt-1 size-5" />
              <h4 className="text-lg font-medium">The Booking Nest</h4>
            </div>

            <p className="text-muted-foreground text-center text-sm max-md:max-w-[200px] md:text-start">
              Level 12, 100 Mount Street, North Sydney, NSW 2060 Australia
            </p>
          </div>

          <div className="flex items-center gap-4 text-center md:text-start">
            <Icon src="/icons/call.svg" className="size-5" />

            <span className="text-muted-foreground">+61 3 8376 6284</span>
          </div>

          <div className="flex flex-col items-center gap-2 md:items-start">
            <h3 className="text-lg font-medium">Social Media</h3>
            <div className="flex items-center gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Icon
                  src="/icons/facebook2.svg"
                  className="size-8 transition hover:opacity-80"
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Icon
                  src="/icons/twitter.svg"
                  className="size-8 transition hover:opacity-80"
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Icon
                  src="/icons/snapchat.svg"
                  className="size-10 transition hover:opacity-80"
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Icon
                  src="/icons/linkedin.svg"
                  className="size-8 transition hover:opacity-80"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
