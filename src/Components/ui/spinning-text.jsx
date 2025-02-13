// 'use client';
// import { cn } from '@/lib/utils';
// import { motion, Transition, Variants } from 'motion/react';
// import React, { CSSProperties } from 'react';

// type SpinningTextProps = {
//   children: string;
//   style?: CSSProperties;
//   duration?: number;
//   className?: string;
//   reverse?: boolean;
//   fontSize?: number;
//   radius?: number;
//   transition?: Transition;
//   variants?: {
//     container?: Variants;
//     item?: Variants;
//   };
//   fontFamily?: string;  // New prop for font customization
//   fontWeight?: string;  // New prop for font weight
//   letterSpacing?: string;  // New prop for letter spacing
// };

// const BASE_TRANSITION = {
//   repeat: Infinity,
//   ease: 'linear',
// };

// const BASE_ITEM_VARIANTS = {
//   hidden: {
//     opacity: 1,
//   },
//   visible: {
//     opacity: 1,
//   },
// };

// export function SpinningText({
//   children,
//   duration = 10,
//   style,
//   className,
//   reverse = false,
//   fontSize = 1,
//   radius = 5,
//   transition,
//   variants,
//   fontFamily = 'sans-serif',  // Default value
//   fontWeight = 'normal',  // Default value
//   letterSpacing = 'normal',  // Default value
// }: SpinningTextProps) {
//   const letters = children.split('');
//   const totalLetters = letters.length;

//   const finalTransition = {
//     ...BASE_TRANSITION,
//     ...transition,
//     duration: (transition as { duration?: number })?.duration ?? duration,
//   };

//   const containerVariants = {
//     visible: { rotate: reverse ? -360 : 360 },
//     ...variants?.container,
//   };

//   const itemVariants = {
//     ...BASE_ITEM_VARIANTS,
//     ...variants?.item,
//   };

//   return (
//     <motion.div
//       className={cn('relative', className)}
//       style={{
//         ...style,
//       }}
//       initial='hidden'
//       animate='visible'
//       variants={containerVariants}
//       transition={finalTransition}
//     >
//       {letters.map((letter, index) => (
//         <motion.span
//           aria-hidden='true'
//           key={`${index}-${letter}`}
//           variants={itemVariants}
//           className='absolute left-1/2 top-1/2 inline-block'
//           style={
//             {
//               '--index': index,
//               '--total': totalLetters,
//               '--font-size': fontSize,
//               '--radius': radius,
//               fontSize: `calc(var(--font-size, 2) * 1rem)`,
//               transform: `
//                   translate(-50%, -50%)
//                   rotate(calc(360deg / var(--total) * var(--index)))
//                   translateY(calc(var(--radius, 5) * -1ch))
//                 `,
//               transformOrigin: 'center',
//               fontFamily: fontFamily,  // Apply font family
//               fontWeight: fontWeight,  // Apply font weight
//               letterSpacing: letterSpacing,  // Apply letter spacing
//             } as React.CSSProperties
//           }
//         >
//           {letter}
//         </motion.span>
//       ))}
//       <span className='sr-only'>{children}</span>
//     </motion.div>
//   );
// }



'use client';;
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import React from 'react';

import PropTypes from 'prop-types';

const BASE_TRANSITION = {
  repeat: Infinity,
  ease: 'linear',
};

const BASE_ITEM_VARIANTS = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
  },
};

export function SpinningText({
  children,
  duration = 10,
  style,
  className,
  reverse = false,
  fontSize = 1,
  radius = 5,
  transition,
  variants
}) {
  const letters = children.split('');
  const totalLetters = letters.length;

  const finalTransition = {
    ...BASE_TRANSITION,
    ...transition,
    duration: (transition)?.duration ?? duration,
  };

  const containerVariants = {
    visible: { rotate: reverse ? -360 : 360 },
    ...variants?.container,
  };

  const itemVariants = {
    ...BASE_ITEM_VARIANTS,
    ...variants?.item,
  };

  return (
    (<motion.div
      className={cn('relative', className)}
      style={{
        ...style,
        fontFamily: "'Plus Jakarta Sans', sans-serif",  // Add the font family here
      }}
      initial='hidden'
      animate='visible'
      variants={containerVariants}
      transition={finalTransition}>
      {letters.map((letter, index) => (
        <motion.span
          aria-hidden='true'
          key={`${index}-${letter}`}
          variants={itemVariants}
          className='absolute left-1/2 top-1/2 inline-block'
          style={
            {
              '--index': index,
              '--total': totalLetters,
              '--font-size': fontSize,
              '--radius': radius,
              fontSize: `calc(var(--font-size, 2) * 1rem)`,

              transform: `
                  translate(-50%, -50%)
                  rotate(calc(360deg / var(--total) * var(--index)))
                  translateY(calc(var(--radius, 5) * -1ch))
                `,

              transformOrigin: 'center'
            }
          }>
          {letter}
        </motion.span>
      ))}
      <span className='sr-only'>{children}</span>
    </motion.div>)
  );
}


SpinningText.propTypes={
  children:PropTypes.any,
  duration:PropTypes.number,
  style:PropTypes.object,
  className:PropTypes.string,
  reverse:PropTypes.bool,
  fontSize:PropTypes.number,
  radius : PropTypes.number,
  transition:PropTypes.any,
  variants:PropTypes.any,
};