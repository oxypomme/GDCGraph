import styled from "@emotion/styled";

export const HSeparator = styled.div<{ color?: string, width?: string }>`
    border-bottom: 1px solid ${props => props.color ? props.color : 'var(--background-light)'};
    ${props => props.width ? `width: ${props.width} ;` : ''}
`;