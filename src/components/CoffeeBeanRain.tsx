import { motion } from 'framer-motion';
import React from 'react';

const beanPath = 'M10,1 C16,1 20,7 19,12 C18,17 16,24 10,25 C4,24 2,17 1,12 C0,7 4,1 10,1 Z';
const beanCrease = 'M10,7 C11,11 11,15 10,19';

export default function CoffeeBeanRain() {
  const createBeans = (count: number) =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // random horizontal position (%)
      delay: Math.random() * 6, // delay up to 6 seconds
      duration: 7 + Math.random() * 8, // duration between 7-15 seconds
      size: 16 + Math.random() * 24, // size between 16-40
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 20,
      drift: (Math.random() - 0.5) * 20, // subtle horizontal sway
      color: `rgb(${70 + Math.random() * 30}, ${40 + Math.random() * 20}, ${20 + Math.random() * 15})`,
      creaseColor: `rgb(${50 + Math.random() * 20}, ${30 + Math.random() * 15}, ${10 + Math.random() * 10})`,
    }));

  const beanGroups = [createBeans(15), createBeans(15), createBeans(15)];

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        className={'width-[200%] absolute left-[-50%] top-[-50%] z-[-1] h-[200%]'}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      {beanGroups.map((group, groupIndex) => (
        <React.Fragment key={`group-${groupIndex}`}>
          {group.map((bean) => (
            <motion.div
              drag={true}
              whileHover={{ scale: 1.1 }}
              dragMomentum={true}
              key={`bean-${groupIndex}-${bean.id}`}
              className="absolute"
              style={{
                left: `${bean.x}%`,
                top: '-50px', // start above the viewport
                width: bean.size,
                height: bean.size * 1.5,
              }}
              animate={{
                y: ['-10%', '150vh'],
                rotate: [bean.rotation, bean.rotation + bean.rotationSpeed * 10],
                opacity: [0, 1, 1, 0.8],
                x: [0, bean.drift, 0],
              }}
              transition={{
                y: {
                  duration: bean.duration,
                  repeat: Infinity,
                  delay: bean.delay + groupIndex * 2,
                  ease: 'linear',
                },
                rotate: {
                  duration: bean.duration,
                  repeat: Infinity,
                  delay: bean.delay + groupIndex * 2,
                  ease: 'linear',
                },
                opacity: {
                  duration: bean.duration,
                  repeat: Infinity,
                  delay: bean.delay + groupIndex * 2,
                  times: [0, 0.1, 0.8, 1],
                  ease: 'linear',
                },
                x: {
                  duration: bean.duration / 2,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  delay: bean.delay + groupIndex * 2,
                  ease: 'easeInOut',
                },
              }}>
              <svg
                viewBox="0 0 20 25"
                width="100%"
                height="100%"
                style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))' }}>
                <path
                  d={beanPath}
                  fill={bean.color}
                />
                <path
                  d={beanCrease}
                  stroke={bean.creaseColor}
                  fill="none"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
