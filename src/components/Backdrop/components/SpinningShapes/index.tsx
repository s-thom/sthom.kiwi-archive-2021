import { OrthographicCamera } from '@react-three/drei';
import { useMemo } from 'react';
import { useTheme } from 'styled-components';
import useWindowSize from '../../../../hooks/useWindowSize';
import Code from '../../../../models/Code';
import Curly from '../../../../models/Curly';
import FnCall from '../../../../models/FnCall';
import RotatingGroup from './RotatingGroup';
import Shape, { ShapeProps } from './Shape';

/**
 * Pixels per THREE unit
 */
const ZOOM = 40;

export default function SpinningShapes() {
  const theme = useTheme();
  const windowSize = useWindowSize();

  const shapes = useMemo<ShapeProps[]>(() => {
    const scaledWidth = windowSize.width / ZOOM;
    const scaledHeight = windowSize.height / ZOOM;

    const shapeList: ShapeProps[] = [
      { variant: 'dodecahedron', position: [-2.5, 6, 0], radius: 1 },
      { variant: 'cube', position: [1.5, -4, 0], radius: 2.25 },
      { variant: 'icosahedron', position: [-6, -0.5, 0], radius: 6 },
      { variant: 'icosahedron', position: [3.5, 5.5, 0], radius: 1.5, color: theme.colors.primary },
      { variant: 'octahedron', position: [7, 8, 0], radius: 2 },
      { variant: 'cube', position: [-5, 10, 0], radius: 3 },
      { variant: 'icosahedron', position: [18, -10, 0], radius: 10 },
      { variant: 'octahedron', position: [-17, -12, 0], radius: 6 },
      { variant: 'cube', position: [19, 12, 0], radius: 8 },
      { variant: 'octahedron', position: [-21, 14, 0], radius: 9 },
      { variant: 'dodecahedron', position: [-25, 0, 0], radius: 4 },
      { variant: 'dodecahedron', position: [27, 3, 0], radius: 5 },
      { variant: 'dodecahedron', position: [0, -15, 0], radius: 3.5 },
    ];

    return shapeList;
  }, [theme.colors.primary, windowSize.height, windowSize.width]);

  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={ZOOM}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <group position={[0, 0, -10]}>
          {shapes.map(({ position, radius, ...shapeProps }, index) => (
            <RotatingGroup
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              position={position}
              rotationSpeed={(index % 2 ? -1 : 1) / (radius! ** 1.5 * 600)}
            >
              <Shape radius={radius} {...shapeProps} />
            </RotatingGroup>
          ))}
          <RotatingGroup position={[0, -6, 0]} rotationSpeed={0.0005}>
            <Code scale={[10, 10, 10]} />
          </RotatingGroup>
          <RotatingGroup position={[-6, -6, 0]} rotationSpeed={0.0005}>
            <FnCall scale={[10, 10, 10]} />
          </RotatingGroup>
          <RotatingGroup position={[6, -6, 0]} rotationSpeed={0.0005}>
            <Curly scale={[10, 10, 10]} />
          </RotatingGroup>
        </group>
      </OrthographicCamera>
    </>
  );
}
