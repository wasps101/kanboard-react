import { useState } from 'react'
import Task from './Task'
import EditIcons from './EditIcons'

function Column( { title, cIndex, boards, setBoards, activeBoard } ) {

    const [isAddTaskOpened, setIsAddTaskOpened] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const removeColumn = (index) => {
        const newBoards = [...boards]
        newBoards[activeBoard].columns.splice(index, 1)
        setBoards(newBoards)
    }

    const addTask = (e) => {
        e.preventDefault()
        const newBoards = [...boards]
        const taskForm = new FormData(e.target)
        const task = {
            title: taskForm.get('title'),
            comment: taskForm.get('comment'),
            deadlineDate: taskForm.get('deadlineDate'),
        }
        newBoards[activeBoard].columns[cIndex].tasks.push(
            {
                title: task.title ? task.title : "Новая задача",
                comment: task.comment,
                deadlineDate: task.deadlineDate 
            }  
        )
        setBoards(newBoards)
        setIsAddTaskOpened(false)
    }

    const changeName = (e) => {
        e.preventDefault()
        const newBoards = [...boards]
        const newColumnTitle = new FormData(e.target).get('newColumnTitle')
        newBoards[activeBoard].columns[cIndex].title = newColumnTitle
        setBoards(newBoards)
        setIsEdit(false)
    }

    const moveColumn = (index, newIndex) => {
        const newBoards = [...boards]
        if (typeof newBoards[activeBoard]?.columns[newIndex] !== 'undefined') {
            const column = newBoards[activeBoard].columns[index]
            newBoards[activeBoard].columns.splice(index, 1)
            newBoards[activeBoard].columns.splice(newIndex, 0, column)
            setBoards(newBoards)
            return
        }    
    }

    return (
        <div className="column_wrap" key={cIndex}>
            <div className="column">
                <span className="column_title">

                    {
                        !isEdit ?
                        <span className="column_title_text">{title}</span> :
                        <form className="change_form" onSubmit={e => changeName(e)}>
                            <input type="text" name="newColumnTitle" defaultValue={title}/>
                            <button type="submit">
                                <span className="material-symbols-outlined">done</span>
                            </button>
                        </form>
                    }
                    {
                        !isEdit &&
                        <EditIcons
                            move={moveColumn}
                            setIsEdit={setIsEdit}
                            remove={removeColumn}
                            type={'column'}
                            args={
                                {
                                    index: cIndex
                                }
                            }
                        />
                    }
                    
                </span>

                <ul className="task_list">
                    {
                        boards[activeBoard].columns[cIndex].tasks.length > 0 &&
                        boards[activeBoard].columns[cIndex].tasks.map((task, tIndex) => (
                        <Task 
                            key={tIndex}
                            boards={boards}
                            setBoards={setBoards}
                            activeBoard={activeBoard}
                            task={task} 
                            cIndex={cIndex} 
                            tIndex={tIndex}                                      
                        />
                        ))
                    }

                    <li className="task add_task_wrap">
                        <div className={`add_task ${ isAddTaskOpened ? 'active' : '' }`} onClick={() => setIsAddTaskOpened(!isAddTaskOpened)}>
                            <span className="material-symbols-outlined">add_task</span>
                            <span className="add_task_text">Добавить задачу</span>
                        </div>
                        {   
                            isAddTaskOpened &&
                            <form name="addTask" className="new_task" onSubmit={e => addTask(e, cIndex)}>
                                <input type="text" name="title" id="" placeholder="Имя новой задачи"/>
                                <textarea name="comment" id="" cols="10" rows="3"placeholder="Комментарий для новой задачи"></textarea>
                                <input type="date" name="deadlineDate" id="" />
                                <input type="submit" value="Создать задачу" />
                            </form>
                        }
                    </li>
                </ul>            
            </div>
        </div>
    )
}

export default Column
