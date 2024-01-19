import * as React from "react";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import {
    ToggleGroup,
    ToggleGroupItem,
} from "~/components/ui/toggle-group";
import {
    FingerPrintIcon,
} from "@heroicons/react/24/outline";
import {
    Link,
    useSearchParams,
} from "@remix-run/react";

const categories = ["web", "crypto", "forensics", "osint", "reverse", "misc"]

export function Filter() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>Filter</DropdownMenuTrigger>
            <DropdownMenuContent className="mr-8 p-3 rounded-2xl">
                <DropdownMenuLabel className="pb-3">Categories</DropdownMenuLabel>
                {/*<DropdownMenuSeparator/>*/}
                <div
                    className="grid grid-cols-2 gap-2 rounded-2xl">
                    {categories.map((category) => (
                        <FilterOption
                            key={category}
                            name={category}
                        />
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function FilterOption({name}) {
    let [searchParams] = useSearchParams();
    let viewProp = searchParams.get("view")?.split(",") ?? [];

    let isActive = false
    if (viewProp.includes(name)) {
        isActive = true
        viewProp = viewProp.filter(function (item) {
            return item !== name
        });
    } else {
        viewProp.push(name)
    }

    let view = viewProp.join(",")
    if (view) {
        searchParams.set("view", view)
    } else {
        searchParams.delete("view")
    }

    return (
        <DropdownMenuItem
            asChild
            className={`p-2 rounded-xl ${isActive ? "bg-rose-500" : ""} w-20 h-20 flex flex-col items-center`}
        >
            <Link
                to={`/dash?${searchParams}`}
            >

                <FingerPrintIcon className="h-8 w-8" strokeWidth={1}/>
                {name}
            </Link>
        </DropdownMenuItem>
    )
}