import styled from 'styled-components';
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
  top: 0;
  left: 0;
  z-index: 11;

  background-color: ${({ theme }) => theme.colors.modal};
`;

export interface MenuModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  return (
    <Fade in={isOpen}>
      <ModalWrapper>
        <ModalShade onClick={onClose} />
        <ModalContentContainer>hello world</ModalContentContainer>
      </ModalWrapper>
    </Fade>
  );
}
