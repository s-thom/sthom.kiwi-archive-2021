import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import portraitSrc from './portrait-2020.jpg';

const HeaderArea = styled.header``;

const HeaderProfile = styled.a`
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

const BreadcrumbLink = styled.a`
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

export interface Breadcrumbs {
  path: string;
  name: string;
}

export interface HeaderProps {
  className?: string;
  breadcrumbs?: Breadcrumbs[];
}

export default function Header({ className, breadcrumbs }: HeaderProps) {
  return (
    <HeaderArea className={className}>
      <Link href="/" passHref>
        <HeaderProfile>
          <ProfilePhoto src={portraitSrc} alt="Stuart Thomson" width={48} height={48} priority />
          <ProfileName>Stuart Thomson</ProfileName>
        </HeaderProfile>
      </Link>
      {breadcrumbs && (
        <nav aria-label="Breadcrumbs">
          {breadcrumbs.map(({ path, name }, index) => (
            <React.Fragment key={path}>
              {index > 0 && <BreadcrumbSeparator> / </BreadcrumbSeparator>}
              <Link href={path} passHref>
                <BreadcrumbLink>{name}</BreadcrumbLink>
              </Link>
            </React.Fragment>
          ))}
        </nav>
      )}
    </HeaderArea>
  );
}
