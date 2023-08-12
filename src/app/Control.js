"use client"

import { useParams, useRouter } from 'next/navigation';

import Link from 'next/link';

export function Control() {
  const router = useRouter();

  const params = useParams();
  const id = params.id;

  return (
    <ul>
      <li><Link href="/create">Create</Link></li>
      {id && (
        <>
          <li><Link href={`/update/${id}`}>Update</Link></li>
          <li><input type="button" value="Delete" onClick={() => {
            const options = {
              method: 'DELETE',
            };

            fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`, options)
              .then(response => response.json())
              .then(() => {
                router.push('/');
                router.refresh();
              });
          }} /></li>
        </>
      )}
    </ul>
  );
}
