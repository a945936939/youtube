import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Home,
  Library,
  Repeat,
} from "lucide-react";
import React, { Children, ElementType, ReactNode, useState } from "react";
import { Button, buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";

export default function Sidebar() {
  return (
    <>
      <aside className='"sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col ml-1 lg:hidden'>
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Repeat" url="/Repeat" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscription"
          url="/Subscription"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/" />
      </aside>
      <aside className="w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 flex">
        <LargeSidebarSection title="Hi" visibleItemCount={1}>
          <LargeSidebarItem isActive Icon={Home} title="Home" url="/" />
          <LargeSidebarItem Icon={Clapperboard} title="Subscription" url="/" />
        </LargeSidebarSection>
      </aside>
    </>
  );
}
type smallSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};
function SmallSidebarItem({ Icon, title, url }: smallSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}
type LargeSidebarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};
function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const showExpandButton = childrenArray.length > visibleItemCount;
  const visiblChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}

      {visiblChildren}
      {showExpandButton && (
        <Button
          onClick={() => {
            setIsExpanded((e) => !e);
          }}
          variant="ghost"
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "show less" : "show more"}</div>
        </Button>
      )}
    </div>
  );
}

type LargeSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
  isActive?: boolean;
};
function LargeSidebarItem({
  isActive,
  Icon,
  title,
  url,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}
