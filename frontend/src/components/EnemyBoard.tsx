import { useEffect, useState } from "react"

type EnemyBoardProps = {
    onAttack: (rowIndex: number, celIndex: number) => void;
    isPlayersTurn: boolean;
    onPlayersTurn: (playersTurn: boolean) => void;
    usersGrid: number[][];
    onResult: (result: string) => void;
}

export const EnemyBoard = ({ onAttack, isPlayersTurn, onPlayersTurn, usersGrid, onResult }: EnemyBoardProps) => {

    const defaultGrid = [
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

    const [userField, setUserField] = useState<number[]>(() => Array.from({ length: 81 }, (_, i) => i));

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

                        const row = updatedField[rowIndex];
                        const start = Math.max(0, cellIndex - 1);
                        const end = Math.min(row.length, cellIndex + ship.length + 1);

                        const conflict = updatedField[rowIndex]
                            .slice(start, end)
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


    const handleAttack = () => {

        if (userField.length === 0) return;

        let randomIndex = Math.floor(Math.random() * userField.length);
        let cell = userField[randomIndex];

        setUserField(prev => prev.filter((_, i) => i !== randomIndex));

        let cellIndex = cell % 9;
        let rowIndex = Math.floor(cell / 9);

        console.log("cellindex:  " + cellIndex + "rowindex: " + rowIndex);

        setTimeout(() => {
            onAttack(rowIndex, cellIndex);
            handleGameResult(usersGrid, "enemy")
            onPlayersTurn(true);
        }, 1000)
    }

    const handleOnClick = (rowIndex: number, colIndex: number) => {
        if (!isPlayersTurn) return;

        setGrid(prevField => {
            const updatedField = prevField.map(row => [...row]); // clone
            if (updatedField[rowIndex][colIndex] === 1) {
                updatedField[rowIndex][colIndex] = 2; // ship → hit 🔥
            } else if (updatedField[rowIndex][colIndex] === 0) {
                updatedField[rowIndex][colIndex] = 3; // hit → water 🌊
            }
            handleGameResult(updatedField, "user");
            return updatedField;
        });

        onPlayersTurn(false);

        handleAttack();

    };

    const handleGameResult = (grid: number[][], player: "user" | "enemy") => {
        const aliveShips = grid.some(row => row.includes(1));
        onPlayersTurn(false);
        if (!aliveShips) {
            if (player === "user") {
                onResult("user");
            } else {
                onResult("enemy")
            }
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
                            {/* {number === 1 ? 1 : ""} */}
                            {number === 2 ? "🔥" : number === 3 ? "🌊" : ""}
                        </div>
                    ))
                ))}
            </div>
        </div>
    )
}