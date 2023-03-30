import {useState} from 'react'
import EditIcons from './EditIcons'

function Board( {boards, setBoards, board, index, activeBoard, boardClickHandler, removeBoard} ) {

    const [isEdit, setIsEdit] = useState(false)

    const changeBoard = (e) => {
        e.preventDefault()
        const newBoards = [...boards]
        const newBoardTitle = new FormData(e.target).get('newBoardTitle')
        newBoards[index].title = newBoardTitle ? newBoardTitle : "Без имени"
        setBoards(newBoards)
        setIsEdit(false)
    }

    const moveBoard = (index, newIndex) => {
        const newBoards = [...boards]
        if (typeof newBoards[newIndex]?.title !== 'undefined') {
            const board = newBoards[index]
            newBoards.splice(index, 1)
            newBoards.splice(newIndex, 0, board)
            setBoards(newBoards)
            return
        }    
    }

    return (
        <li className="board_list_item" key={index}>
            {
                !isEdit ?
                <span className={`board_list_item_title ${index === activeBoard ? 'active' : null}`} onClick={() => boardClickHandler(index)}>{board.title}</span> :
                <form className="change_form" onSubmit={e => changeBoard(e)}>
                    <input type="text" name="newBoardTitle" defaultValue={board.title} placeholder="Введите название доски"/>
                    <button type="submit">
                        <span className="material-symbols-outlined">done</span>
                    </button>
                </form>
            }
            <EditIcons
                move={moveBoard}
                setIsEdit={setIsEdit}
                remove={removeBoard}
                type={'board'}
                args={
                    {
                        index: index
                    }
                }
            />
        </li>
    )
}

export default Board
