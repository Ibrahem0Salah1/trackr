// app/dashboard/page.tsx
import { SearchParams } from "nuqs/server";
import Navbar from "../features/applications/components/Navbar";
import AppModal from "../features/applications/components/AppModal";
import SearchBar from "../features/applications/components/SearchBar";
import { getUser } from "@/lib/getUser";
import ApplicationsTable from "../features/applications/components/ApplicationTable";
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query'
import { searchParamsCache } from "../features/applications/search-params-cache";
import { getApplicationsPage } from "../features/applications/api/server";
import { getUserData } from "@/lib/getUserData";
interface DashboardProps {
    searchParams: Promise<SearchParams>
}

export default async function Dashboard({ searchParams }: DashboardProps) {
    const token = await getUser();
    if (!token) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#fafaf8] px-6 text-center">
                <div className="max-w-md rounded-[28px] border border-[#e0ded7] bg-white px-8 py-10 shadow-xl shadow-black/5">
                    <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-[#9c9a94]">Unauthorized</p>
                    <h1 className="font-serif text-4xl tracking-tight text-[#1a1917]">Please log in first</h1>
                    <p className="mt-3 text-sm leading-relaxed text-[#5c5a55]">
                        Your dashboard is protected so only you can see your application pipeline.
                    </p>
                    <div className="mt-6">
                        <a
                            href="/login"
                            className="inline-flex rounded-xl bg-[#1a1917] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2d2c29]"
                        >
                            Go to login
                        </a>
                    </div>
                </div>
            </div>
        )
    }
    const userData = token ? await getUserData(Number(token.userId)) : null;
    if (!userData) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#fafaf8] px-6 text-center">
                <div className="max-w-md rounded-[28px] border border-[#e0ded7] bg-white px-8 py-10 shadow-xl shadow-black/5">
                    <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-[#9c9a94]">Unauthorized</p>
                    <h1 className="font-serif text-4xl tracking-tight text-[#1a1917]">Please log in first</h1>
                    <p className="mt-3 text-sm leading-relaxed text-[#5c5a55]">
                        Your dashboard is protected so only you can see your application pipeline.
                    </p>
                    <div className="mt-6">
                        <a
                            href="/login"
                            className="inline-flex rounded-xl bg-[#1a1917] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2d29]"
                        >
                            Go to login
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    const userId = Number(token.userId)
    const { q, page } = await searchParamsCache.parse(searchParams)
    const queryClient = new QueryClient()
    const initialApplications = await getApplicationsPage(userId, q, page)
    queryClient.setQueryData(["applications", { q, page }], initialApplications)
    return (
        <>
            <Navbar userData={userData} />
            <div className="min-h-screen  bg-[#fafaf8] text-[#1a1917]">

                <div className="mx-auto max-w-7xl px-2 py-10 md:px-12">
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="w-full sm:max-w-sm">
                            <SearchBar />
                        </div>
                        <div className="sm:flex-none">
                            <AppModal />
                        </div>
                    </div>
                    <div className="rounded-4xl border  border-[#e0ded7] shadow-2xl shadow-black/5">
                        <HydrationBoundary state={dehydrate(queryClient)}>
                            <ApplicationsTable />
                        </HydrationBoundary>
                    </div>
                </div>
            </div>
        </>
    )
}
