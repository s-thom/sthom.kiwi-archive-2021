import { useState, useEffect, useCallback } from 'react';
import { usePreviousDistinct, useWindowScroll } from 'react-use';
import MenuButton from './MenuButton';
import MenuModal from './MenuModal';

export default function AppMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldShowMenu, setShouldShowMenu] = useState(true);

  const onOpen = useCallback(() => {
    setIsOpen(true);
    setShouldShowMenu(false);
  }, [setIsOpen, setShouldShowMenu]);
  const onClose = useCallback(() => {
    setIsOpen(false);
    setShouldShowMenu(true);
  }, [setIsOpen, setShouldShowMenu]);

  const { y: windowScrollY } = useWindowScroll();
  const previousWindowScrollY = usePreviousDistinct(windowScrollY) ?? 0;
  useEffect(() => {
    if (windowScrollY < previousWindowScrollY) {
      setShouldShowMenu(true);
    } else if (windowScrollY > previousWindowScrollY) {
      setShouldShowMenu(false);
    }
  }, [previousWindowScrollY, setShouldShowMenu, windowScrollY]);

  return (
    <>
      <MenuButton isVisible={shouldShowMenu} onClick={onOpen} />
      <MenuModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
