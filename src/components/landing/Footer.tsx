import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="py-12 border-t border-border bg-background">
            <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center md:items-start gap-3">
                    <Link href="/">
                        {/* Light mode logo */}
                        <Image
                            src="/logo-light.png"
                            alt="TokenTalks"
                            width={180}
                            height={44}
                            className="h-9 w-auto dark:hidden"
                            style={{ filter: 'brightness(0.96) contrast(1.1)' }}
                        />
                        {/* Dark mode logo */}
                        <Image
                            src="/logo-dark.png"
                            alt="TokenTalks"
                            width={180}
                            height={44}
                            className="h-9 w-auto hidden dark:block"
                        />
                    </Link>
                    <p className="text-sm text-muted-foreground">© 2026 TokenTalks. Tech in bytes.</p>
                </div>

                <div className="flex items-center gap-8 text-sm text-muted-foreground">
                    <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
                    <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
                    <Link href="#" className="hover:text-foreground transition-colors">GitHub</Link>
                </div>
            </div>
        </footer>
    );
}
