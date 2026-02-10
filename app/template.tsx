"use client"

import { motion, useReducedMotion } from "framer-motion"

export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
