export default (tasks=[],action)=>{
    debugger;
    switch (action.type) {
        case 'FETCH_ALL':
           return action.payload;
        case 'UPDATE':
            return tasks.map(task => task.id===action.payload.id?action.payload:task)
            //return posts.map(post => post._id===action.payload._id?action.payload:post)
        case 'CREATE':
            return [...tasks,action.payload];
        case 'DELETE':
            return tasks.filter(task => task.id!==action.payload);
        default:
            return tasks;
    }
}