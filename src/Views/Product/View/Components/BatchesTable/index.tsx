import React, { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Dialog from 'react-native-dialog';
import { showMessage } from 'react-native-flash-message';

import strings from '@shared/Locales';

import ItemRow from './ItemRow';

import {
	Container,
	ActionButtonsContainer,
	ButtonPaper,
	Table,
	TableHeader,
	TableTitle,
	SelectButtonContainer,
	SelectButton,
	SelectIcon,
	Icons,
} from './styles';

interface Props {
	product_id: string;
	batches: Array<IBatch>;
	onDeleteMany?: (batches_id: string[]) => Promise<void>;
}

const BatchesTable: React.FC<Props> = ({
	product_id,
	batches,
	onDeleteMany,
}: Props) => {
	const { reset } = useNavigation<StackNavigationProp<RoutesParams>>();
	const lotes = useMemo(() => batches, [batches]);

	const [selectedBatches, setSelectedBatches] = useState<Array<string>>([]);
	const [selectMode, setSelectMode] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const switchSelectedItem = useCallback(
		(batch_id: string) => {
			const isChecked = selectedBatches.find(id => id === batch_id);

			if (!isChecked) {
				const prodsIds = [...selectedBatches, batch_id];

				setSelectedBatches(prodsIds);
				return;
			}

			const newSelected = selectedBatches.filter(id => id !== batch_id);
			setSelectedBatches(newSelected);
		},
		[selectedBatches]
	);

	const handleEnableSelectMode = useCallback(() => {
		if (onDeleteMany) setSelectMode(true);
	}, [onDeleteMany]);

	const handleDisableSelectMode = useCallback(() => {
		setSelectMode(false);
	}, []);

	const handleSwitchDeleteModal = useCallback(() => {
		setDeleteModal(!deleteModal);
	}, [deleteModal]);

	const handleDeleteMany = useCallback(async () => {
		if (selectedBatches.length <= 0) {
			handleDisableSelectMode();
			setDeleteModal(false);
			return;
		}
		try {
			await onDeleteMany(selectedBatches);

			reset({
				routes: [
					{ name: 'Home' },
					{
						name: 'ProductDetails',
						params: {
							id: product_id,
						},
					},
				],
			});

			setDeleteModal(false);

			showMessage({
				message:
					strings.View_ProductDetails_Notification_DeleteManyBatches_Success,
				type: 'info',
			});
		} catch (err) {
			if (err instanceof Error)
				showMessage({
					message: err.message,
					type: 'danger',
				});
		}
	}, [
		handleDisableSelectMode,
		onDeleteMany,
		product_id,
		reset,
		selectedBatches,
	]);

	return (
		<Table>
			{selectMode && (
				<ActionButtonsContainer>
					<ButtonPaper
						icon={() => <Icons name="trash-outline" />}
						onPress={handleSwitchDeleteModal}
					>
						{strings.View_ProductDetails_ActionBar_Confirm}
					</ButtonPaper>

					<ButtonPaper
						icon={() => <Icons name="exit-outline" />}
						onPress={handleDisableSelectMode}
					>
						{strings.View_ProductDetails_ActionBar_Cancel}
					</ButtonPaper>
				</ActionButtonsContainer>
			)}

			<TableHeader>
				<TableTitle>
					{
						strings.View_ProductDetails_TableComponent_BatchNameColumnTitle
					}
				</TableTitle>
				<TableTitle>
					{
						strings.View_ProductDetails_TableComponent_BatchExpInColumnTitle
					}
				</TableTitle>
				<TableTitle>
					{
						strings.View_ProductDetails_TableComponent_BatchAmountColumnTitle
					}
				</TableTitle>
				<TableTitle>
					{
						strings.View_ProductDetails_TableComponent_BatchPriceColumnTitle
					}
				</TableTitle>
			</TableHeader>

			{lotes.map(batch => {
				const isChecked = selectedBatches.find(id => id === batch.id);

				return (
					<Container key={batch.id}>
						{selectMode && (
							<SelectButtonContainer>
								<SelectButton
									onPress={() => switchSelectedItem(batch.id)}
								>
									{isChecked ? (
										<SelectIcon name="checkmark-circle-outline" />
									) : (
										<SelectIcon name="ellipse-outline" />
									)}
								</SelectButton>
							</SelectButtonContainer>
						)}

						<ItemRow
							key={batch.id}
							batch={batch}
							productId={product_id}
							onLongPress={handleEnableSelectMode}
						/>
					</Container>
				);
			})}

			<Dialog.Container
				visible={deleteModal}
				onBackdropPress={handleSwitchDeleteModal}
			>
				<Dialog.Title>
					{strings.View_ProductDetails_DeleteManyBatches_Modal_Title}
				</Dialog.Title>
				<Dialog.Description>
					{
						strings.View_ProductDetails_DeleteManyBatches_Modal_Description
					}
				</Dialog.Description>
				<Dialog.Button
					label={
						strings.View_ProductDetails_DeleteManyBatches_Modal_Cancel
					}
					onPress={handleSwitchDeleteModal}
				/>
				<Dialog.Button
					label={
						strings.View_ProductDetails_DeleteManyBatches_Modal_Confirm
					}
					color="red"
					onPress={handleDeleteMany}
				/>
			</Dialog.Container>
		</Table>
	);
};

export default BatchesTable;
