'use client'
import { motion, Spring } from 'framer-motion'
import { FC } from 'react'

export const softBouncePrest: Spring = {
  type: 'spring',
  damping: 10,
  stiffness: 100,
}

interface EnterAnimationProps {
  children: React.ReactNode
  delay?: number
}
export const EnterAnimation: FC<EnterAnimationProps> = ({ children, ...props }) => {
  const delay = props.delay || 0

  return <motion.div
    initial={{ y: 50, opacity: 0.001 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -10, opacity: 0 }}
    transition={{ duration: 0.2, delay: delay, ...softBouncePrest }}
  >
    {children}
  </motion.div>
}
