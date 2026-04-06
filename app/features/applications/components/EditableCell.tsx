"use client"
// app/features/applications/components/EditableCell.tsx
import { useEffect, useState } from "react"

// Strictly string in, string out.
// This component knows nothing about numbers, nulls, or field names.
// Callers handle type conversion before passing value in and after getting it back.
interface Props {
    value: string
    field: string
    onSave: (field: string, value: string) => void
}

export default function EditableCell({ value, field, onSave }: Props) {
    const [editing, setEditing] = useState(false)
    const [localValue, setLocalValue] = useState(value)

    // Re-sync local value when server confirms the update
    useEffect(() => {
        setLocalValue(value)
    }, [value])

    function handleBlur() {
        setEditing(false)
        if (localValue !== value) {
            onSave(field, localValue)
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.currentTarget.blur() // triggers handleBlur → saves
        }
        if (e.key === "Escape") {
            setLocalValue(value)   // discard changes
            setEditing(false)
        }
    }

    if (editing) {
        return (
            <input
                autoFocus
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="border border-violet-400 bg-white rounded-md px-2 py-1 text-sm text-[#1a1917] w-full focus:outline-none focus:ring-2 focus:ring-violet-500/15"
            />
        )
    }

    return (
        <span
            onClick={() => setEditing(true)}
            title="Click to edit"
            className="cursor-pointer hover:bg-[#f3f2ee] px-1.5 py-0.5 rounded text-sm text-[#1a1917] transition-colors"
        >
            {value || <span className="text-zinc-600">—</span>}
        </span>
    )
}