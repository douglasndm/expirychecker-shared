import React, { useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import strings from '@shared/Locales';

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

import { sortCategories } from '@utils/Categories/Sort';

interface Props {
	categories: ICategory[];
	isLoading: boolean;
	isAdding?: boolean;
	allowCreate?: boolean;
	createCategory: (name: string) => Promise<void>;
}

const ListView: React.FC<Props> = ({
	categories,
	isLoading,
	isAdding,
	allowCreate = true,
	createCategory,
}: Props) => {
	const { navigate } = useNavigation<StackNavigationProp<RoutesParams>>();

	const [newCategoryName, setNewCategoryName] = useState<
		string | undefined
	>();
	const [inputHasError, setInputHasError] = useState<boolean>(false);
	const [inputErrorMessage, setInputErrorMessage] = useState<string>('');

	const [sortedCategories, setSortedCategories] = useState<ICategory[]>([]);

	useEffect(() => {
		const sorted = sortCategories(categories);
		setSortedCategories(sorted);
	}, [categories]);

	const handleOnTextChange = useCallback((value: string) => {
		setInputHasError(false);
		setInputErrorMessage('');
		setNewCategoryName(value);
	}, []);

	const handleSaveCategory = useCallback(async () => {
		try {
			if (!newCategoryName) {
				setInputHasError(true);
				setInputErrorMessage(
					strings.View_Category_List_InputAdd_Error_EmptyName
				);
				return;
			}

			await createCategory(newCategoryName);

			setNewCategoryName('');
		} catch (err) {
			if (err instanceof Error) {
				setInputErrorMessage(err.message);
			}
		}
	}, [newCategoryName, createCategory]);

	const handleNavigateToCategory = useCallback(
		(categoryId: string) => {
			navigate('CategoryView', {
				id: categoryId,
			});
		},
		[navigate]
	);

	return isLoading ? (
		<Loading />
	) : (
		<Container>
			<Content>
				<Header title={strings.View_Category_List_PageTitle} />

				{allowCreate && (
					<AddNewItemContent>
						<InputContainer>
							<InputTextContainer hasError={inputHasError}>
								<InputText
									value={newCategoryName}
									onChangeText={handleOnTextChange}
									placeholder={
										strings.View_Category_List_InputAdd_Placeholder
									}
								/>
							</InputTextContainer>

							<AddButtonContainer
								onPress={handleSaveCategory}
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
					{strings.View_Category_List_AllCategories_Label}
				</ListTitle>

				{sortedCategories.map(category => (
					<ListItemContainer
						key={category.id}
						onPress={() => handleNavigateToCategory(category.id)}
					>
						<ListItemTitle>{category.name}</ListItemTitle>
					</ListItemContainer>
				))}

				<PaddingComponent />
			</Content>
		</Container>
	);
};

export default ListView;
