import "./chessboard.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";


export default function ChessBoard() {
  const { t } = useTranslation();
  const [size, setSize] = useState(8);
  const [boxSize, setBoxSize] = useState(50);
  const [chessBoard, setChessBoard] = useState([]);
  const [evenColor, setEvenColor] = useState("#FFFFFF");
  const [oddColor, setOddColor] = useState("#000000");

  const generateChessBoard = (size) => {
    const result = [];
    for (let i = 0; i < size; i++) {
      const row = Array.from(
        { length: size },
        (_, index) => index % 2 === i % 2 ? 'even' : 'odd'
      );
      result.push(row);
    }
    return result;
  };

const handleSizeChange = (event) => {
  const newSize = parseInt(event.target.value);
  setSize(newSize);
  setChessBoard(generateChessBoard(newSize));
};

  const handleBoxSizeChange = (event) => {
    setBoxSize(parseInt(event.target.value));
  };

  const handleEvenColorChange = (event) => {
    setEvenColor(event.target.value);
  };

  const handleOddColorChange = (event) => {
    setOddColor(event.target.value);
  };

  const handleBoardClick = () => {
    const newChessBoard = chessBoard.map((row) => {
      return row.map((value) => {
        return value === 'even' ? 'odd' : 'even';
      });
    });
    setChessBoard(newChessBoard);
  };

  useState(() => {
    setChessBoard(generateChessBoard(size));
  }, [size]);

  return (
    <div className="chess-app">
      <h1 style={{fontSize: '2rem', textAlign: 'left'}}>Chessboard</h1>
      <div>
        <label htmlFor="size">{t("chessboard.number")}:</label>
        <input
          type="number"
          id="size"
          name="size"
          min="1"
          max="100"
          value={size}
          onChange={handleSizeChange}
        />
      </div>
      <div>
        <label htmlFor="boxSize">{t("chessboard.length")}:</label>
        <input
          type="number"
          id="boxSize"
          name="boxSize"
          min="10"
          max="100"
          value={boxSize}
          onChange={handleBoxSizeChange}
        />
      </div>
      <div>
        <label htmlFor="evenColor">{t("chessboard.even")}:</label>
        <input
          type="color"
          id="evenColor"
          name="evenColor"
          value={evenColor}
          onChange={handleEvenColorChange}
        />
      </div>
      <div>
        <label htmlFor="oddColor">{t("chessboard.odd")}:</label>
        <input
          type="color"
          id="oddColor"
          name="oddColor"
          value={oddColor}
          onChange={handleOddColorChange}
        />
      </div>
      <div className="chessBoard" onClick={handleBoardClick}>
        {chessBoard.length > 0 &&
          chessBoard.map((row, rIndex) => {
            return (
              <div className="row" key={rIndex}>
                {row.map((value, cIndex) => {
                  const color = value === "even" ? evenColor : oddColor;
                  return (
                    <div
                      className="box"
                      key={cIndex}
                      style={{
                        width: `${boxSize}px`,
                        height: `${boxSize}px`,
                        backgroundColor: color,
                      }}
                    ></div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
}