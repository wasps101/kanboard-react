import { useState } from 'react'
import EditIcons from './EditIcons'

function Task( {boards, setBoards, activeBoard, task, cIndex, tIndex} ) {

    const [isOpen, setIsOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const removeTask = (cIndex, tIndex) => {
        const newBoards = [...boards]
        newBoards[activeBoard].columns[cIndex].tasks.splice(tIndex, 1)
        setBoards(newBoards)
    }

    const moveTask = (cIndex, tIndex, cIndexNew) => {
        const newBoards = [...boards]
        if (typeof newBoards[activeBoard].columns[cIndexNew]?.tasks !== 'undefined') {
            const task = newBoards[activeBoard].columns[cIndex].tasks.splice(tIndex, 1)
            newBoards[activeBoard].columns[cIndexNew].tasks.push(task[0])
            setBoards(newBoards)
        }    
    }

    const changeTask = (e) => {
        e.preventDefault()
        const newBoards = [...boards]
        const task = newBoards[activeBoard].columns[cIndex].tasks[tIndex]
        const formData = new FormData(e.target)
        task.title = formData.get('title')
        task.comment = formData.get('comment')
        task.deadlineDate = formData.get('deadlineDate')
        setBoards(newBoards)
        setIsEdit(false)
    }

    const handleDateChange = (e) => {
        const newBoards = [...boards]
        newBoards[activeBoard].columns[cIndex].tasks[tIndex].deadlineDate = e.target.value
        setBoards(newBoards)
    }

    const TaskRender = () => {
        return (
            <li className={`task ${isOpen ? 'opened' : ''}`}>
                <div className="task_main">
                    <span className="task_title" onClick={() => setIsOpen(!isOpen)}>{task.title}</span>
                    <EditIcons
                        move={moveTask}
                        setIsEdit={setIsEdit}
                        remove={removeTask}
                        type={'task'}
                        args={
                            {
                                cIndex: cIndex,
                                tIndex: tIndex
                            }
                        }
                    />
                </div>
                {   
                    isOpen &&
                    <div className="task_additional_info">
                        <div className="task_comment">
                            <span className="task_comment_label">Комментарий: </span>
                            <span className="task_comment_body">{task.comment}</span>
                        </div>
                        <form className="task_deadline">
                            <label for="deadlineDate">Дедлайн: </label>
                            <input type="date" name="deadlineDate" defaultValue={task.deadlineDate} onChange={e => handleDateChange(e)}/>
                        </form>               
                    </div>
                }
            </li>
        )
    }

    const TaskEdit = () => {
        return (

            <li className="task edit" >              
                <form className="change_form change_task" onSubmit={e => changeTask(e)}>
                    <input type="text" name="title" placeholder="Имя задачи" defaultValue={task.title}/>
                    <textarea name="comment" cols="10" rows="3"placeholder="Комментарий для задачи" defaultValue={task.comment}></textarea>
                    <input type="date" name="deadlineDate" defaultValue={task.deadlineDate}/>
                    <input type="submit" value="Отредактировать задачу" />
                </form>               
            </li>
        )
    }

    return (
        
        <>
            { !isEdit ? <TaskRender /> : <TaskEdit />}
        </>
    )
}

export default Task
