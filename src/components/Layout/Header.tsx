import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import portraitSrc from './portrait-2020.jpg';
import Link from '../Link';

const HeaderArea = styled.header``;

const HeaderProfile = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
`;

const ProfilePhoto = styled(Image)`
  border-radius: 24px;
`;

const ProfileName = styled.h1`
  margin-left: 0.5em;
`;

const Breadcrumbs = styled.nav`
  font-size: 0.9em;
`;

const BreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.2s ease-out;

  &:hover {
    opacity: 1;
  }
`;

const BreadcrumbSeparator = styled.span`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
`;

export interface Breadcrumb {
  path: string;
  name: string;
}

export interface HeaderProps {
  className?: string;
  breadcrumbs?: Breadcrumb[];
}

export default function Header({ className, breadcrumbs }: HeaderProps) {
  return (
    <HeaderArea className={className}>
      <HeaderProfile href="/">
        <ProfilePhoto src={portraitSrc} alt="Stuart Thomson" width={48} height={48} priority />
        <ProfileName>Stuart Thomson</ProfileName>
      </HeaderProfile>
      {breadcrumbs && (
        <Breadcrumbs aria-label="Breadcrumbs">
          {breadcrumbs.map(({ path, name }, index) => (
            <React.Fragment key={path}>
              {index > 0 && <BreadcrumbSeparator> / </BreadcrumbSeparator>}
              <BreadcrumbLink href={path}>{name}</BreadcrumbLink>
            </React.Fragment>
          ))}
        </Breadcrumbs>
      )}
    </HeaderArea>
  );
}
