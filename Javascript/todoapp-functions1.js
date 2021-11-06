//Looks at local storage whether there is a saved file and retrieve it if any
//If none it creates an empty array
const getSavedtodos =  () => {
const todoJSON = localStorage.getItem("todos")
return todoJSON !== null ? JSON.parse(todoJSON) : []
}



//Saves the todo data to local storage
const saveTodos =  (todos) => localStorage.setItem("todos", JSON.stringify(todos))


//Quite useless but to fulfil all righteousness
//It checks id match and then changes the value of completed to true
const markComplete = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todos[todoIndex].completed === true) {
        let unmark = confirm(`${todos[todoIndex].todo} has already been marked completed. Do you want to unmark it?`)
        if (unmark === true) {
            todos[todoIndex].completed = false
        }
    } else {
    todos[todoIndex].completed = true}
}
    

//Remove Todo from the array
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

//Takes in the todos and renders them on the webpage
const renderTodos = (todos, searchkeep) => {
    const filtertodos = todos.filter((todo) => {
        const todosearchMatch = todo.todo.toLowerCase().includes(searchkeep.todossearch.toLowerCase())
        const hidecompletetodoMatch = !searchkeep.hidecompletetodo || !todo.completed

        return todosearchMatch && hidecompletetodoMatch
    })

    const incompletetodos = filtertodos.filter((todo) => !todo.completed)

    document.querySelector("#todos").innerHTML = ""
    document.querySelector("#Summary").innerHTML = ""


    generatesummaryDOM(incompletetodos)

    filtertodos.forEach((todo) => {
        document.querySelector("#todos").appendChild(generatetodosDOM(todo))
    })

}

//Creates a todos element for the DOM
const generatetodosDOM = (todo) => {
    const todoel = document.createElement("div")
    const checkbox = document.createElement("input")
    checkbox.setAttribute("class", "checking")
    const space = document.createElement("span")
    const todotext = document.createElement("span")
    const removeButton = document.createElement("button")
    removeButton.setAttribute("class", "buttoning")

    //Todos checkbox
    checkbox.setAttribute("type", "checkbox") 
    checkbox.checked = todo.completed
    todoel.appendChild(checkbox)
    checkbox.addEventListener("change", (event) => {
        markComplete(todo.id)
        saveTodos(todos)
        renderTodos(todos, searchkeep)
    })

    //Space in span
    space.textContent = "            "
    todoel.appendChild(space)

    //Todos text
    todotext.textContent = todo.todo
    todoel.appendChild(todotext)
    
    //Todos remove button
    removeButton.textContent = "X"
    todoel.appendChild(removeButton)
    removeButton.addEventListener("click", () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, searchkeep)
    })

    return todoel
}

//Creates the summary element for the DOM
const generatesummaryDOM = (incompletetodos) => {
    const todossummary = document.createElement("h2")
    todossummary.setAttribute("class", "header")
    todossummary.textContent = `You have ${incompletetodos.length} todos left to complete`
    document.querySelector("div").appendChild(todossummary)
    return todossummary
}
