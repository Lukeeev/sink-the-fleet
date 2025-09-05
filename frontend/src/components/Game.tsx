import { useState } from "react"


export const Game = () => {

    const [grid, setGrid] = useState<number[][]>([
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ])

  return (
    <div className="hidden absolute">
        <div className='flex flex-row justify-center text-9xl font-lugrasimo mt-8 underline'>
        Sink the fleet
        </div>
        <div className="grid">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((number, cellIndex) => (
                        <div key={cellIndex} className="cell">{number}</div>
                    ))}
                </div>
            ))}
        </div>
    </div>
  )
}

