import styled from 'styled-components/native';

interface IProductInfo {
    expiredOrNext?: boolean;
}

export const TextContainer = styled.View`
    flex-direction: column;
    flex: 1;
`;

export const ProductName = styled.Text<IProductInfo>`
    font-size: 22px;
    font-weight: bold;

    color: ${props =>
        props.expiredOrNext
            ? props.theme.colors.productNextOrExpiredText
            : props.theme.colors.productCardText};
`;

export const ProductDetails = styled.View`
    flex-direction: column;
    justify-content: space-between;
`;


export const ProductInfoItem = styled.Text<IProductInfo>`
    color: rgba(0, 0, 0, 0.3);
    font-size: 13px;
    margin-left: 2px;

    font-family: 'Open Sans';
    font-weight: bold;

    color: ${props =>
        props.expiredOrNext
            ? props.theme.colors.productNextOrExpiredText
            : props.theme.colors.productCardText};
`;
