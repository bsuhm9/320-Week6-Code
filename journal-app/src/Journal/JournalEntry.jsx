import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import db from "../db";

export default function JournalEntry() {
  const { id } = useParams();

  const [entry, setEntry] = useState([]); //create state variables and set to an empty array
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        // const querySnapshot = await getDocs(collection(db, "journal-entries"));
        // setEntry(querySnapshot.docs);
        // querySnapshot.forEach((doc) => {
        //   console.log(doc.id, " => ", doc.data()); // doc.data() is never undefined for query doc snapshots
        // });

        const docRef = doc(db, "journal-entries", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setEntry(docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (hasError) {
    return <h2>An Error Has Occurred.</h2>;
  }

  return (
    <div>
      <h1>Journal Entry</h1>
      <p>{entry.entry}</p>
      <Link to="/journal/">Return Home</Link>
    </div>
  );
}
