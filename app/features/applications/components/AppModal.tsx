"use client"
import { useEffect, useId, useState } from "react"
import ApplicationForm from "./ApplicationForm"

export default function AppModal() {
    const [isOpen, setIsOpen] = useState(false)
    const titleId = useId()
    const descriptionId = useId()

    function closeModal() {
        setIsOpen(false)
    }

    useEffect(() => {
        if (!isOpen) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                closeModal()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [isOpen])

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex w-full items-center justify-center gap-2 cursor-pointer rounded-xl bg-[#1a1917] px-5 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-[#2d2c29] hover:shadow-xl sm:w-auto">
                <svg className="w-4 h-4 " viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                </svg>
                Add Application
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 overflow-y-auto bg-[#1a1917]/40 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <div className="flex min-h-full items-end justify-center p-3 sm:items-center sm:px-4 sm:py-6">
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={titleId}
                            aria-describedby={descriptionId}
                            onClick={event => event.stopPropagation()}
                            className="flex w-full max-w-2xl max-h-[calc(100dvh-1.5rem)] flex-col overflow-hidden rounded-xl border border-[#e0ded7] bg-white shadow-2xl shadow-black/10 sm:max-h-[calc(100dvh-3rem)]"
                        >
                            <div className="shrink-0 border-b border-[#ece9e1] bg-white px-4 pb-4 pt-4 sm:px-8 sm:pb-6 sm:pt-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-[#9c9a94]">
                                            Add application
                                        </p>
                                        <h2
                                            id={titleId}
                                            className=" text-xl tracking-tight text-[#1a1917] sm:text-3xl"
                                        >
                                            keep your pipeline up to date
                                        </h2>

                                    </div>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        aria-label="Close modal"
                                        className="flex cursor-pointer h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#e0ded7] text-sm text-[#9c9a94] transition-all hover:bg-[#f3f2ee] hover:text-[#1a1917]"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-8 sm:py-6">
                                <ApplicationForm
                                    onCancel={closeModal}
                                    onSuccess={closeModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
