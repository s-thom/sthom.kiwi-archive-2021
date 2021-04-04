import { MeshProps, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { useTheme } from 'styled-components';
import { IcosahedronBufferGeometry } from 'three';

const icosahedronGeometry = new IcosahedronBufferGeometry(1, 0);

export interface IcoProps extends MeshProps {
  radius: number;
  rotationSpeed: number;
}

export default function Ico({ radius, rotationSpeed, ...meshProps }: IcoProps) {
  const theme = useTheme();

  const mesh = useRef<any>();
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <mesh ref={mesh} geometry={icosahedronGeometry} {...meshProps}>
      <meshStandardMaterial color={theme.colors.background} />
    </mesh>
  );
}
