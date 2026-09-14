import * as React from "react";
import { cn } from "@/lib/utils";

export interface LineHoverLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

const scribblePath = "M.5 2.5C7 1 12 5.5 18 3.5s10-1.8 16 .5 10 2.8 16 .2 10-2.5 16 .2 10 2.3 16-.3 10-1.8 18 .6";

export const LineHoverLink = React.forwardRef<HTMLAnchorElement, LineHoverLinkProps>(
  ({ children, className, ...props }, ref) => (
    <a ref={ref} className={cn("link-hover link-hover--scribble", className)} {...props}>
      <span>{children}</span>
      <svg className="link-hover__graphic link-hover__graphic--scribble" viewBox="0 0 101 9" aria-hidden="true">
        <path d={scribblePath} pathLength="1" />
      </svg>
    </a>
  ),
);

LineHoverLink.displayName = "LineHoverLink";

export default LineHoverLink;