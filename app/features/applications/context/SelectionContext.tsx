// features/applications/context/SelectionContext.tsx
"use client"

import {
    createContext,
    useContext,
    useState,
    useCallback,
    type ReactNode,
} from "react"

interface SelectionContextValue {
    selectedIds: Set<number>
    toggleId: (id: number) => void
    clearSelection: () => void
    isSelected: (id: number) => boolean
}

const SelectionContext = createContext<SelectionContextValue | null>(null)

export function SelectionProvider({ children }: { children: ReactNode }) {
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

    // useCallback — these functions keep the same reference between renders
    // without this, every render creates new function references
    // which causes unnecessary re-renders in child components
    const toggleId = useCallback((id: number) => {
        setSelectedIds(prev => {
            const next = new Set(prev)
            // Already selected → remove it. Not selected → add it.
            if (next.has(id)) { next.delete(id) } else { next.add(id) }
            return next
        })
    }, [])

    const clearSelection = useCallback(() => {
        setSelectedIds(new Set())
    }, [])

    const isSelected = useCallback((id: number) => {
        return selectedIds.has(id)
    }, [selectedIds])

    return (
        <SelectionContext.Provider
            value={{ selectedIds, toggleId, clearSelection, isSelected }}
        >
            {children}
        </SelectionContext.Provider>
    )
}

// Custom hook — components call this to reach into the box
// Throws if used outside the provider — clear error message instead of silent null
export function useSelection() {
    const ctx = useContext(SelectionContext)
    if (!ctx) throw new Error("useSelection must be used inside SelectionProvider")
    return ctx
}