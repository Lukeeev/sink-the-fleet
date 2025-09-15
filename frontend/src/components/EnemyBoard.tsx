import { useState } from "react"


export const EnemyBoard = () => {

    const defaultGrid = [
        [0, 1, 1, 0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 0, 0, 0, 0]
    ];

    const [grid, setGrid] = useState<number[][]>(defaultGrid);

    console.log(defaultGrid.length);

    const handleOnClick = (rowIndex: number, colIndex: number) => {

        setGrid(prevField => {
            const updatedField = prevField.map(row => [...row]); // clone
            if (updatedField[rowIndex][colIndex] === 1) {
                updatedField[rowIndex][colIndex] = 2; // ship → hit 🔥
            } else if (updatedField[rowIndex][colIndex] === 0) {
                updatedField[rowIndex][colIndex] = 3; // hit → water 🌊
            }
            handleWin(updatedField);
            return updatedField;
        });
    };

    const handleWin = (grid: number[][]) => {
        const aliveShips = grid.some(row => row.includes(1));

        if (!aliveShips) {
            console.log("You won!");
        }
    }

    return (
        <div>
            <div className={"grid"}>
                {grid.map((row, rowIndex) => (
                    row.map((number, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className="border border-black p-5 w-16 h-16 flex items-center justify-center"
                            onClick={() => handleOnClick(rowIndex, colIndex)}
                        >
                            {number === 2 ? "🔥" : number === 3 ? "🌊" : ""}
                        </div>
                    ))
                ))}
            </div>
        </div>
    )
}