import { useRouter } from 'next/router';

export default function Storefront({ store, products }) {
  const router = useRouter();
  const { creatorId } = router.query;

  return (
    <div>
      <h1>{store.name}</h1>
      <div>
        {products.map(product => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            {/* Add to Cart or Buy Now functionality */}
          </div>
        ))}
      </div>
    </div>
  );
}

// Fetch store and products based on creatorId
export async function getServerSideProps(context) {
  const { creatorId } = context.params;

  // Fetch store data
  const storeRes = await fetch(`https://your-api.com/api/store/${creatorId}`);
  const store = await storeRes.json();

  // Fetch products
  const productsRes = await fetch(`https://your-api.com/api/store/${creatorId}/products`);
  const products = await productsRes.json();

  return {
    props: { store, products },
  };
}
