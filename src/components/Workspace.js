import { useState, useEffect } from 'react'
import Column from './Column'
import BoardList from './BoardList'

function Workspace() {
    const [boards, setBoards] = useState([])
    const [activeBoard, setActiveBoard] = useState(false)

    const addColumn = (e) => {
        e.preventDefault()
        const newBoards = [...boards]
        const newBoardTitle = new FormData(e.target).get('newColumnTitle')
        newBoards[activeBoard].columns.push({title: newBoardTitle ? newBoardTitle : 'Новая колонка', tasks: []})
        setBoards(newBoards)

        e.target.querySelector('[name="newColumnTitle"]').value = ''
    }

    useEffect(() => {
        if (boards.length === 0) {
        setActiveBoard(false)
        return
        }

        if (boards.length === 1) {
        setActiveBoard(0)
        return
        }

        if (activeBoard > boards.length - 1) {
        setActiveBoard(boards.length - 1)
        return
        }
    }, [boards])

    return (

    <div className="workspace">
        
        <BoardList 
            boards={boards}
            setBoards={setBoards}
            activeBoard={activeBoard}
            setActiveBoard={setActiveBoard}
        />

        <div className="board_wrap">
                <div className="board">
                    {
                    (activeBoard !== false && typeof boards[activeBoard]?.columns !== "undefined") &&
                        boards[activeBoard].columns.map((column, cIndex) => (
                            <Column 
                                key={cIndex}
                                title={column.title}
                                cIndex={cIndex}
                                boards={boards}
                                setBoards={setBoards}
                                activeBoard={activeBoard}
                            />
                        ))          
                    }

                    {
                    boards.length > 0 &&
                    <div className="column_wrap add">
                        <div className="column add">
                            <span className="column_title">
                                <span className="column_title_text">Добавить новую колонку:</span>
                            </span>
                            <form action="" className="column_add_form" onSubmit={e => addColumn(e)}>
                                <input type="text" name="newColumnTitle" placeholder="Введите название" />
                                <input type="submit" value="Добавить" />
                            </form>
                        </div>
                    </div>
                    }
                </div>
        </div>
    </div>    

    )
}

export default Workspace
