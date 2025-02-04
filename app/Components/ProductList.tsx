// components/ProductList.tsx
"use client"
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  customWidth: number;
  customHeight: number;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => (
  <Row className="g-4">
    {products.map((product) => (
      <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
        <ProductCard {...product} />
      </Col>
    ))}
  </Row>
);

export default ProductList;
