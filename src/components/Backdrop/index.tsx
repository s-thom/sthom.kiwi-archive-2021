import { OrthographicCamera, useContextBridge } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ComponentType, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import seedrandom from 'seedrandom';
import styled, { ThemeContext } from 'styled-components';
import { Vector3Tuple } from 'three';
import Code from '../../models/Code';
import Curly from '../../models/Curly';
import FnCall from '../../models/FnCall';
import BlueOrb from './BlueOrb';
import RotatingGroup from './RotatingGroup';
import Shape from './Shape';

/**
 * Pixels per THREE unit
 */
const ZOOM = 40;
const RANDOM_SEED = 'stuart';

const StyledCanvas = styled(Canvas)<{ ready: boolean }>`
  width: 100vw !important;
  height: 100vh !important;
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: ${({ theme }) => theme.colors.dark};
  opacity: 0;

  ${({ ready }) => (ready ? 'animation: 0.5s ease-in both FadeIn;' : '')}
`;

interface RotationDefinition<T = any> {
  component: ComponentType<T>;
  props: T;
  position: Vector3Tuple;
  rotationSpeed: number;
}

function getRotation(radius: number, reverse: boolean): number {
  return (reverse ? -1 : 1) / (radius! ** 1.5 * 600);
}

interface OnRenderProps {
  onRender: () => void;
}

function OnRender({ onRender }: OnRenderProps) {
  useEffect(() => {
    onRender();
  }, [onRender]);

  return null;
}

export default function Backdrop() {
  const ContextBridge = useContextBridge(ThemeContext);
  const shapes = useMemo<RotationDefinition[]>(() => {
    const random = seedrandom(RANDOM_SEED);

    const shapeList: RotationDefinition[] = [
      {
        component: Shape,
        props: { variant: 'dodecahedron', radius: 1 },
        position: [-2.5, 6, 0],
        rotationSpeed: getRotation(1, false),
      },
      {
        component: Curly,
        props: { scale: [2, 2, 2], rotation: [0, random() * Math.PI - Math.PI / 2, 0] },
        position: [1.5, -6, 0],
        rotationSpeed: getRotation(2, true),
      },
      {
        component: Code,
        props: { scale: [10, 10, 10], rotation: [0, random() * Math.PI - Math.PI / 2, 0] },
        position: [-5, -0.5, 0],
        rotationSpeed: getRotation(6, false),
      },
      {
        component: Curly,
        props: { scale: [6, 6, 6], rotation: [0, random() * Math.PI - Math.PI / 2, 0] },
        position: [7, 8, 0],
        rotationSpeed: getRotation(2, false),
      },
      {
        component: FnCall,
        props: { scale: [4, 4, 4], rotation: [0, random() * Math.PI - Math.PI / 2, 0] },
        position: [-5, 10, 0],
        rotationSpeed: getRotation(2, true),
      },
      {
        component: FnCall,
        props: { scale: [20, 20, 20], rotation: [0, random() * Math.PI - Math.PI / 2, 0] },
        position: [18, -10, 0],
        rotationSpeed: getRotation(10, false),
      },
      {
        component: Shape,
        props: { variant: 'icosahedron', radius: 6 },
        position: [-17, -12, 0],
        rotationSpeed: getRotation(6, false),
      },
      {
        component: Shape,
        props: { variant: 'icosahedron', radius: 6 },
        position: [19, 12, 0],
        rotationSpeed: getRotation(8, false),
      },
      {
        component: Shape,
        props: { variant: 'octahedron', radius: 9 },
        position: [-21, 14, 0],
        rotationSpeed: getRotation(9, false),
      },
      {
        component: Shape,
        props: { variant: 'dodecahedron', radius: 4 },
        position: [-25, 0, 0],
        rotationSpeed: getRotation(4, false),
      },
      {
        component: Shape,
        props: { variant: 'dodecahedron', radius: 5 },
        position: [27, 3, 0],
        rotationSpeed: getRotation(5, false),
      },
      {
        component: Shape,
        props: { variant: 'dodecahedron', radius: 3.5 },
        position: [0, -15, 0],
        rotationSpeed: getRotation(3.5, false),
      },
    ];

    return shapeList;
  }, []);

  const [isReady, setIsReady] = useState(false);
  const setReady = useCallback(() => setIsReady(true), []);

  return (
    <StyledCanvas ready={isReady}>
      <ContextBridge>
        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={ZOOM}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={<></>}>
            <OnRender onRender={setReady} />
            <group position={[0, 0, -10]}>
              {shapes.map(({ component: Component, position, rotationSpeed, props }, index) => (
                <RotatingGroup
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  position={position}
                  rotationSpeed={rotationSpeed}
                >
                  <Component {...props} />
                </RotatingGroup>
              ))}
              <RotatingGroup position={[3.5, 5.5, 0]} rotationSpeed={getRotation(1.5, true)}>
                <BlueOrb radius={1.5} />
              </RotatingGroup>
            </group>
          </Suspense>
        </OrthographicCamera>
      </ContextBridge>
    </StyledCanvas>
  );
}
