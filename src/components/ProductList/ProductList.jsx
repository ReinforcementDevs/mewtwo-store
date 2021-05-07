import React, { useEffect, useState } from 'react';
import './ProductList.css';
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
  return (
    <div className='eachProd'>
      <div>
        <select
          className='dropdown'
          onChange={(e) => setSearchGroup(e.target.value)}
        >
          <option value={'title'}>Product Title</option>
          <option value={'description'}>Description</option>
          <option value={'category'}>Product Category</option>
          <option value={'minPrice'}>Minimum Price</option>
          <option value={'maxPrice'}>Maximum Price</option>
        </select>
        <input
          className='searchTextBox'
          type='text'
          placeholder='Enter Search Information'
          onChange={(e) => setSearchInput(e.target.value)}
        ></input>
      </div>

      <div className='product'>{product}</div>
    </div>
  );
}
