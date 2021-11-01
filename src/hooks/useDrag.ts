
/*
    Drag and drop megvalósításához szükséges függvények
*/

const extractVectors = (columns: any, threshold: number) => {

    let result: any = {
        data: {},
        threshold: threshold
    }
    let fail = false
    Object.entries(columns).map(([id, column]: any, index) => {
        if (column.name !== 'vectors') {
            if (column.items.length <= 0) fail = true
            result.data[column.name] = column.items.map((e: any) => {
                return e.content
            })
        }
    })
    if (fail) return false
    return result
}
const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }
}

export default () => {

    return {extractVectors, onDragEnd}

}