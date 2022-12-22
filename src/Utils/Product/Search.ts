import { compareAsc, startOfDay, isDate, parseISO } from 'date-fns';

interface searchProductsProps {
	query: string;
	products: Array<IProduct>;
}

export function searchProducts({
	query,
	products,
}: searchProductsProps): Array<IProduct> {
	const q = query.toLowerCase();

	const productsFind = products.filter(product => {
		const searchByName = product.name.toLowerCase().includes(q);

		if (searchByName) {
			return true;
		}

		if (product.code) {
			const searchBycode = product.code.toLowerCase().includes(q);

			if (searchBycode) {
				return true;
			}
		}

		if (product.batches.length > 0) {
			const batches = product.batches.filter(batch => {
				const findedByBatchName = batch.name.toLowerCase().includes(q);

				if (findedByBatchName) {
					return true;
				}

				const slitedDate = query.split('/');

				if (slitedDate.length > 2) {
					const date = startOfDay(
						new Date(
							Number(slitedDate[2]),
							Number(slitedDate[1]) - 1,
							Number(slitedDate[0])
						)
					);

					const batch_date = isDate(batch.exp_date)
						? (batch.exp_date as Date)
						: parseISO(batch.exp_date);

					if (compareAsc(startOfDay(batch_date), date) === 0) {
						return true;
					}
				}

				return false;
			});

			if (batches.length > 0) {
				return true;
			}
		}

		return false;
	});

	console.log(productsFind);
	return productsFind;
}
