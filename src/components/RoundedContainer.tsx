/**
 * RoundedContainer Component
 * 
 * Visual wrapper providing rounded corners and subtle borders
 * for the modern browser UI design
 */

import React from 'react';
import styles from './RoundedContainer.module.css';

export interface RoundedContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const RoundedContainer: React.FC<RoundedContainerProps> = ({
  children,
  className = '',
  style = {}
}) => {
  return (
    <div className={`${styles.roundedContainer} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default RoundedContainer;
