import { useContextBridge } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import styled, { ThemeContext, useTheme } from 'styled-components';

const StyledCanvas = styled(Canvas)`
  width: 100vw !important;
  height: 100vh !important;
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: 0;
`;

function Box(props: any) {
  const { colors } = useTheme();
  // This reference will give us direct access to the mesh
  const mesh = useRef<any>();
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x += 0.01;
  });
  // Return view, these are regular threejs elements expressed in JSX
  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={colors.background} />
    </mesh>
  );
}

export default function Backdrop() {
  const ContextBridge = useContextBridge(ThemeContext);

  return (
    <StyledCanvas>
      <ContextBridge>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </ContextBridge>
    </StyledCanvas>
  );
}
