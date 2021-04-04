import Ico from './Ico';

export default function SpinningIcosahedrons() {
  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Ico position={[0, 0, 0]} radius={1} rotationSpeed={-0.0005} />
    </>
  );
}
