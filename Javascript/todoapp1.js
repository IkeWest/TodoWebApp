let todos = getSavedtodos()

//Creates a todo object and adds it to the todos array above
const addtotodo = (input) => {
    let addtodo = {
        id : uuidv4(),
        todo: input,
        completed: false
    }
    todos.push(addtodo) 
}

searchkeep = {
    todossearch: "",
    hidecompletetodo: ""
}


renderTodos(todos, searchkeep)



//Works with the object and function above to filter the todos according to search input
//It uses the placeholder above to store the input
document.querySelector("#Search-input").addEventListener("input", (event) => {
    searchkeep.todossearch = event.target.value
    renderTodos(todos, searchkeep)
})

//Works with the placeholders above to remove completed todos
document.querySelector("#uncompleted-todos").addEventListener("change", (event) => {
    searchkeep.hidecompletetodo = event.target.checked
    renderTodos(todos, searchkeep)
})

//Takes in the input from the todo form and then uses the addtotodo function to add a new todo to the todos object
document.querySelector("#todo-form").addEventListener("submit", (event) => {
    event.preventDefault()
    addtotodo(event.target.todo.value)
    saveTodos(todos)
    renderTodos(todos, searchkeep)
    event.target.todo.value = ""
})