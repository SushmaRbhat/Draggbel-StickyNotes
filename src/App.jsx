import { useEffect, useState } from "react";
import "./App.css";
import Notes from "./components/Notes";

const colors = [
  "#D9D9D9",
  "#85E083",
  "#71d7ff",
  "#9747FF",
  "#FF24BD",
  "#f51b00",
  "#FFA629",
  "#FFCD29",
];
function App() {
  const [inputVal, setInputVal] = useState("");
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("snotes")) || [
      { id: 1, text: "First Note", x: 100, y: 100, bgColor: "#9747FF" },
      { id: 2, text: "Second Note", x: 200, y: 200, bgColor: "#FF24BD" },
      { id: 3, text: "Third Note", x: 300, y: 300, bgColor: "#FFA629" },
    ]
  );
  const [draggableNote, setDraggableNote] = useState(null);

  useEffect(() => {
    localStorage.setItem("snotes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (!inputVal) return;
    const positionNColor = determinePositionColor();
    setNotes((prev) => [
      ...prev,
      {
        id: new Date().getTime(),
        text: inputVal,
        x: positionNColor?.x,
        y: positionNColor?.y,
        bgColor: colors[positionNColor?.bgColor],
      },
    ]);
    setInputVal("");
  };
  console.log("notes", notes);

  const determinePositionColor = () => {
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 200;
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
      bgColor: Math.floor(Math.random() * colors.length),
    };
  };

  const handleMouseDown = (e, item) => {
    setDraggableNote({
      ...item,
      xPos: e.clientX - item.x,
      yPos: e.clientY - item.y,
    });
  };
  const handleMouseMove = (e) => {
    if (!draggableNote) return;
    const updatedNotes = notes.map((ele) =>
      ele.id === draggableNote.id
        ? {
            ...ele,
            x: e.clientX - draggableNote.xPos,
            y: e.clientY - draggableNote.yPos,
          }
        : ele
    );
    setNotes(updatedNotes);
  };
  const handleMouseUp = () => {
    setDraggableNote(null);
  };

  return (
    <>
      <div>
        <h1>Sticky notes</h1>
        <div className="input-container">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
            }}
          />
          <button onClick={handleAddNote}>Add</button>
        </div>
        <div>
          <Notes
            notes={notes}
            handleMouseDown={handleMouseDown}
            handleMouseMove={handleMouseMove}
            handleMouseUp={handleMouseUp}
          />
        </div>
      </div>
    </>
  );
}

export default App;
