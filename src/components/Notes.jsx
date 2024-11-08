import React from "react";

const Notes = ({ notes, handleMouseDown, handleMouseMove, handleMouseUp }) => {
  return (
    <div
      className="notes-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {notes &&
        notes.map((item) => (
          <div
            key={item.id}
            onMouseDown={(e) => handleMouseDown(e, item)}
            className="note"
            style={{
              left: item?.x,
              top: item?.y,
              backgroundColor: item?.bgColor,
            }}
          >
            📌{item.text}
          </div>
        ))}
    </div>
  );
};

export default Notes;
