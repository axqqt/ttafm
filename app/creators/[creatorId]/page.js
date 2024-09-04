import { useRouter } from 'next/router';
import Link from 'next/link';

export default function CreatorProfile({ creator }) {
  const router = useRouter();
  const { creatorId } = router.query;

  return (
    <div>
      <h1>{creator.name}'s Profile</h1>
      <Link href={`/store/${creatorId}`}>
        <a>Visit Store</a>
      </Link>
    </div>
  );
}

// Fetch creator details based on creatorId
export async function getServerSideProps(context) {
  const { creatorId } = context.params;
  // Fetch creator data from your backend
  const res = await fetch(`https://your-api.com/api/creators/${creatorId}`);
  const creator = await res.json();

  return {
    props: { creator }, // Pass creator data to the page
  };
}
