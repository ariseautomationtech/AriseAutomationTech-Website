"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return <div className="w-9 h-9" /> // placeholder to avoid layout shift
    }

    const isDark = theme === "dark"

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative w-9 h-9 rounded-full flex items-center justify-center border border-[var(--glass-border)] bg-[var(--glass)] hover:border-[var(--accent-1)]/30 transition-all duration-300"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
            <AnimatePresence mode="wait">
                {isDark ? (
                    <motion.div
                        key="sun"
                        initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Sun className="w-4 h-4 text-[var(--accent-1)]" strokeWidth={1.5} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="moon"
                        initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Moon className="w-4 h-4 text-[var(--accent-1)]" strokeWidth={1.5} />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    )
}
