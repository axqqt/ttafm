"use client"
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db,storage } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [linkText, setLinkText] = useState('');
  const [uploadMenu , setUploadMenu] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      // Upload file to Firebase Storage
      const storageRef = ref(storage, `videos/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      // Add video data to Firestore
      await addDoc(collection(db, 'videos'), {
        url,
        description,
        link,
        linkText,
        userId: user.uid,
        createdAt: new Date(),
      });

      // Reset form
      setFile(null);
      setDescription('');
      setLink('');
      setLinkText('');
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
   <div><button onClick={()=>{setUploadMenu(!uploadMenu)}}>{uploadMenu  ? "Close Menu" : "Upload"}</button>{uploadMenu &&  <form onSubmit={handleSubmit}>
   <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="video/*" />
   <input
     type="text"
     placeholder="Description"
     value={description}
     onChange={(e) => setDescription(e.target.value)}
   />
   <input
     type="url"
     placeholder="Link URL"
     value={link}
     onChange={(e) => setLink(e.target.value)}
   />
   <input
     type="text"
     placeholder="Link Text"
     value={linkText}
     onChange={(e) => setLinkText(e.target.value)}
   />
   <button type="submit">Upload</button>
 </form>}</div>
  );
}