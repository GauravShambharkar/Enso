
'use client'
import { motion } from "framer-motion"

const ikigai = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full ">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-4xl font-medium text-white'
        >Ikigai</motion.h1>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="w-full  text-white/70"
      >dashboards</motion.div>
    </div>
  )
}

export default ikigai