import { useToggle } from 'react-use';
import MenuButton from './MenuButton';

export default function AppMenu() {
  const [isOpen, toggleIsOpen] = useToggle(false);

  return (
    <>
      <MenuButton isOpen={isOpen} onClick={toggleIsOpen} />
      {/* TODO: menu */}
    </>
  );
}
