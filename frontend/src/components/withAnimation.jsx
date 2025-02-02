import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const withAnimation = (WrappedComponent) => {
  return (props) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <WrappedComponent {...props} />
      </motion.div>
    );
  };
};

export default withAnimation;