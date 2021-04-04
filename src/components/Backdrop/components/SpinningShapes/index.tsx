import { OrthographicCamera } from '@react-three/drei';
import { ComponentType, Suspense, useMemo } from 'react';
import seedrandom from 'seedrandom';
import { useTheme } from 'styled-components';
import { Vector3Tuple } from 'three';
import Code from '../../../../models/Code';
import Curly from '../../../../models/Curly';
import FnCall from '../../../../models/FnCall';
import RotatingGroup from './RotatingGroup';
import Shape from './Shape';

/**
 * Pixels per THREE unit
 */
const ZOOM = 40;
const RANDOM_SEED = 'stuart';

interface RotationDefinition<T = any> {
  component: ComponentType<T>;
  props: T;
  position: Vector3Tuple;
  rotationSpeed: number;
}

function getRotation(radius: number, reverse: boolean): number {
  return (reverse ? -1 : 1) / (radius! ** 1.5 * 600);
}

export default function SpinningShapes() {
  const theme = useTheme();

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
        component: Shape,
        props: { variant: 'icosahedron', radius: 1.5, color: theme.colors.primary },
        position: [3.5, 5.5, 0],
        rotationSpeed: getRotation(1.5, true),
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
  }, [theme.colors.primary]);

  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={ZOOM}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={<></>}>
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
          </group>
        </Suspense>
      </OrthographicCamera>
    </>
  );
}
