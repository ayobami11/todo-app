import { useContext } from "react";

import { DragDropContext, Draggable } from "react-beautiful-dnd";

import { AppContext } from "../contexts/app";

import StrictModeDroppable from "./StrictModeDroppable";

import TodoItem from "./TodoItem";

const TodoList = ({ todos }) => {
    const { dispatch } = useContext(AppContext);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const newTodos = [...todos];
        const [removed] = newTodos.splice(result.source.index, 1);
        newTodos.splice(result.destination.index, 0, removed);

        dispatch({ type: 'REORDER_TODOS', payload: { todos: newTodos } });
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId="droppable">
                {(droppableProvided) => (
                    <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                        <ul>
                            {todos.map((todo, index) => (
                                <li key={todo.id}>
                                    <Draggable draggableId={todo.id} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <TodoItem placeholder={droppableProvided.placeholder} {...todo} />
                                                {/* this is necessary to prevent the Droppable without provided.placeholder warning */}
                                                {droppableProvided.placeholder}
                                            </div>
                                        )}
                                    </Draggable>
                                </li >
                            ))}
                        </ul>
                    </div>
                )}
            </StrictModeDroppable>
        </DragDropContext>
    )
}

export default TodoList;