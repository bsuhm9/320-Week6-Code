import { React, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import db from "../db";
import { AddJournal } from "./AddJournal";

export default function Journal() {
  const [entries, setEntries] = useState([]); //create state variables and set to an empty array
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const deleteEntry = async (id) => {
    //console.log(entry);
    await deleteDoc(doc(db, "journal-entries", id));
  };

  useEffect(() => {
    const getData = async () => {
      try {
        // const querySnapshot = await getDocs(collection(db, "journal-entries"));
        // setEntries(querySnapshot.docs);
        // querySnapshot.forEach((doc) => {
        //   console.log(doc.id, " => ", doc.data()); // doc.data() is never undefined for query doc snapshots
        // });

        onSnapshot(collection(db, "journal-entries"), (doc) => {
          console.log("Current data: ");
          setEntries(doc.docs);
        });
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getData();

    return () => onSnapshot;
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (hasError) {
    return <h2>An Error Has Occurred.</h2>;
  }

  return (
    <div>
      <h1>Journal</h1>
      <AddJournal />
      {entries.map((entry) => {
        console.log(entry.data());
        return (
          <div key={entry.id}>
            {entry.data().entry}
            <Link to={`/journal/${entry.id}`}>View</Link>
            <button onClick={() => deleteEntry(entry.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}
