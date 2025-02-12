import { React, useState } from "react";
import db from "../db";
import { collection, addDoc, orderBy, limit, query } from "firebase/firestore";

export function AddJournal() {
  const [entry, SetEntry] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "journal-entries"), {
      entry: entry,
      createdAt: new Date(),
    });

    console.log("Document written with ID: ", docRef.id);
    SetEntry("");
  };
  return (
    <>
      <h2>Add a journal entry</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="entry-input"></label>
        <textarea
          id="entry-input"
          onChange={(e) => SetEntry(e.target.value)}
          value={entry}
        ></textarea>
        <button type="submit">Submit Entry</button>
      </form>
    </>
  );
}
