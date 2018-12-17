import * as _ from 'lodash';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import { Link as ReactRouterLink } from 'react-router-dom';
import styled from 'styled-components';

import { Logo } from 'ts/@next/components/logo';
import { Column, FlexWrap, WrapGrid } from 'ts/@next/components/newLayout';
import { NewsletterForm } from 'ts/@next/components/newsletter_form';
import { WebsitePaths } from 'ts/types';

interface LinkInterface {
    text: string;
    url: string;
    newWindow?: boolean;
}

interface LinkRows {
    heading: string;
    isOnMobile?: boolean;
    links: LinkInterface[];
}

interface LinkListProps {
    links: LinkInterface[];
}

const linkRows: LinkRows[] = [
    {
        heading: 'Products',
        isOnMobile: true,
        links: [
            { url: WebsitePaths.Instant, text: '0x Instant' },
            { url: WebsitePaths.LaunchKit, text: '0x Launch Kit' },
        ],
    },
    {
        heading: 'Developers',
        links: [
            { url: '#', text: 'Documentation' },
            { url: '#', text: 'GitHub' },
            { url: '#', text: 'Whitepaper' },
        ],
    },
    {
        heading: 'About',
        isOnMobile: true,
        links: [
            { url: WebsitePaths.AboutMission, text: 'Mission' },
            { url: WebsitePaths.AboutTeam, text: 'Team' },
            { url: WebsitePaths.AboutJobs, text: 'Jobs' },
            { url: WebsitePaths.AboutPress, text: 'Press Kit' },
            { url: WebsitePaths.Ecosystem, text: 'Grant Program' },
        ],
    },
    {
        heading: 'Community',
        isOnMobile: true,
        links: [
            { url: '#', text: 'Twitter' },
            { url: '#', text: 'Rocket Chat' },
            { url: '#', text: 'Facebook' },
            { url: '#', text: 'Reddit' },
        ],
    },
];

export const Footer: React.StatelessComponent = () => (
    <FooterWrap>
        <FlexWrap>
            <FooterColumn width="35%">
                <Logo />
                <NewsletterForm />
            </FooterColumn>

            <FooterColumn width="55%">
                <WrapGrid isCentered={false} isWrapped={true}>
                    {_.map(linkRows, (row: LinkRows, index) => (
                        <MediaQuery minWidth={row.isOnMobile ? 0 : 768} key={`fc-${index}`}>
                            <FooterSectionWrap>
                                <RowHeading>
                                    {row.heading}
                                </RowHeading>

                                <LinkList links={row.links} />
                            </FooterSectionWrap>
                        </MediaQuery>
                    ))}
                </WrapGrid>
            </FooterColumn>
        </FlexWrap>
    </FooterWrap>
);

const LinkList = (props: LinkListProps) => (
  <List>
    {_.map(props.links, (link, index) => (
      <li key={`fl-${index}`}>
        <Link to={link.url}>
          {link.text}
        </Link>
      </li>
    ))}
  </List>
);

const FooterWrap = styled.footer`
    padding: 40px 30px 30px 30px;
    margin-top: 30px;
    background-color: ${props => props.theme.footerBg};
    color: ${props => props.theme.footerColor};

    path {
        fill: ${props => props.theme.footerColor};
    }

    @media (min-width: 768px) {
        height: 350px;
    }
`;

const FooterColumn = styled(Column)`
    @media (min-width: 768px) {
        width: ${props => props.width};
    }

    @media (max-width: 768px) {
        text-align: left;
    }
`;

const FooterSectionWrap = styled(FooterColumn)`
    @media (max-width: 768px) {
        width: 50%;

        & + & {
            margin-top: 0;
            margin-bottom: 30px;
        }
    }
`;

const RowHeading = styled.h3`
    color: inherit;
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 1.25em;
    opacity: 0.75;
`;

const List = styled.ul`
    li + li {
        margin-top: 8px;
    }
`;

const Link = styled(ReactRouterLink)`
    color: inherit;
    opacity: 0.5;
    display: block;
    font-size: 16px;
    line-height: 20px;
    transition: opacity 0.25s;
    text-decoration: none;

    &:hover {
        opacity: 0.8;
    }
`;