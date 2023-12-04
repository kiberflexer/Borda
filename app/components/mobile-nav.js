import * as React from "react"
import {useNavigate} from "@remix-run/react";
import {Link} from "@remix-run/react";

import {cn} from "~/lib/utils"

import {
    Sheet,
    SheetTitle,
    SheetHeader,
    SheetTrigger,
    SheetContent,
    SheetDescription,
} from "~/components/ui/sheet";
import {Button} from "~/components/ui/button";
import {ScrollArea} from "~/components/ui/scroll-area";

import {siteConfig} from "~/config/config";

export function MobileNav() {
    const [open, setOpen] = React.useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                    {/*<ViewVerticalIcon className="h-5 w-5" />*/}
                    <span className="">Toggle Menu</span>

                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <MobileLink
                    to="/"
                    className="flex items-center"
                    onOpenChange={setOpen}
                >
                    {/*<Icons.logo className="mr-2 h-4 w-4" />*/}
                    <span className="font-bold">{siteConfig.name}</span>
                </MobileLink>
                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
                    <div className="flex flex-col space-y-3">
                        {siteConfig.categories?.map(
                            (item) =>
                                item.href && (
                                    <MobileLink
                                        key={item.href}
                                        to={item.href}
                                        onOpenChange={setOpen}
                                    >
                                        {item.title}
                                    </MobileLink>
                                )
                        )}
                    </div>
                </ScrollArea>


                {/*<SheetHeader>*/}
                {/*    <SheetTitle>Are you sure absolutely sure?</SheetTitle>*/}
                {/*    <SheetDescription>*/}
                {/*        This action cannot be undone. This will permanently delete your account*/}
                {/*        and remove your data from our servers.*/}
                {/*    </SheetDescription>*/}
                {/*</SheetHeader>*/}
            </SheetContent>
        </Sheet>
    )
}

function MobileLink({to, onOpenChange, className, children, ...props}) {
    // const router = useRouter()
    const navigate = useNavigate()
    return (
        <Link
            to={to}
            onClick={() => {
                // location.router.push(href.toString())
                navigate(to)
                onOpenChange?.(false)
            }}
            className={cn(className)}
            {...props}
        >
            {children}
        </Link>
    )
}