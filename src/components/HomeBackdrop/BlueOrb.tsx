import { GroupProps } from '@react-three/fiber';
import { useCallback, useState } from 'react';
import { animated, useSpring } from '@react-spring/three';
import { useTheme } from 'styled-components';
import { Vector3Tuple } from 'three';

export interface BlueOrbProps extends GroupProps {
  radius?: number;
}

export default function BlueOrb({ radius = 1, ...groupProps }: BlueOrbProps) {
  const theme = useTheme();

  const [isActive, setIsActive] = useState(false);
  const toggleIsActive = useCallback(() => setIsActive((current) => !current), []);

  const { opacity, scale } = useSpring<{ opacity: number; scale: Vector3Tuple }>({
    opacity: !isActive ? 0.5 : 0,
    scale: !isActive ? [0.99, 0.99, 0.99] : [1.4, 1.4, 1.4],
    onRest: useCallback(() => setIsActive(false), []),
    reset: isActive,
    immediate: !isActive,
  });

  return (
    <group {...groupProps}>
      <mesh onClick={toggleIsActive}>
        <icosahedronBufferGeometry args={[radius, 0]} />
        <meshStandardMaterial color={theme.colors.primary} />
      </mesh>
      <animated.mesh scale={scale}>
        <icosahedronBufferGeometry attach="geometry" args={[radius, 0]} />
        <animated.meshStandardMaterial attach="material" color={theme.colors.primary} transparent opacity={opacity} />
      </animated.mesh>
    </group>
  );
}
