import Image from 'next/image';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import portraitSrc from '../../resources/portrait-2020.jpg';
import Link from '../Link';

const HeaderArea = styled.header`
  font-size: 1.1em;
`;

const HeaderProfile = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: 0.5em;

  @media (${({ theme }) => theme.mediaQueries.blog.tablet}) {
    flex-direction: column;
    text-align: center;
  }

  @media (${({ theme }) => theme.mediaQueries.blog.desktop}) {
    /* justify-content: start;
    justify-content: flex-start; */
  }
`;

const ProfilePhotoWrapper = styled.div`
  width: 48px;

  @media (${({ theme }) => theme.mediaQueries.blog.tablet}) {
    width: 96px;
  }
`;

const ProfilePhoto = styled(Image)`
  border-radius: 50%;
`;

const ProfileName = styled.h1`
  margin: 0;
  margin-left: 0.5em;
`;

const Breadcrumbs = styled.nav`
  font-size: 0.8em;
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
  const theme = useTheme();

  return (
    <HeaderArea className={className}>
      <HeaderProfile href="/">
        <ProfilePhotoWrapper>
          <ProfilePhoto
            src={portraitSrc}
            alt="Stuart Thomson"
            width={96}
            height={96}
            sizes={`(${theme.mediaQueries.blog.tablet}) 96px, 48px`}
            priority
          />
        </ProfilePhotoWrapper>

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
