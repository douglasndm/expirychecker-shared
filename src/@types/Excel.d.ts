interface ExcelRowProps {
	produto: string;
	codigo: string;
	loja: string;
	lote: string;
	vencimento: Date;
	quantidade: number;
	preço: number;
}

interface exportModel {
	product: Omit<IProduct, 'Lotes'>;
	batch: ILote;
}

interface exportProps {
	sortBy: 'created_date' | 'expire_date';
	category?: string | null;
	brand?: string | null;
	store?: string;
	getProducts: () => Promise<IProduct[]>;
	getCategories: () => Promise<ICategory[]>;
	getBrands: () => Promise<IBrand[]>;
	getStores: () => Promise<IStore[]>;
}

interface IExcelProduct extends IProduct {
	lotes: Omit<ILote, 'id'>[];
}
