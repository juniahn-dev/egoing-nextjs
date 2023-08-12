"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Update() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`)
      .then((response) => response.json())
      .then(result => {
        setTitle(result.title);
        setBody(result.body);
      });
  }, [id]);

  return (
    <form onSubmit={(event) => {
      event.preventDefault();

      const title = event.target.title.value;
      const body = event.target.body.value;
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body }),
      };

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`, options)
        .then((response) => response.json())
        .then(result => {
          const lastId = result.id;
          router.push(`/read/${lastId}`);
          router.refresh();
        });
    }}>
      <p>
        <input type="text" name="title" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </p>
      <p>
        <textarea name="body" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)} />
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
}
