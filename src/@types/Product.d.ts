interface IProduct {
	id: string;
	name: string;
	code?: string;
	brand?: string | null;
	store?: IStore;
	photo?: string;
	thumbnail?: string;
	categories: Array<ICategory>;
	batches: Array<IBatch>;
	daysToBeNext?: number;
	created_at: string;
	updated_at: string;
}
