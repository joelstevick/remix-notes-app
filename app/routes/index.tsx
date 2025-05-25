import { useEffect, useState } from "react";

type Note = {
  id: string;
  content: string;
};

export default function Index() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("notes");
    if (stored) setNotes(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote() {
    if (!noteText.trim()) return;
    const newNote = { id: Date.now().toString(), content: noteText };
    setNotes([newNote, ...notes]);
    setNoteText("");
  }

  function deleteNote(id: string) {
    setNotes(notes.filter(n => n.id !== id));
  }

  function updateNote(id: string, newContent: string) {
    setNotes(notes.map(n => (n.id === id ? { ...n, content: newContent } : n)));
  }

  return (
    <main>
      <h1 className="text-2xl mb-4">Remix Notes (1.8 / LocalStorage)</h1>
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write your note here..."
      />
      <button onClick={addNote}>Add</button>
      <section className="mt-4">
        {notes.map(note => (
          <div className="note" key={note.id}>
            <textarea
              value={note.content}
              onChange={(e) => updateNote(note.id, e.target.value)}
            />
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </section>
    </main>
  );
}