import { OrthographicCamera } from '@react-three/drei';
import { useMemo } from 'react';
import { useTheme } from 'styled-components';
import Shape, { ShapeProps } from './Shape';
import useWindowSize from '../../../../hooks/useWindowSize';

/**
 * Pixels per THREE unit
 */
const ZOOM = 40;

export default function SpinningIcosahedrons() {
  const theme = useTheme();
  const windowSize = useWindowSize();

  const icosahedrons = useMemo<ShapeProps[]>(() => {
    const scaledWidth = windowSize.width / ZOOM;
    const scaledHeight = windowSize.height / ZOOM;

    const shapeList: ShapeProps[] = [
      { variant: 'dodecahedron', position: [-2.5, 6, 0], radius: 1, reverse: false },
      { variant: 'cube', position: [1.5, -4, 0], radius: 2.25, reverse: false },
      { variant: 'icosahedron', position: [-6, -0.5, 0], radius: 6, reverse: true },
      { variant: 'icosahedron', position: [3.5, 5.5, 0], radius: 1.5, reverse: true, color: theme.colors.primary },
      { variant: 'octahedron', position: [7, 8, 0], radius: 2, reverse: true },
      { variant: 'cube', position: [-5, 10, 0], radius: 3, reverse: false },
      { variant: 'icosahedron', position: [18, -10, 0], radius: 10, reverse: false },
      { variant: 'octahedron', position: [-17, -12, 0], radius: 6, reverse: false },
      { variant: 'cube', position: [19, 12, 0], radius: 8, reverse: false },
      { variant: 'octahedron', position: [-21, 14, 0], radius: 9, reverse: true },
      { variant: 'dodecahedron', position: [-25, 0, 0], radius: 4, reverse: false },
      { variant: 'dodecahedron', position: [27, 3, 0], radius: 5, reverse: true },
      { variant: 'dodecahedron', position: [0, -15, 0], radius: 3.5, reverse: true },
    ];

    return shapeList;
  }, [theme.colors.primary, windowSize.height, windowSize.width]);

  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={ZOOM}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <group position={[0, 0, -10]}>
          {icosahedrons.map((props, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Shape key={index} {...props} />
          ))}
        </group>
      </OrthographicCamera>
    </>
  );
}
