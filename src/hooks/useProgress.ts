import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

const useProgress = () => {
  const [readingProgress, setReadingProgress] = useState(0);

  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setReadingProgress(parseFloat(latest.toFixed(2)));
  })
  return readingProgress;
};

export default useProgress;
