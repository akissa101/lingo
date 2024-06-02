import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide',
  {
    variants: {
      variant: {
        default:
          'bg-white text-black border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 hover:text-slate-500',
        primary:
          'bg-sky-800 text-slate-100 hover:bg-sky-600/70 border-slate-700 border-b-4 active:border-b-0',
        primaryOutline:
          'bg-white text-sky-500 hover:bg-slate-200 border-sky-300 border-b active:border-b-0',
        secondary:
          'bg-green-700 text-primary-foreground hover:bg-green-500/90 border-green-600 border-b-4 active:border-b-0 transition duration-300',
        secondaryOutline:
          'bg-white text-green-500 hover:bg-slate-200 border-sky-300 border-b active:border-b-0',
        danger:
          'bg-rose-500 text-primary-foreground hover:bg-rose-500/90 border-rose-600 border-b-4 active:border-b-0',
        dangerOutline:
          'bg-slate-800 text-rose-500 hover:bg-slate-700/60 border-rose-600 border-b-2 active:border-b-0',
        super:
          'bg-indigo-500 text-primary-foreground hover:bg-indigo-500/90 border-indigo-600 border-b-4 active:border-b-0',
        superOutline:
          'bg-white text-indigo-500 hover:bg-slate-200 border-sky-300 border-b active:border-b-0',
        ghost:
          'bg-transparent text-slate-500 hover:bg-slate-800 border border-slate-700 ',
        sidebar:
          'bg-transparent text-slate-500 hover:bg-slate-700 border-transparent border-2 transition-none',
        sidebarOutline:
          'bg-sky-500/15 text-sky-500 hover:bg-sky-500/20   transition-none', //border-sky-300 border-2 active:border-b-0
        locked:
          'bg-neutral-800 text-primary-foreground hover:bg-neutral-800/90 border-neutral-700 border-b-4 active:border-b-0',
      },
      size: {
        default: 'h-11 px-4 py-2',
        sm: 'h-9  px-3',
        lg: 'h-12  px-8',
        icon: 'h-10 w-10',
        rounded: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
