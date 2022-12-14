interface IBatch {
	id: string;
	name: string;
	exp_date: Date;
	amount?: number;
	price?: number;
	price_tmp?: number;
	status: 'checked' | 'unchecked';
	created_at: string;
	updated_at: string;
}
