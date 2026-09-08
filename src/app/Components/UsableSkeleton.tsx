import { Skeleton } from "@/src/components/ui/skeleton";

export default function UsableSkeleton() {
    return (
        <div className="mx-auto w-full max-w-[1440px] px-4 py-16 xl:px-16 animate-pulse">
            <div className="flex flex-col gap-8 lg:flex-row">
                {/* Products List Skeleton Wrapper */}
                <div className="flex-1 space-y-6">
                    <Skeleton className="h-[58px] w-full bg-gray-200" />

                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="flex items-center gap-6 border-b pb-6"
                        >
                            <Skeleton className="h-[105px] w-[105px] rounded-[10px] bg-gray-200" />

                            <div className="flex flex-1 flex-col gap-3">
                                <Skeleton className="h-5 w-[180px] bg-gray-200" />
                                <Skeleton className="h-4 w-[120px] bg-gray-200" />
                            </div>

                            <Skeleton className="h-5 w-[80px] bg-gray-200" />
                            <Skeleton className="h-8 w-8 bg-gray-200 rounded-md" />
                            <Skeleton className="h-5 w-[100px] bg-gray-200" />
                        </div>
                    ))}
                </div>

                {/* Totals Box Skeleton Card */}
                <Skeleton className="h-[350px] w-full lg:max-w-[393px] bg-gray-200" />
            </div>
        </div>)
}
