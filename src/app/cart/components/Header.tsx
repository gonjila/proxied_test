import Link from "next/link";

import { Icon } from "@/components";

function Header() {
  return (
    <header>
      <Link href="/" className="flex items-center">
        <Icon iconName="leftArrow" />

        <span>GO TO THE MAIN PAGE</span>
      </Link>
    </header>
  );
}

export default Header;
