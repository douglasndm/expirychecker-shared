import React, { memo, useMemo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getLocales } from 'react-native-localize';
import { isPast, addDays, format, isDate, parseISO } from 'date-fns';//eslint-disable-line
import { ptBR, enUS } from 'date-fns/locale' // eslint-disable-line
import NumberFormat from 'react-number-format';

import { RowContainer, TableRow, TableCell, Text } from './styles';

interface Props {
	productId: string;
	batch: IBatch;
	daysToBeNext?: number;
	onLongPress: () => void;
}

const ItemRow: React.FC<Props> = ({
	batch,
	productId,
	daysToBeNext = 30,
	onLongPress,
}: Props) => {
	const { navigate } = useNavigation<StackNavigationProp<RoutesParams>>();

	const languageCode = useMemo(() => {
		if (getLocales()[0].languageCode === 'en') {
			return enUS;
		}
		return ptBR;
	}, []);

	const dateFormat = useMemo(() => {
		if (getLocales()[0].languageCode === 'en') {
			return 'MM/dd/yyyy';
		}
		return 'dd/MM/yyyy';
	}, []);

	const currencyPrefix = useMemo(() => {
		if (getLocales()[0].countryCode === 'BR') {
			return 'R$';
		}
		if (getLocales()[0].countryCode === 'PT') {
			return '€';
		}
		return '$';
	}, []);

	const batch_date = useMemo(() => {
		if (isDate(batch.exp_date)) {
			return new Date(batch.exp_date);
		}

		return parseISO(batch.exp_date);
	}, [batch.exp_date]);

	const expired = useMemo(() => isPast(batch_date), [batch_date]);
	const nextToExp = useMemo(() => {
		return addDays(new Date(), daysToBeNext) > batch_date;
	}, [batch_date, daysToBeNext]);

	const treated = useMemo(
		() => batch.status?.toLowerCase() === 'checked',
		[batch.status]
	);

	const price = useMemo(() => {
		if (batch.amount && batch.price) {
			return (
				batch.amount *
				parseFloat(String(batch.price).replace(/\$/g, ''))
			);
		}

		return 0;
	}, [batch.amount, batch.price]);

	const handleNavigateEditBatch = useCallback(() => {
		navigate('EditBatch', {
			productId,
			batchId: batch.id,
		});
	}, [batch.id, navigate, productId]);

	return (
		<RowContainer
			onLongPress={onLongPress}
			onPress={handleNavigateEditBatch}
		>
			<TableRow
				key={batch.id}
				expired={expired}
				nextToExp={nextToExp}
				treated={treated}
			>
				<TableCell>
					<Text
						expired={expired}
						nextToExp={nextToExp}
						treated={treated}
					>
						{!!batch.name ? batch.name : batch.id}
					</Text>
				</TableCell>
				<TableCell>
					<Text
						expired={expired}
						nextToExp={nextToExp}
						treated={treated}
					>
						{format(batch_date, dateFormat, {
							locale: languageCode,
						})}
					</Text>
				</TableCell>
				<TableCell style={{ justifyContent: 'center' }}>
					<Text
						expired={expired}
						nextToExp={nextToExp}
						treated={treated}
					>
						{batch.amount}
					</Text>
				</TableCell>

				<TableCell>
					<Text
						expired={expired}
						nextToExp={nextToExp}
						treated={treated}
					>
						<NumberFormat
							value={price}
							displayType="text"
							thousandSeparator
							prefix={currencyPrefix}
							renderText={value => value}
							decimalScale={2}
						/>
					</Text>
				</TableCell>
			</TableRow>
		</RowContainer>
	);
};

export default memo(ItemRow);
