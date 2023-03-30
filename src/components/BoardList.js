import { useState } from 'react'
import Board from './Board'

function BoardList( { boards, setBoards, activeBoard, setActiveBoard } ) {

    const [panelOpen, setPanelOpen] = useState(false)

    const addBoard = (e) => {
        e.preventDefault()
        const newBoardTitle = new FormData(e.target).get('newBoardTitle') ? new FormData(e.target).get('newBoardTitle') : "Новая доска"
        setBoards([...boards, {title: newBoardTitle, columns: []}])
    }

    const boardClickHandler = (index) => {
        setActiveBoard(index)
    }

    const removeBoard = (index) => {
        const newBoards = [...boards]
        newBoards.splice(index, 1)
        setBoards(newBoards)
    }

    function ListAlbumView() {
        return (
            <ul className="board_list">
                <li className="board_list_item">Мои доски:</li>
                {
                boards.length > 0 &&
                boards.map((board, index) => (
                    <Board
                        key={index}
                        boards={boards}
                        setBoards={setBoards}
                        board={board}
                        index={index}
                        activeBoard={activeBoard}
                        boardClickHandler={boardClickHandler}
                        removeBoard={removeBoard}
                    />
                ))
                }

                <li className="board_list_item board_list_add_item" onSubmit={e => addBoard(e)}>
                    <form className="add_board_form">
                        <input type="text" name="newBoardTitle" placeholder="Введите название доски"/>
                        <input type="submit" value="Добавить доску" />
                    </form>
                </li>
            </ul>
        )
    }

    function ListPortraitView() {
        return (
            <ul className="board_list small">
                <li className="board_list_item">
                    <span>Мои доски: </span>
                    {!panelOpen && <span className="material-symbols-outlined top-panel-icon open" onClick={() => setPanelOpen(true)}>top_panel_open</span>}
                    {panelOpen && <span className="material-symbols-outlined top-panel-icon close" onClick={() => setPanelOpen(false)}>top_panel_close</span>}
                </li>

                {
                    panelOpen &&
                    <>
                        {
                        boards.length > 0 &&
                        boards.map((board, index) => (
                            <Board
                                key={index}
                                boards={boards}
                                setBoards={setBoards}
                                board={board}
                                index={index}
                                activeBoard={activeBoard}
                                boardClickHandler={boardClickHandler}
                                removeBoard={removeBoard}
                            />
                        ))
                        }
                    </>
                }


                <li className="board_list_item board_list_add_item" onSubmit={e => addBoard(e)}>
                    <form className="add_board_form">
                        <input type="text" name="newBoardTitle" />
                        <input type="submit" value="Добавить доску" />
                    </form>
                </li>
            </ul>
        )
    }

    return (
        <>
            <ListAlbumView />
            <ListPortraitView />
        </>
    )
}

export default BoardList
