
function EditIcons( { move, setIsEdit, remove, type, args } ) {

    console.log(args)

    const handleMoveItem = (direction) => {
        switch(type) {
            case 'board':
                move(args.index, args.index + direction)
                break
            case 'column':
                move(args.index, args.index + direction)
                break
            case 'task':
                move(args.cIndex, args.tIndex, args.cIndex + direction)
            default:
                console.error("Произошла ошибка при обработке клика по элементу")
        }
    }

    const handleRemoveItem = () => {
        switch(type) {
            case 'board':
                remove(args.index)
                break
            case 'column':
                remove(args.index)
                break
            case 'task':
                remove(args.cIndex, args.tIndex)
            default:
                console.error("Произошла ошибка при обработке клика по элементу")
        }
    }

    return (
        <div className="edit_icons">
            <span className="material-symbols-outlined back" onClick={() => handleMoveItem(-1)} title="Переместить назад">arrow_back_ios</span>
            <span className="material-symbols-outlined edit" onClick={() => setIsEdit(true)} title="Редактировать">edit_note</span>
            <span className="material-symbols-outlined remove" onClick={() => handleRemoveItem()} title="Удалить">delete_forever</span>
            <span className="material-symbols-outlined forward" onClick={() => handleMoveItem(1)} title="Переместить вперед">arrow_forward_ios</span>
        </div>
    )
}

export default EditIcons
