import { GroupProps, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export interface RotatingGroupProps extends GroupProps {
  rotationSpeed?: number;
}

export default function RotatingGroup({ rotationSpeed, ...groupProps }: React.PropsWithChildren<RotatingGroupProps>) {
  const group = useRef<any>();
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += rotationSpeed;
    }
  });

  return <group ref={group} {...groupProps} />;
}
