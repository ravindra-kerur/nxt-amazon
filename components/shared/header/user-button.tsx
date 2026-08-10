import { auth } from "@/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOut } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const UserButton = async () => {
  const session = await auth();

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger className="header-button">
        <div className="flex items-center">
          <div className="flex flex-col text-xs text-left">
            <span>Hello, {session ? session?.user?.name : "sign in"}</span>
            <span className="font-bold">Account & Order</span>
          </div>
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>

      {session ? (
        <DropdownMenuContent className="w-64" align="end" sideOffset={8}>
          <DropdownMenuGroup>
            {/* User information */}
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session?.user?.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>

            {/* Account */}
            <DropdownMenuItem>
              <Link href="/account" className="w-full cursor-pointer">
                Your account
              </Link>
            </DropdownMenuItem>

            {/* Orders */}
            <DropdownMenuItem>
              <Link href="/account/orders" className="w-full cursor-pointer">
                Your orders
              </Link>
            </DropdownMenuItem>

            {/* Admin */}
            {session.user?.role === "admin" && (
              <DropdownMenuItem>
                <Link href="/admin/overview" className="w-full cursor-pointer">
                  Admin
                </Link>
              </DropdownMenuItem>
            )}

            {/* Sign out */}
            <DropdownMenuItem className="p-0 mb-1">
              <form action={SignOut} className="w-full">
                <Button
                  className="w-full py-4 px-2 h-4 justify-start"
                  variant="ghost"
                  type="submit"
                >
                  Sign out
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="w-64" align="end" sideOffset={8}>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/sign-in" className={cn(buttonVariants(), "w-full")}>
                Sign in
              </Link>
            </DropdownMenuItem>

            <DropdownMenuLabel>
              <div className="font-normal">
                New Customer?{" "}
                <Link href="/sign-up" className="text-primary hover:underline">
                  Sign-up
                </Link>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default UserButton;
