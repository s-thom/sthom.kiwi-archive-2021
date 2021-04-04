import { OrthographicCamera } from '@react-three/drei';
import { useMemo } from 'react';
import Ico, { IcoProps } from './Ico';

const ZOOM = 40;

export default function SpinningIcosahedrons() {
  const icosahedrons = useMemo<IcoProps[]>(() => {
    return [
      { position: [-0.5, -2.5, 0], radius: 1 },
      { position: [-2, 2, 0], radius: 0.25, reverse: true },
      { position: [2, -1, 0], radius: 0.75, reverse: true },
      { position: [1.25, 2, 0], radius: 0.75 },
      { position: [-10, 1.5, -2], radius: 2 },
    ];
  }, []);

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
