import { useEffect, useState } from "react"
import Corvette_ship from '../assets/Corvette_ship.png'
import Canoe from '../assets/Canoe.png'
import Warship from '../assets/Warship.png'
import Junk from '../assets/Junk.png'
import ManOWar from '../assets/ManOWar.png'
import Anchor from '../assets/Anchor.png'
import Rudder from '../assets/Rudder.png'
import type { GameMode } from "./Types/GameMode"
import { EnemyBoard } from "./EnemyBoard"

type GameProps = {
    gameMode: GameMode
    onGameChosen: (mode: GameMode) => void;
}
export const Game = ({ gameMode, onGameChosen }: GameProps) => {

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

    const defaultShips = ships.reduce((acc, ship) => {
        acc[ship.id] = 2;
        return acc;
    }, {} as Record<string, number>);

    // grid values: 0 - empty, 1 - ship placed, 2 - preview of ship's position
    const [grid, setGrid] = useState<number[][]>(defaultGrid);

    const [visibility, setVisibility] = useState<string>("hidden");

    const [gameReady, setGameReady] = useState(false);

    const [remainingShips, setRemainingShips] = useState(defaultShips);

    const [playersTurn, setPlayersTurn] = useState(true);

    const allShipsPlaced = Object.values(remainingShips).every(count => count === 0);

    // // const handleGameMode = (gameChosen: GameProps) => {
    // () => {
    //     if (gameMode.mode === "online") {
    //         setVisibility("block");
    //     } else if (gameMode.mode === "AI") {
    //         setVisibility("block");
    //     } else {
    //         setVisibility("block");
    //     }
    // }

    useEffect(() => {
        if (gameMode.mode === "online") {
            console.log("Game Mode: online! Called from Game.tsx");
            setVisibility("block");
        } else if (gameMode.mode === "AI") {
            console.log("Game Mode: ai! Called from Game.tsx");
            setVisibility("block");
        } else {
            console.log("Game Mode: programmed! Called from Game.tsx");
            setVisibility("block");
        }
    }, []);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
        if (remainingShips[id] <= 0) {
            e.preventDefault();
            return;
        } else {
            let ship = ships.find(ship => ship.id === id);
            e.dataTransfer.setData("application/json", JSON.stringify(ship))
        }
    }

    const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>, rowIndex: number, cellIndex: number) => {
        e.preventDefault();
        let shipData = e.dataTransfer.getData("application/json");

        if (!shipData) return;

        let ship;
        try {
            ship = JSON.parse(shipData);
        } catch {
            return;
        }

        setGrid(prevField => {
            const updatedField = [...prevField];
            if ((cellIndex + ship.length) <= 9) {
                if (updatedField[rowIndex][cellIndex] != 1) {
                    for (let i = 0; i < ship.length; i++) {
                        updatedField[rowIndex][cellIndex + i] = 2;
                    }
                } else {
                    updatedField[rowIndex][cellIndex] = 0;
                }
            }
            return updatedField;
        })
    }

    const handleOnDragLeave = (e: React.DragEvent<HTMLDivElement>, rowIndex: number, cellIndex: number) => {
        e.preventDefault();

        setGrid(prevField => {
            const updatedField = [...prevField];
            if (updatedField[rowIndex][cellIndex] != 1) {
                updatedField[rowIndex][cellIndex] = 0;
            }
            return updatedField;
        })
    }
    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>, rowIndex: number, cellIndex: number) => {
        e.preventDefault();
        let shipData = e.dataTransfer.getData("application/json");
        let ship = JSON.parse(shipData);

        if (remainingShips[ship.id] <= 0) return;

        setGrid(prevField => {
            const updatedField = [...prevField];
            if ((cellIndex + ship.length) <= 9) {

                const row = updatedField[rowIndex];
                const start = Math.max(0, cellIndex - 1);
                const end = Math.min(row.length, cellIndex + ship.length + 1);

                const conflict = updatedField[rowIndex]
                    .slice(start, end)
                    .some(cell => cell === 1);

                if (conflict) {
                    return updatedField; // at least one cell occupied, cancel drop
                } else {
                    for (let i = 0; i < ship.length; i++) {
                        updatedField[rowIndex][cellIndex + i] = 1;
                    }
                }
                setRemainingShips(prev => ({
                    ...prev,
                    [ship.id]: prev[ship.id] - 1
                }));

            } else {
                updatedField[rowIndex][cellIndex] = 0;
            }
            return updatedField;
        })
    }

    const handleRestore = () => {
        setGrid(defaultGrid);
        setRemainingShips(defaultShips);
    }

    const handleGameReady = () => {
        setGameReady(true);
    }

    const handleAttack = (rowIndex: number, cellIndex: number) => {
        setGrid(prevField => {
            let updatedField = [...prevField];
            if (updatedField[rowIndex][cellIndex] === 1) {
                updatedField[rowIndex][cellIndex] = 2;
            } else {
                updatedField[rowIndex][cellIndex] = 3;
            }
            return updatedField;
        })
        console.log(rowIndex, cellIndex);
    }


    return (
        <>
            <div className="absolute h-screen w-screen flex flex-col items-center max-w-full gap-8 text-2xl">
                <div className='flex flex-col justify-center items-center text-6xl font-lugrasimo mt-8 underline'>
                    Sink the fleet
                    <br />
                    <span className="text-4xl mt-4">Game mode: {gameMode.mode}</span>
                </div>
                <div className='flex flex-col justify-center items-center text-4xl font-lugrasimo font-bold border-t-3 border-b-3 p-2'>
                    {gameReady ? playersTurn ? "Your turn" : "Enemy's turn" : ""}
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex flex-col items-center">
                        <div className="font-lugrasimo text-3xl items-center mb-2 font-bold">Your Fleet</div>
                        <div className={`grid ${visibility === "hidden" ? "hidden" : "block"}`}>
                            {grid.map((row, rowIndex) => (
                                row.map((number, cellIndex) => (
                                    <div
                                        key={`${rowIndex}-${cellIndex}`}
                                        onDragEnter={(e) => e.preventDefault()}
                                        onDragOver={(e) => handleOnDragOver(e, rowIndex, cellIndex)}
                                        onDragLeave={(e) => handleOnDragLeave(e, rowIndex, cellIndex)}
                                        onDrop={(e) => handleOnDrop(e, rowIndex, cellIndex)}

                                        className="border border-black p-5  w-16 h-16 flex items-center justify-center">
                                        {/* {number === 1 ? 1 : ""} */}
                                        {number === 1 ? "#" : number === 2 ? "🔥" : number === 3 ? "🌊" : ""}
                                    </div>
                                ))
                            ))}
                        </div>
                    </div>
                    {gameReady ?
                        <div className="flex flex-col items-center">
                            <div className="font-lugrasimo text-3xl mb-2 font-bold">Enemy</div>
                            <EnemyBoard onAttack={handleAttack} isPlayersTurn={playersTurn} onPlayersTurn={(turn) => setPlayersTurn(turn)}/>
                        </div>
                        :
                        <div className="flex flex-col gap-12">
                            <div onClick={() => handleRestore()} className="flex flex-col items-center">
                                <img src={Rudder} alt="Rudder" className='h-52' />
                                <span className="mt-2 self-center font-lugrasimo">Reform the fleet</span>
                            </div>
                            {allShipsPlaced ?
                                <div onClick={() => handleGameReady()} className="flex flex-col items-center">
                                    <img src={Anchor} alt="Anchor" className='h-48' />
                                    <span className="mt-2 self-center font-lugrasimo">Lower the anchors</span>
                                </div>
                                : ""
                            }
                        </div>
                    }
                </div>
                {!gameReady ?
                    <div>
                        <div className="flex flex-col md:flex-row content-between gap-4 items-center text-center">
                            <div>
                                <div draggable onDragStart={(e) => handleDragStart(e, "Corvette")}>
                                    <img src={Corvette_ship} alt="Corvette ship" className='h-42' />
                                </div>
                                <span className="self-center">{remainingShips["Corvette"]}</span>
                            </div>
                            <div>
                                <div draggable onDragStart={(e) => handleDragStart(e, "Canoe")}>
                                    <img src={Canoe} alt="Canoe" className='h-42' />
                                </div>
                                <span className="self-center">{remainingShips["Canoe"]}</span>
                            </div>
                            <div>
                                <div draggable onDragStart={(e) => handleDragStart(e, "Warship")}>
                                    <img src={Warship} alt="Warship" className='h-42' />
                                </div>
                                <span className="self-center">{remainingShips["Warship"]}</span>
                            </div>
                            <div>
                                <div draggable onDragStart={(e) => handleDragStart(e, "Junk")}>
                                    <img src={Junk} alt="Junk ship" className='h-42' />
                                </div>
                                <span className="self-center">{remainingShips["Junk"]}</span>
                            </div>
                            <div>
                                <div draggable onDragStart={(e) => handleDragStart(e, "ManOWar")}>
                                    <img src={ManOWar} alt="ManOWar" className='h-42' />
                                </div>
                                <span className="self-center">{remainingShips["ManOWar"]}</span>
                            </div>
                        </div>
                    </div>
                    :
                    ""
                }

                <button onClick={() => onGameChosen({ mode: null })} className="font-lugrasimo">Click to return to menu</button>
            </div>
        </>

    )
}

