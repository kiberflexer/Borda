import {Link, Form} from "@remix-run/react";
import {LandPlot, Trophy, Github} from "lucide-react";

import {Button} from "~/components/ui/button";
import {MobileNav} from "~/components/mobile-nav";
import {ModeToggle} from "~/components/mode-togle";
import {Avatar, AvatarFallback, AvatarImage,} from "~/components/ui/avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "./ui/dropdown-menu";

import {siteConfig} from "~/config/config";

export function SiteHeader({isLoggedIn, avatarSrc, avatarFallback}) {
    return (
        <header className="sticky top-0 z-50 w-full bg-background">
            <div className="pt-2 flex">
                <div className="hidden md:block w-52 shrink-0">
                    <div className="flex items-center h-full">
                        <Link to="/" className="px-4 flex items-center space-x-2">
                            <LandPlot className="h-6 w-6"/>
                            <span className="font-bold sm:inline-block">
                                {siteConfig.name}
                            </span>
                        </Link>
                    </div>
                </div>
                <div
                    className=" bg-zinc-900 rounded-tl-xl border-t-2 border-l-2 border-white/10 container flex h-14 items-center">
                    <MobileNav/>
                    {/*<MainNav/>*/}
                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        <div className="flex">Timer</div>
                        {isLoggedIn ? (
                            <div className="flex items-center px-2 py-1 border-2 border-white/10 rounded-2xl">
                                <Trophy className="h-4 w-4"/>
                                <div className="ml-2 bg-zinc-700 rounded-full px-2">
                                    6%
                                </div>
                            </div>) : null
                        }
                        <div className="flex-grow"></div>

                        <ModeToggle/>
                        {isLoggedIn ?
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar>
                                        <AvatarImage src={avatarSrc}/>
                                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <Link to={"/settings"}>
                                        <DropdownMenuItem>
                                            Settings
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link to={"/logout"}>
                                        <DropdownMenuItem>
                                            Logout
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            :
                            <Form action="/auth/github" method="post">
                                <Button variant="secondary" >
                                    <Github className="mr-2 h-4 w-4"/>Login
                                </Button>
                            </Form>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}