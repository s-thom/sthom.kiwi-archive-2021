import { useContextBridge } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import styled, { ThemeContext } from 'styled-components';
import SpinningIcosahedrons from './components/SpinningIcosahedrons';

const StyledCanvas = styled(Canvas)`
  width: 100vw !important;
  height: 100vh !important;
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: 0;
`;

export default function Backdrop() {
  const ContextBridge = useContextBridge(ThemeContext);

  return (
    <StyledCanvas>
      <ContextBridge>
        <SpinningIcosahedrons />
      </ContextBridge>
    </StyledCanvas>
  );
}
