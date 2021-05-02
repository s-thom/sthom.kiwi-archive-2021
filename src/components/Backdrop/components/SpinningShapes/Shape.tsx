import { MeshProps } from '@react-three/fiber';
import { useTheme } from 'styled-components';

export interface ShapeProps extends MeshProps {
  variant: 'icosahedron' | 'cube' | 'tetrahedron' | 'dodecahedron' | 'octahedron';
  color?: string;
  radius?: number;
}

export default function Shape({ color, variant, radius = 1, ...meshProps }: ShapeProps) {
  const theme = useTheme();

  return (
    <mesh {...meshProps}>
      {variant === 'icosahedron' && <icosahedronBufferGeometry args={[radius, 0]} />}
      {variant === 'dodecahedron' && <dodecahedronBufferGeometry args={[radius, 0]} />}
      {variant === 'octahedron' && <octahedronBufferGeometry args={[radius, 0]} />}
      {variant === 'tetrahedron' && <tetrahedronBufferGeometry args={[radius, 0]} />}
      {variant === 'cube' && <boxBufferGeometry args={[radius, radius, radius]} />}
      <meshStandardMaterial color={color ?? theme.colors.dark} />
    </mesh>
  );
}
