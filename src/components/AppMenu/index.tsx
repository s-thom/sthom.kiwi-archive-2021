import { useToggle } from 'react-use';
import MenuButton from './MenuButton';
import MenuModal from './MenuModal';

export default function AppMenu() {
  const [isOpen, toggleIsOpen] = useToggle(false);

  return (
    <>
      <MenuButton isOpen={isOpen} onClick={toggleIsOpen} />
      <MenuModal isOpen={isOpen} onClose={toggleIsOpen} />
    </>
  );
}
