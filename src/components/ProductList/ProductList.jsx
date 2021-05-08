import React, { useEffect, useState } from 'react';
import './ProductList.css';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ProductSingle from './ProductListSingle';

export default function ProductList() {
	const [list, setList] = useState([]);
	const [searchInput, setSearchInput] = useState('');
	const [searchGroup, setSearchGroup] = useState('title');

	useEffect(() => {
		loadData();
	}, []);
	const loadData = async () => {
		const response = await fetch('https://fakestoreapi.com/products');
		const data = await response.json();
		setList(data);
		console.log(data);
	};

	const product = list
		.filter((val) => {
			// console.log(searchGroup, searchInput, '<-------searchgroup and input')
			if (searchInput === '') {
				return val;
			} else if (
				searchGroup === 'title' &&
				val.title.toLowerCase().includes(searchInput.toLowerCase())
			) {
				return val;
			} else if (
				searchGroup === 'description' &&
				val.description.toLowerCase().includes(searchInput.toLowerCase())
			) {
				return val;
			} else if (
				searchGroup === 'category' &&
				val.category.toLowerCase().includes(searchInput.toLowerCase())
			) {
				return val;
			} else if (searchGroup === 'minPrice' && val.price >= searchInput) {
				return val;
			} else if (searchGroup === 'maxPrice' && val.price <= searchInput) {
				return val;
			}
		})
		.map(({ id, title, image, price, description }) => {
			// console.log(title)
			return (
				<ProductSingle
					key={id}
					id={id}
					title={title}
					image={image}
					price={price}
					description={description}
				/>
			);
		});
	const optionValue = [
		{ value: 'title' },
		{ value: 'description' },
		{ value: 'category' },
		{ value: 'minPrice' },
		{ value: 'maxPrice' },
	];

	return (
		<div className='eachProd'>
			<div className='search'>
				<Autocomplete
					id='combo-box-demo'
					options={optionValue}
					getOptionLabel={(option) => option.value}
					style={{ width: 170 }}
					onChange={(e) => setSearchGroup(e.target.innerText)}
					renderInput={(params) => (
						<TextField {...params} label='Select category' variant='outlined' />
					)}
				/>

				<TextField
					id='outlined-basic'
					label='Enter Search Info'
					variant='outlined'
					style={{ width: 250 }}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
			</div>

			<div className='product'>{product}</div>
		</div>
	);
}
