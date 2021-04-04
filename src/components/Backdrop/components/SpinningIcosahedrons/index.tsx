import { OrthographicCamera } from '@react-three/drei';
import { useMemo } from 'react';
import seedrandom from 'seedrandom';
import Ico, { IcoProps } from './Ico';
import useWindowSize from '../../../../hooks/useWindowSize';

/**
 * Pixels per THREE unit
 */
const ZOOM = 40;
/**
 * Number of items to have per area unit
 */
const DENSITY = 0.000005;
const RANDOM_SEED = 'stuart';

export default function SpinningIcosahedrons() {
  const windowSize = useWindowSize();

  const icosahedrons = useMemo<IcoProps[]>(() => {
    const random = seedrandom(RANDOM_SEED);

    const scaledWidth = windowSize.width / ZOOM;
    const scaledHeight = windowSize.height / ZOOM;

    const area = windowSize.width * windowSize.height;
    const numIcos = Math.floor(area * DENSITY);

    return [...Array(numIcos)].map(() => ({
      position: [random() * scaledWidth - scaledWidth / 2, random() * scaledHeight - scaledHeight / 2, 0],
      radius: random() ** 2 * 3.5 + 0.25,
      reverse: random() > 0.5,
    }));
  }, [windowSize.height, windowSize.width]);

  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={ZOOM}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <group position={[0, 0, -10]}>
          {icosahedrons.map((props, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Ico key={index} {...props} />
          ))}
        </group>
      </OrthographicCamera>
    </>
  );
}
