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
  display: flex;
  flex-direction: column;
  top: 2em;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100vw - 4em);
  height: calc(100vh - 4em);
  max-width: 20em;
  max-height: 15em;
  z-index: 11;

  background-color: ${({ theme }) => theme.colors.modal};
  color: ${({ theme }) => theme.colors.text};
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  flex-grow: 1;
`;

const ModalFill = styled.div`
  flex-grow: 1;
`;

const CloseIcon = styled.svg`
  position: absolute;
  top: 0;
  right: 0;
  width: 1.5em;
  height: 1.5em;
  margin: 0.5em;
  fill: ${({ theme }) => theme.colors.text};
  display: block;
`;

const ModalTitle = styled.h2`
  text-align: center;
`;

const Link = styled.a`
  font-size: 0.8em;
  color: ${({ theme }) => theme.colors.text};
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
          <CloseIcon role="button" viewBox="0 0 24 24" onClick={onClose}>
            <title>Close</title>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </CloseIcon>
          <ModalContent>
            <ModalTitle>Site Preferences</ModalTitle>
            <ModalFill>
              <p>
                Theme:{' '}
                <select value={preference} onChange={changeHandler}>
                  <option value="auto">System Auto</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </p>
            </ModalFill>
            <p>
              <Link
                href="https://github.com/s-thom/sthom.kiwi"
                aria-label="GitHub"
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                Website source code
              </Link>
            </p>
          </ModalContent>
        </ModalContentContainer>
      </ModalWrapper>
    </Fade>
  );
}
