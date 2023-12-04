import {Button} from "~/components/ui/button";
import {Link} from "@remix-run/react";

import {ModeToggle} from "~/components/mode-togle";
import {MobileNav} from "~/components/mobile-nav";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";

import {siteConfig} from "~/config/config";


export function SiteHeader({isLoggedIn, avatarSrc, avatarFallback}) {
    return (
        <header
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                {/*<MainNav/>*/}
                <div className="mr-4 hidden md:flex">
                    <Link to="/" className="mr-6 flex items-center space-x-2">
                        {/*<Icons.logo className="h-6 w-6"/>*/}
                        <span className="font-bold sm:inline-block">
                            {siteConfig.name}
                        </span>
                    </Link>
                </div>
                <MobileNav/>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="flex-grow">Timer</div>
                    <ModeToggle/>
                    {
                        isLoggedIn
                            ? <Avatar>
                                <AvatarImage src={avatarSrc || "https://github.com/shadcn.png"}/>
                                <AvatarFallback>{avatarFallback}</AvatarFallback>
                            </Avatar>
                            : <Button asChild>
                                <Link to="/login">Login</Link>
                            </Button>

                    }
                </div>
            </div>
        </header>
    )
}