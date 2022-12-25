import { compareAsc, endOfDay, isDate, parseISO } from 'date-fns';

interface searchProductsProps {
	query: string;
	products: Array<IProduct>;
}

export function searchProducts({
	query,
	products,
}: searchProductsProps): Array<IProduct> {
	const slitedDate = query.split('/');

	const q = query.toLowerCase();

	const productsFind: IProduct[] = [];

	// for is faster than filter function
	for (let i = 0; i < products.length; i++) {
		// this won't add duplicate products
		if (productsFind.indexOf(products[i]) >= 0) {
			continue;
		}

		if (slitedDate.length <= 2) {
			if (products[i].name.includes(q)) {
				productsFind.push(products[i]);
				continue;
			}

			const { code } = products[i];

			if (code) {
				if (code.includes(q)) {
					productsFind.push(products[i]);
					continue;
				}
			}
		}

		if (products[i].batches.length > 0) {
			for (let j = 0; j < products[i].batches.length; j++) {
				if (slitedDate.length > 2) {
					const date = endOfDay(
						new Date(
							Number(slitedDate[2]),
							Number(slitedDate[1]) - 1,
							Number(slitedDate[0])
						)
					);

					const { exp_date } = products[i].batches[j];

					const batch_date = isDate(exp_date)
						? (exp_date as Date)
						: parseISO(exp_date);

					if (compareAsc(endOfDay(batch_date), date) === 0) {
						productsFind.push(products[i]);
						continue;
					}
				} else if (products[i].batches[j].name.includes(q)) {
					productsFind.push(products[i]);
					continue;
				}
			}
		}
	}

	return productsFind;
}
