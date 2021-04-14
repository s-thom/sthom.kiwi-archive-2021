import { useContextBridge } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import styled, { ThemeContext } from 'styled-components';
import SpinningShapes from './components/SpinningShapes';

const StyledCanvas = styled(Canvas)`
  width: 100vw !important;
  height: 100vh !important;
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: -1;
`;

export default function Backdrop() {
  const ContextBridge = useContextBridge(ThemeContext);

  return (
    <Suspense fallback={<></>}>
      <StyledCanvas>
        <ContextBridge>
          <SpinningShapes />
        </ContextBridge>
      </StyledCanvas>
    </Suspense>
  );
}
