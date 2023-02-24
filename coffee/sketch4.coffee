# Inspiration: https://blog.openreplay.com/solid-vs-react-the-fastest-vs-the-most-popular-ui-library/
# Lathund för översättning från Solid JSX till min variant:
# <div a=3 b=4>pelle</div> => div {a:3, b:4},"Pelle"
# 'r4r => App' ersätter 'render(() => <App />, document.getElementById("app"));'
#   (Lägg in id=app i body i index.html)
# saknas en html-kod, skriv in den i utils.js, enligt 'export button = (a...) => h "button", a"'
# ersätt createSignal med signal
# Testkör logiken genom att lägga in anrop till r4r => App i events. 
#   (Rensa med document.body.innerHTML = "" innan varje anrop till r4r => App)
# Använd coffeescripts loopar och if-satser. <For> behövs ej.
# Använd "do" då loopar och events förekommer samtidigt. Annars används loop-variablens sista värde.
# Rensa bort onödiga skräptecken som semikolon, parenteser, måsvingar, </>, och ()
# Till exempel kan man ta bort de sista nio raderna i originalkoden.
# return kan oftast strykas.
# Typer kan tas bort.

import {r4r,signal,memo} from "/js/utils.js"
import {input,button,div,log,b} from "/js/utils.js"

# All data måste ligga före App!
[todos, setTodos] = signal [
	{id: "1", text: "Adam", done: false},
	{id: "2", text: "Bertil", done: true},
	{id: "3", text: "Cesar", done: false},
	{id: "4", text: "David", done: true},
]
[inputx, setInputx] = signal ""

App = =>

	doneTodos   = memo => todos().filter (todo) =>  todo.done
	undoneTodos = memo => todos().filter (todo) => !todo.done

	createTodo = (text) => setTodos => [...todos(), { id: "#{Math.random()}", text, done: false }]
	removeTodo = (todoId) => setTodos todos().filter (todo) => todo.id != todoId
	setTodoDone = (todoId, done) => setTodos todos().map (todo) => if todo.id == todoId then { ...todo, done } else todo

	addTodo = =>
		currentInput = inputx()
		if currentInput
			createTodo currentInput
			setInputx ""

	onkeydown = (event) =>
		if event.key == "Enter"
			setInputx event.target.value
			addTodo()

	addClick = (event) =>
		setInputx inp.value
		addTodo()
	
	div {},
		inp = input {value: inputx(), onkeydown}
		button {onClick: addClick}, "Add"
		div {}, 
			b {}, "Todo"
		for todo in undoneTodos()
			do (todo) =>
				div {}, 
					todo.text
					button {onClick: => setTodoDone todo.id, true}, "Done"
		div {}, 
			b {}, "Done:"
			for todo in doneTodos()
				do (todo) =>
					div {},
						todo.text
						button {onClick: => removeTodo todo.id}, "Remove"
						button {onClick: => setTodoDone todo.id, false}, "Undo"
r4r => App

# Originalkod (85 rader):

# import { For, render } from "solid-js/web";
# import { createMemo, createSignal } from "solid-js";

# interface TODO {
#     id: string;
#     text: string;
#     done: boolean;
# }

# const App = () => {
#     const [todos, setTodos] = createSignal<TODO[]>([]);
#     const [input, setInput] = createSignal("");
#     const doneTodos = createMemo(() => todos().filter((todo) => todo.done));
#     const undoneTodos = createMemo(() => todos().filter((todo) => !todo.done));
#     const createTodo = (text: string) => {
#     setTodos([...todos(), { id: `${Math.random()}`, text, done: false }]);
#     };
#     const removeTodo = (todoId: string) => {
#     setTodos(todos().filter((todo) => todo.id !== todoId));
#     };
#     const setTodoDone = (todoId: string, done: boolean) => {
#     setTodos(
#         todos().map((todo) => {
#         if (todo.id === todoId) {
#             return { ...todo, done };
#         }
#         return todo;
#         })
#     );
#     };
#     const addTodo = () => {
#     const currentInput = input();
#     if (currentInput) {
#         createTodo(currentInput);
#         setInput("");
#     }
#     };
#     const onInput = (event: InputEvent) => {
#     const target = event.target as HTMLInputElement;

#     setInput(target.value);
#     };
#     const onKeydown = (event: KeyboardEvent) => {
#     if (event.key === "Enter") {
#         addTodo();
#     }
#     };

#     return (
#     <div>
#         <input value={input()} onInput={onInput} onKeyDown={onKeydown} />
#         <button onClick={addTodo}>Add</button>
#         <div>
#         <b>Todo:</b>
#         <For each={undoneTodos()}>
#             {(todo) => {
#             return (
#                 <div>
#                 {todo.text}
#                 <button onClick={() => setTodoDone(todo.id, true)}>Done</button>
#                 </div>
#             );
#             }}
#         </For>
#         </div>
#         <div>
#         <b>Done:</b>
#         <For each={doneTodos()}>
#             {(todo) => {
#             return (
#                 <div>
#                 {todo.text}
#                 <button onClick={() => removeTodo(todo.id)}>Remove</button>
#                 <button onClick={() => setTodoDone(todo.id, false)}>
#                     Undo
#                 </button>
#                 </div>
#             );
#             }}
#         </For>
#         </div>
#     </div>
#     );
# };

# render(() => <App />, document.getElementById("app"));