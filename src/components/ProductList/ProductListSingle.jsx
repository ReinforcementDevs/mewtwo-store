import React from 'react';
import { Link } from 'react-router-dom';
const ProductListSingle = ({ id, title, price, image }) => {
  return (
    <Link className='prodSingle' exact to={`/products/${id}`}>
      <h2>{title}</h2>
      <img className='imgProd' src={image} alt={title} />
      <h3>${price}</h3>
    </Link>
  );
};
export default ProductListSingle;
