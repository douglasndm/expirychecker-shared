import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getLocales } from 'react-native-localize';
import FastImage from 'react-native-fast-image';
import { addDays, format, formatDistanceToNow, isPast, isDate, parseISO } from 'date-fns'; // eslint-disable-line
import { ptBR, enUS } from 'date-fns/locale' // eslint-disable-line

import strings from '@shared/Locales';

import Text from './Text';

import {
	Container,
	Card,
	Content,
	ProductExpDate,
	ProductImage,
	LoadingImage,
} from './styles';

interface Request {
	product: IProduct;
	storeName?: string;
	showImage?: boolean;
	imagePath?: string;
	daysToBeNext?: number;
	onLongPress?: () => void;
}
function Product({
	product,
	storeName,
	showImage = true,
	imagePath,
	daysToBeNext = 30,
	onLongPress,
}: Request) {
	const { navigate } = useNavigation();

	const [isImgLoading, setIsImgLoading] = useState(false);
	const [imgFailedToLoad, setImgFailedToLoad] = useState(false);

	const [languageCode] = useState(() => {
		if (getLocales()[0].languageCode === 'en') {
			return enUS;
		}
		return ptBR;
	});
	const [dateFormat] = useState(() => {
		if (getLocales()[0].languageCode === 'en') {
			return 'MM/dd/yyyy';
		}
		return 'dd/MM/yyyy';
	});

	const batch = useMemo(() => {
		let bat: IBatch | null = null;

		product.batches.forEach(l => {
			if (!bat && l.status !== 'checked') {
				bat = l;
			}
		});

		if (!bat && !!product.batches[0]) {
            bat = product.batches[0]; // eslint-disable-line
		}

		return bat;
	}, [product.batches]);

	const exp_date = useMemo(() => {
		if (batch) {
			if (isDate(batch.exp_date)) {
				return batch.exp_date as Date;
			}
			return parseISO(batch.exp_date);
		}
		return null;
	}, [batch]);

	const expired = useMemo(() => {
		if (exp_date) {
			if (isPast(exp_date)) {
				return true;
			}
		}

		return false;
	}, [exp_date]);

	const nextToExp = useMemo(() => {
		if (exp_date) {
			if (product.daysToBeNext && product.daysToBeNext > 0) {
				const dateToCheck = addDays(new Date(), product.daysToBeNext);

				if (dateToCheck >= exp_date) {
					return true;
				}
			}

			const dateToCheck = addDays(new Date(), daysToBeNext);

			if (dateToCheck >= exp_date) {
				return true;
			}
		}

		return false;
	}, [exp_date, product.daysToBeNext, daysToBeNext]);

	const expiredOrNext = useMemo(() => {
		return !!(expired || nextToExp);
	}, [expired, nextToExp]);

	const onLoadStart = useCallback(() => {
		setIsImgLoading(true);
	}, []);

	const onLoadEnd = useCallback(() => {
		setIsImgLoading(false);
	}, []);

	const handleNavigateToProduct = useCallback(() => {
		navigate('ProductDetails', { id: product.id });
	}, [navigate, product.id]);

	return (
		<Container>
			<Card
				expired={expired}
				nextToExp={nextToExp}
				threated={batch?.status === 'checked'}
				onPress={handleNavigateToProduct}
				onLongPress={onLongPress}
			>
				<Content>
					{showImage && !!imagePath && !imgFailedToLoad && (
						<>
							{isImgLoading && <LoadingImage />}

							<ProductImage
								source={{
									uri: imagePath,
									priority: FastImage.priority.low,
								}}
								onLoadStart={onLoadStart}
								onLoadEnd={onLoadEnd}
								onError={err => {
									setImgFailedToLoad(true);
								}}
							/>
						</>
					)}

					<Text
						product={product}
						storeName={storeName}
						expiredOrNext={expiredOrNext}
					/>
				</Content>

				{!!exp_date && (
					<ProductExpDate expiredOrNext={expiredOrNext}>
						{expired
							? strings.ProductCardComponent_ProductExpiredIn
							: strings.ProductCardComponent_ProductExpireIn}
						{` ${formatDistanceToNow(exp_date, {
							addSuffix: true,
							locale: languageCode,
						})}`}
						{format(exp_date, `, EEEE, ${dateFormat}`, {
							locale: languageCode,
						})}
					</ProductExpDate>
				)}
			</Card>
		</Container>
	);
}

export default React.memo(Product);
