import { motion, useReducedMotion } from 'framer-motion';
import React, { useEffect } from 'react';

const ProgressBarWrapper = {
  maxHeight: '425px',
  width: '2px',
  backgroundColor: 'rgb(87, 95, 117)',
}

const ProgressBar = ({ progress }: { progress: number }) => {
  const [visibility, setVisibility] = React.useState(true);
  const shouldReduceMotion = useReducedMotion();

  const progressBarWrapperVariants = {
    hide: {
      opacity: shouldReduceMotion ? 1 : 0,
    },
    show: (visibility: boolean) => ({
      opacity: shouldReduceMotion ? 1 : visibility ? 0.7 : 0,
    }),
  };

  useEffect(() => setVisibility(progress >= 0.07 && progress <= 0.95), [
    progress,
  ]);

  return (
    <motion.div
      style={ProgressBarWrapper}
      initial="hide"
      variants={progressBarWrapperVariants}
      animate="show"
      transition={{ type: 'spring' }}
      custom={visibility}
    >
      <motion.div
        style={{
          transformOrigin: 'top',
          scaleY: progress,
          width: '2px',
          height: '100%',
        }}
        className={'bg-primary'}
        data-testid="progress-bar"
        data-testprogress={progress}
      />
    </motion.div>
  );
};

export default ProgressBar;
