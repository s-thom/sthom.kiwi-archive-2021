import styled from 'styled-components';

const ButtonWrapper = styled.button<{ isVisible?: boolean }>`
  position: fixed;
  top: 0.25em;
  right: 0;
  border: 0;
  background-color: ${({ theme }) => theme.colors.modal};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 0 0 0.5em;
  border-top-left-radius: 1.25em;
  border-bottom-left-radius: 1.25em;
  font-size: 0.8em;
  outline: none;
  transition: transform 0.2s ease-out;
  transform: ${({ isVisible }) => (isVisible ? `translateX(0%)` : `translateX(100%)`)};
`;

const Icon = styled.svg`
  width: 1.5em;
  height: 1.5em;
  margin: 0.5em;
  fill: ${({ theme }) => theme.colors.text};
  display: block;
`;

export interface MenuButtonProps {
  isVisible?: boolean;
  onClick?: () => void;
}

export default function MenuButton({ isVisible, onClick }: MenuButtonProps) {
  return (
    <ButtonWrapper isVisible={isVisible} onClick={onClick}>
      <Icon viewBox="0 0 24 24">
        <title>Menu</title>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      </Icon>
    </ButtonWrapper>
  );
}
