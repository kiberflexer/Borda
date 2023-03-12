import clsx from "clsx"

export default function Layout({ children, className }) {
    return (
        <div className={clsx("container max-w-2xl mx-auto px-4", className)}>
            {children}
        </div>
    )
}