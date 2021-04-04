import { MeshProps, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { useTheme } from 'styled-components';

export interface ShapeProps extends MeshProps {
  variant: 'icosahedron' | 'cube' | 'tetrahedron' | 'dodecahedron' | 'octahedron';
  color?: string;
  radius?: number;
  reverse?: boolean;
  rotationSpeed?: number;
}

export default function Shape({ color, variant, radius = 1, rotationSpeed, reverse, ...meshProps }: ShapeProps) {
  const theme = useTheme();

  const rotation = useMemo(() => rotationSpeed ?? (reverse ? -1 : 1) / (radius ** 1.5 * 600), [
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
      {variant === 'icosahedron' && <icosahedronBufferGeometry args={[radius, 0]} />}
      {variant === 'dodecahedron' && <dodecahedronBufferGeometry args={[radius, 0]} />}
      {variant === 'octahedron' && <octahedronBufferGeometry args={[radius, 0]} />}
      {variant === 'tetrahedron' && <tetrahedronBufferGeometry args={[radius, 0]} />}
      {variant === 'cube' && <boxBufferGeometry args={[radius, radius, radius]} />}
      <meshStandardMaterial color={color ?? theme.colors.background} />
    </mesh>
  );
}
