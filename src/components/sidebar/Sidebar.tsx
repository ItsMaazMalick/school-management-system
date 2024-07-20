"use client";
import { adminNavlinks, NavLink } from "@/data/navlinks";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export function Sidebar({
  role,
  className,
}: {
  role: string;
  className?: string;
}) {
  const pathname = usePathname();

  const renderLink = (link: NavLink) => {
    if ("options" in link) {
      return (
        <Fragment key={link.name}>
          <div className="block p-1 rounded-md my-2 bg-primary-foreground/60 hover:bg-primary-foreground transition-all duration-300">
            {link.name}
          </div>
          {link.options.map((option, idx) => (
            <Link
              key={idx}
              href={option.url}
              className={`block text-primary-foreground ${
                pathname === option.url ? "bg-primary-foreground" : ""
              } p-1 rounded-md hover:bg-primary-foreground hover:text-primary transition-all duration-300 ml-4 flex text-sm`}
            >
              <span className="mr-2">{option.icon}</span>
              {option.name}
            </Link>
          ))}
        </Fragment>
      );
    } else {
      return (
        <Link
          key={link.name}
          href={link.url}
          className={`block ${
            pathname === link.url
              ? "bg-primary-foreground"
              : "bg-primary-foreground/60"
          } p-1 rounded-md my-2 hover:bg-primary-foreground transition-all duration-300 flex`}
        >
          <span className="mr-2">{link.icon}</span>
          {link.name}
        </Link>
      );
    }
  };

  return (
    <div className={cn("p-2 custom-scroll", className)}>
      {role === "ADMIN" && adminNavlinks.map((link) => renderLink(link))}
    </div>
  );
}
