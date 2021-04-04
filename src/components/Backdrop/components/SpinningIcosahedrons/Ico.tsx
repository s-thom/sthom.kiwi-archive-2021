import { MeshProps, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { useTheme } from 'styled-components';

export interface IcoProps extends MeshProps {
  radius?: number;
  reverse?: boolean;
  rotationSpeed?: number;
}

export default function Ico({ radius = 1, rotationSpeed, reverse, ...meshProps }: IcoProps) {
  const theme = useTheme();

  const rotation = useMemo(() => rotationSpeed ?? (reverse ? -1 : 1) / (radius ** 1.5 * 300), [
    radius,
    reverse,
    rotationSpeed,
  ]);

  const mesh = useRef<any>();
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += rotation;
    }
  });

  return (
    <mesh ref={mesh} {...meshProps}>
      <icosahedronBufferGeometry args={[radius, 0]} />
      <meshStandardMaterial color={theme.colors.background} />
    </mesh>
  );
}
