import React from 'react';

import strings from '@shared/Locales';

import { TextContainer, ProductName, ProductDetails, ProductInfoItem } from './styles';

interface Props {
    product: IProduct;
    storeName: string | null | undefined;
    expiredOrNext?: boolean;
}

const Text: React.FC<Props> = ({ product, storeName, expiredOrNext }: Props) => {
    return (
        <TextContainer>
            <ProductName expiredOrNext={expiredOrNext}>
                {product.name}
            </ProductName>
            <ProductDetails>
                {!!product.code && (
                    <ProductInfoItem expiredOrNext={expiredOrNext}>
                        {strings.ProductCardComponent_ProductCode}:
                        {product.code}
                    </ProductInfoItem>
                )}

                {product.batches.length > 0 && !!product.batches[0].name && (
                    <ProductInfoItem expiredOrNext={expiredOrNext}>
                        {strings.ProductCardComponent_ProductBatch}:{' '}
                        {product.batches[0].name}
                    </ProductInfoItem>
                )}

                {product.batches.length > 1 && (
                    <ProductInfoItem expiredOrNext={expiredOrNext}>
                        {`${product.batches.length - 1} ${
                            strings.ProductCardComponent_OthersBatches
                        }`}
                    </ProductInfoItem>
                )}

                {!!storeName && (
                    <ProductInfoItem expiredOrNext={expiredOrNext}>
                        {strings.ProductCardComponent_ProductStore}:{' '}
                        {storeName}
                    </ProductInfoItem>
                )}

                {product.batches.length > 0 &&
                    !!product.batches[0].amount && (
                        <ProductInfoItem expiredOrNext={expiredOrNext}>
                            {`${strings.ProductCardComponent_ProductAmount}: ${product.batches[0].amount}`}
                        </ProductInfoItem>
                    )}
            </ProductDetails>
        </TextContainer>
    )
}

export default Text;
