import { useCallback } from 'react';
import styled from 'styled-components';
import { ThemeMode, useThemeMode } from '../../hooks/useThemeMode';
import Fade from '../Fade';

const ModalWrapper = styled.div`
  position: absolute;
`;

const ModalShade = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000055;
  z-index: 10;
`;

const ModalContentContainer = styled.div`
  position: fixed;
  top: 2em;
  left: 2em;
  width: calc(100vw - 4em);
  height: calc(100vh - 4em);
  z-index: 11;

  background-color: ${({ theme }) => theme.colors.modal};
`;

export interface MenuModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const { preference, setPreference } = useThemeMode();

  const changeHandler = useCallback<React.ChangeEventHandler<HTMLSelectElement>>(
    (event) => {
      setPreference(event.target.value as ThemeMode);
    },
    [setPreference],
  );

  return (
    <Fade in={isOpen}>
      <ModalWrapper>
        <ModalShade onClick={onClose} />
        <ModalContentContainer>
          <div>
            <h2>Settings</h2>
          </div>
          <div>
            <p>Theme</p>
            <select value={preference} onChange={changeHandler}>
              <option value="auto">System Auto</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </ModalContentContainer>
      </ModalWrapper>
    </Fade>
  );
}
