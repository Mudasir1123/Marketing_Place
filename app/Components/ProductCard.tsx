// components/ProductCard.tsx
import Link from 'next/link';
import { Card, Button, Image } from 'react-bootstrap';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  customWidth: number;
  customHeight: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  stock,
  customWidth,
  customHeight,
}) => (
  <Card style={{ width: '18rem' }} className="mb-4">
    <Link href={`/${id}`}>
      <Image
        src={image}
        alt={name}
        width={customWidth}
        height={customHeight}
        className="card-img-top"
      />
    </Link>
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Text>${price}</Card.Text>
      <Card.Text>{stock > 0 ? 'In Stock' : 'Out of Stock'}</Card.Text>
      <Button variant="primary" disabled={stock === 0}>
        Add to Cart
      </Button>
    </Card.Body>
  </Card>
);

export default ProductCard;
