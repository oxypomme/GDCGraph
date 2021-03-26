import styled from "@emotion/styled";

export const HSeparator = styled.div<{ color?: string, width?: string }>`
    border-bottom: 1px solid ${props => props.color ? props.color : 'var(--background-light)'};
    ${props => props.width ? `width: ${props.width} ;` : ''}
`;
export const VSeparator = styled.div<{ color?: string, height?: string }>`
    border-left: 1px solid ${props => props.color ? props.color : 'var(--background-light)'};
    ${props => props.height ? `height: ${props.height} ;` : ''}
`;