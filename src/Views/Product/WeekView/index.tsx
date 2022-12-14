import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
	addDays,
	compareAsc,
	eachWeekOfInterval,
	format,
	isPast,
} from 'date-fns';
import { getLocales } from 'react-native-localize';
import { showMessage } from 'react-native-flash-message';
import Accordion from 'react-native-collapsible/Accordion';

import strings from '@shared/Locales';

import Loading from '@components/Loading';
import Header from '@components/Header';
import ProductCard from '@components/Product/List/Card';
import FloatButton from '@components/FloatButton';

import {
	Container,
	PageContent,
	ProductCount,
	WeekContainer,
	WeekText,
} from './styles';

interface Props {
	products: IProduct[];
	howManyDaysToBeNextToExpire?: number;
	isLoading?: boolean;
}

const WeekView: React.FC<Props> = ({
	products,
	howManyDaysToBeNextToExpire = 30,
	isLoading,
}: Props) => {
	const [isRendering, setIsRendering] = useState<boolean>(true);

	const [weeks, setWeeks] = useState<WeekProps[]>([]);
	const [activeSection, setActiveSection] = useState<number[]>([]);

	const dateFormat = useMemo(() => {
		if (getLocales()[0].languageCode === 'en') {
			return 'MM/dd/yyyy';
		}
		return 'dd/MM/yyyy';
	}, []);

	useEffect(() => {
		try {
			setIsRendering(true);

			const batches: IBatch[] = [];

			products.forEach(p => p.batches.forEach(b => batches.push(b)));

			const sorted = batches.sort((b1, b2) =>
				compareAsc(b1.exp_date, b2.exp_date)
			);

			if (sorted.length > 0) {
				const weeksInUse = eachWeekOfInterval({
					start: sorted[0].exp_date,
					end: sorted[sorted.length - 1].exp_date,
				});

				const weeksProds = weeksInUse.map(week => {
					const prods: IProduct[] = [];

					const weekLimit = addDays(week, 7);

					products.forEach(prod => {
						const filtedBatches = prod.batches.filter(b => {
							const { exp_date } = b;

							if (compareAsc(weekLimit, exp_date) >= 0) {
								if (compareAsc(exp_date, week) >= 0) {
									if (b.status?.toLowerCase() !== 'tratado') {
										return true;
									}
								}
							}
							return false;
						});

						if (filtedBatches.length > 0) {
							prods.push({
								...prod,
								batches: filtedBatches,
							});
						}
					});

					const weekProps: WeekProps = {
						date: week,
						products: prods,
					};
					return weekProps;
				});

				const usedWeeks = weeksProds.filter(
					wp => wp.products.length > 0
				);

				setWeeks(usedWeeks);
			}
		} catch (err) {
			if (err instanceof Error)
				showMessage({
					message: err.message,
					type: 'danger',
				});
		} finally {
			setIsRendering(false);
		}
	}, [products]);

	const renderSectionTitle = useCallback(
		(week: WeekProps, index: number) => {
			const onPress = () => {
				if (activeSection[0] === index) {
					setActiveSection([]);
					return;
				}
				setActiveSection([index]);
			};

			const dateFormatted = format(week.date, dateFormat);
			const isExpired = isPast(week.date);
			const isNext =
				addDays(new Date(), howManyDaysToBeNextToExpire) >= week.date;

			return (
				<WeekContainer
					onPress={onPress}
					isPast={isExpired}
					isNext={isNext}
				>
					<WeekText isPast={isExpired} isNext={isNext}>
						{`${strings.View_ProductsByWeeks_WeekTitle} ${dateFormatted}`}
					</WeekText>
					<ProductCount isPast={isExpired} isNext={isNext}>
						{`${strings.View_ProductsByWeeks_ProductsCount.replace(
							'{COUNT}',
							String(week.products.length)
						)}`}
					</ProductCount>
				</WeekContainer>
			);
		},
		[activeSection, dateFormat, howManyDaysToBeNextToExpire]
	);

	const renderContent = useCallback((week: WeekProps) => {
		return week.products.map(prod => (
			<ProductCard key={prod.id} product={prod} />
		));
	}, []);

	const sections = useMemo(() => {
		return weeks.map(week => {
			return {
				date: week.date,
				products: week.products,
			};
		});
	}, [weeks]);

	return isRendering || isLoading ? (
		<Loading />
	) : (
		<Container>
			<Header title={strings.View_ProductsByWeeks_Title} />

			<PageContent>
				<Accordion
					sections={sections}
					activeSections={activeSection}
					renderHeader={() => <></>}
					renderSectionTitle={renderSectionTitle}
					renderContent={renderContent}
				/>
			</PageContent>

			<FloatButton navigateTo="AddProduct" />
		</Container>
	);
};

export default WeekView;
