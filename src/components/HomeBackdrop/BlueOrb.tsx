import { GroupProps } from '@react-three/fiber';
import { useTheme } from 'styled-components';

export interface BlueOrbProps extends GroupProps {
  radius?: number;
}

export default function BlueOrb({ radius = 1, ...groupProps }: BlueOrbProps) {
  const theme = useTheme();

  return (
    <group {...groupProps}>
      <mesh>
        <icosahedronBufferGeometry args={[radius, 0]} />
        <meshStandardMaterial color={theme.colors.primary} />
      </mesh>
    </group>
  );
}
