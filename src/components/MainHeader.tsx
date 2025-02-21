import Link from "next/link";

import Icon from "./icons";

function MainHeader() {
  return (
    <header className="px-5 md:px-14 flex justify-end sticky top-5 md:top-10">
      <Link
        href={"/cart"}
        className="relative rounded-full p-2 md:p-3"
        style={{ backgroundColor: "var(--background)" }}
      >
        <Icon iconName="cart" width={28} height={28} />

        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 -end-1 dark:border-gray-900">
          20
        </div>
      </Link>
    </header>
  );
}

export default MainHeader;
