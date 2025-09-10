import { useEffect, useState } from "react"
import Corvette_ship from '../assets/Corvette_ship.png'
import Canoe from '../assets/Canoe.png'
import Warship from '../assets/Warship.png'
import Junk from '../assets/Junk.png'
import ManOWar from '../assets/ManOWar.png'
import type { GameMode } from "./Types/GameMode"

type GameProps = {
    gameMode: GameMode
    onGameChosen: (mode: GameMode) => void;
}
export const Game = ({ gameMode, onGameChosen }: GameProps) => {


    // grid values: 0 - empty, 1 - ship placed, 2 - preview of ship's position
    const [grid, setGrid] = useState<number[][]>([
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ])

    const ships = [
        { id: "Corvette", length: 2 },
        { id: "Canoe", length: 1 },
        { id: "Warship", length: 3 },
        { id: "Junk", length: 4 },
        { id: "ManOWar", length: 5 },
    ]

    const [visibility, setVisibility] = useState<string>("hidden");


    // const handleGameMode = (gameChosen: GameProps) => {
    () => {
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
    }

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
        let ship = ships.find(ship => ship.id === id);
        const length = ship?.length;
        console.log(id, length);

        e.dataTransfer.setData("application/json", JSON.stringify(ship))
    }

    const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>, rowIndex: number, cellIndex: number) => {
        console.log(e + "Row: " + rowIndex + "Cell: " + cellIndex);
    }



    return (
        <>
            <div className="absolute h-screen w-screen flex flex-col justify-center items-center max-w-full gap-8 text-2xl mt-9">
                {/* TODO: Add the name of the mode next to the title*/}
                <div className='flex flex-col justify-center items-center text-6xl font-lugrasimo mt-8 underline'>
                    Sink the fleet 
                    <br />
                    <span className="text-4xl mt-4">Mode: {gameMode.mode}</span>
                </div>
                <div className="grid">
                    {grid.map((row, rowIndex) => (
                        row.map((number, cellIndex) => (
                            <div
                                key={`${rowIndex}-${cellIndex}`}
                                onDragOver={(e) => handleOnDragOver(e, rowIndex, cellIndex)}
                                // onDragLeave={}
                                // onDrop={}

                                className="border border-black p-5">
                                {number}
                            </div>
                        ))
                    ))}
                </div>

                <div>
                    <div className="flex flex-row content-between gap-4 items-center text-center">
                        <div>
                            <div draggable onDragStart={(e) => handleDragStart(e, "Corvette")}>
                                <img src={Corvette_ship} alt="Corvette ship" className='h-42' />
                            </div>
                            <span className="self-center">0</span>
                        </div>
                        <div>
                            <div draggable onDragStart={(e) => handleDragStart(e, "Canoe")}>
                                <img src={Canoe} alt="Canoe" className='h-42' />
                            </div>
                            <span className="self-center">0</span>
                        </div>
                        <div>
                            <div draggable onDragStart={(e) => handleDragStart(e, "Warship")}>
                                <img src={Warship} alt="Warship" className='h-42' />
                            </div>
                            <span className="self-center">0</span>
                        </div>
                        <div>
                            <div draggable onDragStart={(e) => handleDragStart(e, "Junk")}>
                                <img src={Junk} alt="Junk ship" className='h-42' />
                            </div>
                            <span className="self-center">0</span>
                        </div>
                        <div>
                            <div draggable onDragStart={(e) => handleDragStart(e, "ManOWar")}>
                                <img src={ManOWar} alt="ManOWar" className='h-42' />
                            </div>
                            <span className="self-center">0</span>
                        </div>
                    </div>
                </div>


                <button onClick={() => onGameChosen({ mode: null })} className="font-lugrasimo">Click to return to menu</button>
            </div>
        </>

    )
}

