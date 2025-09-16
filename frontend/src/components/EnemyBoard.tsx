import { useEffect, useState } from "react"

type EnemyBoardProps = {
    onAttack: (rowIndex: number, celIndex: number) => void;
}

export const EnemyBoard = ({onAttack}: EnemyBoardProps) => {

    const defaultGrid = [
        // [0, 1, 1, 0, 0, 0, 1, 1, 1],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 1, 1, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 1, 1, 1, 1, 0],
        // [0, 0, 0, 0, 0, 0, 0, 0, 0],
        // [0, 0, 0, 0, 0, 1, 1, 1, 0],
        // [0, 1, 1, 1, 1, 0, 0, 0, 0]
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    const ships = [
        { id: "Corvette", length: 3 },
        { id: "Canoe", length: 2 },
        { id: "Warship", length: 3 },
        { id: "Junk", length: 2 },
        { id: "ManOWar", length: 4 },
    ]

    const [grid, setGrid] = useState<number[][]>(defaultGrid);

    useEffect(() => {
        const defaultShips = ships.reduce((acc, ship) => {
            acc[ship.id] = 2;
            return acc;
        }, {} as Record<string, number>);

        let cells: number[] = Array.from({ length: 81 }, (_, i) => i);

        const updatedField = [...defaultGrid];

        Object.entries(defaultShips).forEach(([shipId, count]) => {
            const ship = ships.find(s => s.id === shipId);

            if (!ship) return;

            for (let i = 0; i < count; i++) {

                let placed = false;

                while (!placed && cells.length > 0) {

                    let random = Math.floor(Math.random() * cells.length);
                    cells.splice(random, 1);

                    console.log(`Placing ${ship.id} (length ${ship.length} at ${random})`)
                    console.log("Cells: " + cells.length);

                    let cellIndex = random % 9;
                    let rowIndex = Math.floor(random / 9);
                    if ((cellIndex + ship.length) <= 9) {

                        const conflict = updatedField[rowIndex]
                            .slice(cellIndex, cellIndex + ship.length)
                            .some(cell => cell === 1);

                        if (!conflict) {
                            for (let i = 0; i < ship.length; i++) {
                                updatedField[rowIndex][cellIndex + i] = 1;
                            }
                            placed = true;
                        }
                    }
                }
            }
        });

        setGrid(updatedField);
    }, [])

    let userField: number[] = Array.from({ length: 81 }, (_, i) => i);


    const handleAttack = () => {
        let random = Math.floor(Math.random() * userField.length);
        userField.splice(random, 1);

        let cellIndex = random % 9;
        let rowIndex = Math.floor(random / 9);

        console.log("cellindex:  " + cellIndex + "rowindex: " + rowIndex);

        onAttack(rowIndex, cellIndex);
    }

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
            <div className={"grid flex flex-col"}>
                {grid.map((row, rowIndex) => (
                    row.map((number, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className="border border-black p-5 w-16 h-16 flex items-center justify-center"
                            onClick={() => handleOnClick(rowIndex, colIndex)}
                        >
                            {number === 1 ? 1 : ""}
                            {/* {number === 2 ? "🔥" : number === 3 ? "🌊" : ""} */}
                        </div>
                    ))
                ))}
            </div>
            <button onClick={handleAttack} className="border p-5 bg-gray-500">Attack user</button>
        </div>
    )
}