import React from 'react';
import { Svg, Path, Rect } from 'react-native-svg';

export const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#6A5AED" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M15 18l-6-6 6-6" />
  </Svg>
);

export const LockIcon = () => (
  <Svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#6A5AED" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
    <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Svg>
);

export const CheckIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="#6A5AED">
    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </Svg>
);
