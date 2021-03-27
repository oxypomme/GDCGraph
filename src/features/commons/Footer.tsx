import React from 'react';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons';

const Foot = styled.footer`
    background-color: var(--background-dark);
    text-align: center;
    font-size: 14px;
    height: var(--footer-size);
    padding: 5px;
    
    position:absolute;
    width:100%;
    bottom:0px;
`;

const LinkText = styled.span`
    text-decoration: underline;
`;

const IconWithLink = styled.a<{ margin?: string, VAlign?: boolean }>`
    ${props => props.VAlign ? "vertical-align: middle;" : ''}
    text-decoration: none;
    & > svg{
        ${props => props.margin ? "margin:" + props.margin + ";" : ''}
        transition: opacity 0.25s;
    }
    &:hover > svg{
        opacity: 0.75;
    }
`;

const Footer = (): JSX.Element => {
    return (
        <Foot>
            <p>
                All icons used are from <IconWithLink href="https://fontawesome.com"><FontAwesomeIcon icon={faFontAwesome} color="#339af0" /> <LinkText>Font Awesome</LinkText></IconWithLink>.
            </p>
            <p>
                <a href="https://github.com/oxypomme/gdcgraph/graphs/contributors">Liste des contributeurs</a>
            </p>
        </Foot>
    );
}

export default Footer;