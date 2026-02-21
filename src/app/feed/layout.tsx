'use client';

import { Search, User, Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function FeedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { setTheme } = useTheme();

    return (
        <div className="min-h-screen bg-background">
            {/* Top Navbar */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex items-center h-14 max-w-2xl mx-auto px-4 gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center shrink-0">
                        <Image
                            src="/logo-light.png"
                            alt="TokenTalks"
                            width={140}
                            height={36}
                            className="h-8 w-auto dark:hidden"
                            style={{ filter: 'brightness(0.96) contrast(1.1)' }}
                            priority
                        />
                        <Image
                            src="/logo-dark.png"
                            alt="TokenTalks"
                            width={140}
                            height={36}
                            className="h-8 w-auto hidden dark:block"
                            priority
                        />
                    </Link>

                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full pl-9 h-9 rounded-full bg-secondary text-sm border-transparent focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-ring"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                    Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                    Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                    System
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground">
                            <Bell className="w-4 h-4" />
                        </Button>

                        <Avatar className="h-8 w-8 border border-border">
                            <AvatarImage src="" />
                            <AvatarFallback className="text-xs">U</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            <main className="flex justify-center">
                {children}
            </main>
        </div>
    );
}
