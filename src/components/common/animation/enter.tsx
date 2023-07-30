'use client'
import { motion } from 'framer-motion'
import { FC } from 'react'
interface EnterAnimationProps {
  children: React.ReactNode
  delay?: number
}
export const EnterAnimation: FC<EnterAnimationProps> = ({ children, ...props }) => {
  const delay = props.delay || 0

  return <motion.div
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -10, opacity: 0 }}
    transition={{ duration: 0.2, delay: delay }}
  >
    {children}
  </motion.div>
}
