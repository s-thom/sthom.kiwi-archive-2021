import { useEffect, useCallback } from 'react';
import { usePreviousDistinct, useToggle, useWindowScroll } from 'react-use';
import MenuButton from './MenuButton';
import MenuModal from './MenuModal';

export default function AppMenu() {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [shouldShowMenu, toggleShouldShowMenu] = useToggle(true);

  const onOpen = useCallback(() => {
    toggleIsOpen(true);
    toggleShouldShowMenu(false);
  }, [toggleIsOpen, toggleShouldShowMenu]);
  const onClose = useCallback(() => {
    toggleIsOpen(false);
    toggleShouldShowMenu(true);
  }, [toggleIsOpen, toggleShouldShowMenu]);

  const { y: windowScrollY } = useWindowScroll();
  const previousWindowScrollY = usePreviousDistinct(windowScrollY);
  useEffect(() => {
    if (windowScrollY < (previousWindowScrollY ?? 0)) {
      toggleShouldShowMenu(true);
    } else if (windowScrollY > (previousWindowScrollY ?? 0)) {
      toggleShouldShowMenu(false);
    }
  }, [previousWindowScrollY, toggleShouldShowMenu, windowScrollY]);

  return (
    <>
      <MenuButton isOpen={!shouldShowMenu} onClick={onOpen} />
      <MenuModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
