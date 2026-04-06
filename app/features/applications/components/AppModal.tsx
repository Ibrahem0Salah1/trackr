"use client"
import { useState } from "react"
import ApplicationForm from "./ApplicationForm"

export default function AppModal() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex b w-full items-center justify-center gap-2 rounded-xl bg-[#1a1917] px-5 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 cursor-pointer hover:bg-[#2d2c29] hover:shadow-xl sm:w-auto"
            >
                <svg className="w-4 h-4 " viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                </svg>
                Add Application
            </button>

            {isOpen && (
                <div className="fixed  inset-0 z-50 flex items-center justify-center bg-[#1a1917]/30 px-4 py-8 backdrop-blur-sm h-full">
                    <div className="w-full bg-white max-w-2xl rounded-[28px] border border-[#e0ded7]  p-6 shadow-2xl shadow-black/10 sm:p-8">
                        <div className="flex flex-col ">
                            <div className="mb-7 flex items-start justify-between gap-6">
                                <div>
                                    <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-[#9c9a94]">
                                        Add application
                                    </p>
                                    <h2 className="font-serif text-3xl tracking-tight text-[#1a1917]">
                                        Keep your pipeline current
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e0ded7] text-sm text-[#9c9a94] transition-all hover:bg-[#f3f2ee] hover:text-[#1a1917]"
                                >
                                    ✕
                                </button>
                            </div>
                            <ApplicationForm onSuccess={() => setIsOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
