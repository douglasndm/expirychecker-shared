import styled, { css } from 'styled-components/native';
import FastImage from 'react-native-fast-image';

interface ICard {
    expired?: boolean;
    nextToExp?: boolean;
    threated?: boolean;
}

interface IProductInfo {
    expiredOrNext?: boolean;
}

export const Card = styled.Pressable<ICard>`
    flex: 1;
    flex-direction: column;
    margin: 3px 6px;
    padding: 15px;
    border-radius: 12px;

    elevation: 2;

    background-color: ${props => props.theme.colors.productBackground};

    ${props =>
        props.nextToExp &&
        css`
            background-color: ${props.theme.colors.productNextToExpBackground};
        `};
    ${props =>
        props.expired &&
        css`
            background-color: ${props.theme.colors.productExpiredBackground};
        `};
    ${props =>
        props.threated &&
        css`
            background-color: ${props.theme.colors.productThreatedBackground};
        `};
`;

export const Content = styled.View`
    flex-direction: row;
    align-items: center;
`;


export const ProductImage = styled(FastImage)`
    width: 85px;
    height: 85px;
    border-radius: 42px;
    margin-right: 10px;
`;

export const LoadingImage = styled.ActivityIndicator.attrs(({ theme }) => ({
    size: 50,
    color: theme.colors.accent,
}))``;

export const ProductExpDate = styled.Text<IProductInfo>`
    font-size: 16px;
    margin-left: 2px;
    margin-top: 5px;

    color: ${props =>
        props.expiredOrNext
            ? props.theme.colors.productNextOrExpiredText
            : props.theme.colors.productCardText};
`;
