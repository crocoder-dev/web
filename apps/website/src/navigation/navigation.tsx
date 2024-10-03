import type { MouseEvent } from "react";
import { applyDesktopShrinkAnimation } from "./animations";
import { NavigationLink } from "./navigation-link";
import { NavigationLinkButton } from "./navigation-link-button";
import { useScrollingDirection } from "./use-scrolling-direction";

export const Navigation = () => {
  const scrollDirection = useScrollingDirection();
  const hideAnimation = applyDesktopShrinkAnimation(scrollDirection === "down");

  const onBookACallClick = (event: MouseEvent) => {
    event.preventDefault();
    const bookACallSection = document.getElementById("book-a-call");
    bookACallSection?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <header
      className="
    fixed
    m-auto
    mx:0
    top-0
    w-full
    md:mx-2
    md:top-4
    md:w-auto
    z-50
    "
    >
      <nav
        className="
        bg-[#3C3843E5]
        flex
        items-center
        justify-between
        py-3
        px-2
        sm:px-4
        md:rounded-l-[3rem]
        md:rounded-r-lg
        overflow-hidden
        "
      >
        <a className="hidden sm:flex sm:items-center" href="/" aria-label="Crocoder Logo">
          <img
            width={64}
            height={30}
            alt="Crocoder Crocodile Logo"
            src="./images/crocoder-logo.png"
            className={`ml-[-2px] h-[48px] w-auto`}
          />
          <img
            width={153}
            height={24}
            alt="Crocoder Text Logo"
            src="./images/crocoder-text.svg"
            className={`pl-2 hidden h-6 w-auto md:block ${hideAnimation}`}
          />
        </a>
        <ul className={`flex gap-4 mx-2 md:mx-16 ${hideAnimation}`}>
          <li>
            <NavigationLink href="/blog">Blog</NavigationLink>
          </li>
        </ul>
        <ul className="flex gap-4">
          <li>
            <NavigationLinkButton
              color={"gray"}
              href={"#book-a-call"}
              onClick={onBookACallClick}
            >
              Book a call
            </NavigationLinkButton>
          </li>
          <li>
            <NavigationLinkButton href={"/contact"} color={"yellow"}>
              Contact us
            </NavigationLinkButton>
          </li>
        </ul>
      </nav>
    </header>
  );
};
