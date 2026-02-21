'use client';

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const categories = [
    {
        title: "Artificial Intelligence",
        href: "/feed?category=ai",
        description: "LLMs, Generative Models, and Research breakthroughs.",
    },
    {
        title: "Web Development",
        href: "/feed?category=web",
        description: "React 19, Next.js, CSS features, and browser engines.",
    },
    {
        title: "DevOps & Cloud",
        href: "/feed?category=devops",
        description: "Kubernetes, Docker, AWS, and CI/CD pipelines.",
    },
    {
        title: "Explore More",
        href: "/feed",
        description: "Browse all topics including Mobile, Security, and Data.",
    },
];

const resources = [
    { title: "Research Papers", href: "/feed?type=research" },
    { title: "Blogs & Articles", href: "/feed?type=blog" },
    { title: "Videos", href: "/feed?type=video" },
];

export function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border/50 transition-all">
            <Link href="/" className="flex items-center">
                {/* Light mode logo - uses filter to blend with background */}
                <Image
                    src="/logo-light.png"
                    alt="TokenTalks"
                    width={200}
                    height={48}
                    className="h-10 w-auto dark:hidden"
                    style={{ filter: 'brightness(0.96) contrast(1.1)' }}
                    priority
                />
                {/* Dark mode logo */}
                <Image
                    src="/logo-dark.png"
                    alt="TokenTalks"
                    width={200}
                    height={48}
                    className="h-10 w-auto hidden dark:block"
                    priority
                />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {categories.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] grid-cols-2">
                                    {resources.map((item) => (
                                        <ListItem key={item.title} title={item.title} href={item.href}>
                                            Browse the latest {item.title.toLowerCase()}.
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link href="/about" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    About Us
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/contact" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Contact
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <div className="flex items-center gap-4">
                <Link href="/feed">
                    <Button variant="ghost" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
                        Web App
                    </Button>
                </Link>
                <Link href="/download">
                    <Button size="sm" className="rounded-full px-6 shadow-lg shadow-primary/20">Launch App</Button>
                </Link>
                <div className="md:hidden">
                    <Button variant="ghost" size="icon"><Menu className="w-5 h-5" /></Button>
                </div>
            </div>
        </header>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
