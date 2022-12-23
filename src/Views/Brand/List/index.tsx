import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import strings from '@shared/Locales';

import { sortBrands } from '@utils/Brands/Sort';

import Header from '@components/Header';
import Loading from '@components/Loading';
import PaddingComponent from '@components/PaddingComponent';

import {
	Container,
	Content,
	InputContainer,
	InputTextContainer,
	InputText,
	ListTitle,
	Icons,
	LoadingIcon,
	InputTextTip,
	ListItemContainer,
	ListItemTitle,
	AddButtonContainer,
	AddNewItemContent,
} from '@styles/Views/GenericListPage';

interface Props {
	brands: IBrand[];
	isLoading: boolean;
	isAdding?: boolean;
	allowCreate?: boolean;
	createBrand: (name: string) => Promise<void>;
}

const ListView: React.FC<Props> = ({
	brands,
	isLoading,
	isAdding,
	allowCreate = true,
	createBrand,
}: Props) => {
	const { navigate } = useNavigation<StackNavigationProp<RoutesParams>>();

	const [sortedBrands, setSortedBrands] = useState<IBrand[]>([]);

	const [newBrandName, setNewBrandName] = useState<string | undefined>();
	const [inputHasError, setInputHasError] = useState<boolean>(false);
	const [inputErrorMessage, setInputErrorMessage] = useState<string>('');

	useEffect(() => {
		const sorted = sortBrands(brands);
		setSortedBrands(sorted);
	}, [brands]);

	const handleOnTextChange = useCallback((value: string) => {
		setInputHasError(false);
		setInputErrorMessage('');
		setNewBrandName(value);
	}, []);

	const handleSaveBrand = useCallback(async () => {
		try {
			if (!newBrandName) {
				setInputHasError(true);
				setInputErrorMessage(
					strings.View_Brand_List_InputAdd_Error_EmptyTextField
				);
				return;
			}

			await createBrand(newBrandName);

			setNewBrandName('');
		} catch (err) {
			if (err instanceof Error) {
				setInputErrorMessage(err.message);
			}
		}
	}, [createBrand, newBrandName]);

	const handleNavigateToCategory = useCallback(
		(brand_id: string) => {
			navigate('BrandView', {
				brand_id,
			});
		},
		[navigate]
	);

	return isLoading ? (
		<Loading />
	) : (
		<Container>
			<Content>
				<Header title={strings.View_Brand_List_PageTitle} />

				{allowCreate && (
					<AddNewItemContent>
						<InputContainer>
							<InputTextContainer hasError={inputHasError}>
								<InputText
									value={newBrandName}
									onChangeText={handleOnTextChange}
									placeholder={
										strings.View_Brand_List_InputAdd_Placeholder
									}
								/>
							</InputTextContainer>

							<AddButtonContainer
								onPress={handleSaveBrand}
								enabled={!isAdding}
							>
								{isAdding ? (
									<LoadingIcon />
								) : (
									<Icons name="add-circle-outline" />
								)}
							</AddButtonContainer>
						</InputContainer>

						{!!inputErrorMessage && (
							<InputTextTip>{inputErrorMessage}</InputTextTip>
						)}
					</AddNewItemContent>
				)}

				<ListTitle>
					{strings.View_Brand_List_AllCategories_Label}
				</ListTitle>

				{sortedBrands.map(brand => (
					<ListItemContainer
						key={brand.id}
						onPress={() => handleNavigateToCategory(brand.id)}
					>
						<ListItemTitle>{brand.name}</ListItemTitle>
					</ListItemContainer>
				))}
				<PaddingComponent />
			</Content>
		</Container>
	);
};

export default ListView;
