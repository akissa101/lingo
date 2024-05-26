'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

type SidebarItemProps = {
  label: string;
  iconPath: string;
  href: string;
};

export const SidebarItem = ({ label, iconPath, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      variant={active ? 'sidebarOutline' : 'sidebar'}
      className="justify-start h-[52px]"
      asChild
    >
      <Link href={href}>
        <Image src={iconPath} alt="Icon" width={24} height={24} />
        <span className="ml-3">{label}</span>
      </Link>
    </Button>
  );
};
