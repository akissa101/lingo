import { SheetContent, SheetTrigger, Sheet } from '@/components/ui/sheet';
import { Sidebar } from '@/components/sidebar';
import { Menu } from 'lucide-react';

type MobileSidebarProps = {};

export const MobileSidebar = ({}: MobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="p-0 z-[100]" side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
