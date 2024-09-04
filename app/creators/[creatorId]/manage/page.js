import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ManageStore() {
  const router = useRouter();
  const { creatorId } = router.query;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`/api/store/${creatorId}/products`);
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, [creatorId]);

  return (
    <div>
      <h1>Manage Your Store</h1>
      {/* Render form to add/update products */}
      {/* Render list of products with options to edit or delete */}
    </div>
  );
}

// Ensure only the creator can access this page
export async function getServerSideProps(context) {
  const { req, params } = context;
  const { creatorId } = params;
  
  // Logic to check if the logged-in user is the creator
  const user = req.user; // Assuming user is available in the request
  if (user.creatorId !== creatorId) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: {}, // Pass any necessary props
  };
}
