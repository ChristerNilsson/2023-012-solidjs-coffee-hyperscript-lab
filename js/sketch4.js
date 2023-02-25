// Generated by CoffeeScript 2.5.1
// Inspiration: https://blog.openreplay.com/solid-vs-react-the-fastest-vs-the-most-popular-ui-library/
// Lathund för översättning från Solid JSX till min variant:
// <div a=3 b=4>pelle</div> => div {a:3, b:4},"Pelle"
// 'r4r => App' ersätter 'render(() => <App />, document.getElementById("app"));'
//   (Lägg in id=app i body i index.html)
// saknas en html-kod, skriv in den i utils.js, enligt 'export button = (a...) => h "button", a"'
// ersätt createSignal med signal
// Testkör logiken genom att lägga in anrop till r4r => App i events. 
//   (Rensa med document.body.innerHTML = "" innan varje anrop till r4r => App)
// Använd coffeescripts loopar och if-satser. <For> behövs ej.
// Använd "do" då loopar och events förekommer samtidigt. Annars används loop-variablens sista värde.
// Rensa bort onödiga skräptecken som semikolon, parenteser, måsvingar, </>, och ()
// Till exempel kan man ta bort de sista nio raderna i originalkoden.
// return kan oftast strykas.
// Typer kan tas bort.
var App, setTodos, todos;

import {
  log,
  r4r,
  signal
} from "/js/utils.js";

import {
  input,
  button,
  div,
  b,
  p
} from "/js/utils.js";

// All data måste ligga före App!
[todos, setTodos] = signal([
  {
    id: "1",
    text: "Adam",
    done: false
  },
  {
    id: "2",
    text: "Bertil",
    done: true
  },
  {
    id: "3",
    text: "Cesar",
    done: false
  },
  {
    id: "4",
    text: "David",
    done: true
  }
]);

App = () => {
  var addClick, addTodo, createTodo, doneTodos, inp, onkeydown, removeTodo, setTodoDone, todo, undoneTodos;
  doneTodos = () => {
    return todos().filter((todo) => {
      return todo.done;
    });
  };
  undoneTodos = () => {
    return todos().filter((todo) => {
      return !todo.done;
    });
  };
  createTodo = (text) => {
    return setTodos(() => {
      return [
        ...todos(),
        {
          id: `${Math.random()}`,
          text,
          done: false
        }
      ];
    });
  };
  removeTodo = (todoId) => {
    return setTodos(todos().filter((todo) => {
      return todo.id !== todoId;
    }));
  };
  setTodoDone = (todoId, done) => {
    return setTodos(todos().map((todo) => {
      if (todo.id === todoId) {
        return {...todo, done};
      } else {
        return todo;
      }
    }));
  };
  addTodo = (s) => {
    if (s) {
      return createTodo(s);
    }
  };
  onkeydown = (event) => {
    if (event.key === "Enter") {
      return addTodo(event.target.value);
    }
  };
  addClick = (event) => {
    return addTodo(inp.value);
  };
  return div({}, inp = input({
    value: "",
    onkeydown
  }), button({
    onClick: addClick
  }, "Add"), p({}, b({}, "Todo"), (function() {
    var i, len, ref, results;
    ref = undoneTodos();
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      todo = ref[i];
      results.push(((todo) => {
        return div({}, button({
          onClick: () => {
            return setTodoDone(todo.id, true);
          }
        }, "Done"), " " + todo.text);
      })(todo));
    }
    return results;
  }).call(this)), p({}, b({}, "Done"), (function() {
    var i, len, ref, results;
    ref = doneTodos();
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      todo = ref[i];
      results.push(((todo) => {
        return div({}, button({
          onClick: () => {
            return removeTodo(todo.id);
          }
        }, "Remove"), button({
          onClick: () => {
            return setTodoDone(todo.id, false);
          }
        }, "Undo"), " " + todo.text);
      })(todo));
    }
    return results;
  }).call(this)));
};

r4r(() => {
  return App;
});

// Originalkod (85 rader):

// import { For, render } from "solid-js/web";
// import { createMemo, createSignal } from "solid-js";

// interface TODO {
//     id: string;
//     text: string;
//     done: boolean;
// }

// const App = () => {
//     const [todos, setTodos] = createSignal<TODO[]>([]);
//     const [input, setInput] = createSignal("");
//     const doneTodos = createMemo(() => todos().filter((todo) => todo.done));
//     const undoneTodos = createMemo(() => todos().filter((todo) => !todo.done));
//     const createTodo = (text: string) => {
//     setTodos([...todos(), { id: `${Math.random()}`, text, done: false }]);
//     };
//     const removeTodo = (todoId: string) => {
//     setTodos(todos().filter((todo) => todo.id !== todoId));
//     };
//     const setTodoDone = (todoId: string, done: boolean) => {
//     setTodos(
//         todos().map((todo) => {
//         if (todo.id === todoId) {
//             return { ...todo, done };
//         }
//         return todo;
//         })
//     );
//     };
//     const addTodo = () => {
//     const currentInput = input();
//     if (currentInput) {
//         createTodo(currentInput);
//         setInput("");
//     }
//     };
//     const onInput = (event: InputEvent) => {
//     const target = event.target as HTMLInputElement;

//     setInput(target.value);
//     };
//     const onKeydown = (event: KeyboardEvent) => {
//     if (event.key === "Enter") {
//         addTodo();
//     }
//     };

//     return (
//     <div>
//         <input value={input()} onInput={onInput} onKeyDown={onKeydown} />
//         <button onClick={addTodo}>Add</button>
//         <div>
//         <b>Todo:</b>
//         <For each={undoneTodos()}>
//             {(todo) => {
//             return (
//                 <div>
//                 {todo.text}
//                 <button onClick={() => setTodoDone(todo.id, true)}>Done</button>
//                 </div>
//             );
//             }}
//         </For>
//         </div>
//         <div>
//         <b>Done:</b>
//         <For each={doneTodos()}>
//             {(todo) => {
//             return (
//                 <div>
//                 {todo.text}
//                 <button onClick={() => removeTodo(todo.id)}>Remove</button>
//                 <button onClick={() => setTodoDone(todo.id, false)}>
//                     Undo
//                 </button>
//                 </div>
//             );
//             }}
//         </For>
//         </div>
//     </div>
//     );
// };

// render(() => <App />, document.getElementById("app"));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoNC5qcyIsInNvdXJjZVJvb3QiOiIuLiIsInNvdXJjZXMiOlsiY29mZmVlXFxza2V0Y2g0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBY3FCOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBLEdBQUEsRUFBQSxRQUFBLEVBQUE7O0FBRXJCLE9BQUE7RUFBUSxHQUFSO0VBQVksR0FBWjtFQUFnQixNQUFoQjtDQUFBLE1BQUE7O0FBQ0EsT0FBQTtFQUFRLEtBQVI7RUFBYyxNQUFkO0VBQXFCLEdBQXJCO0VBQXlCLENBQXpCO0VBQTJCLENBQTNCO0NBQUEsTUFBQSxlQUhxQjs7O0FBTXJCLENBQUMsS0FBRCxFQUFRLFFBQVIsQ0FBQSxHQUFvQixNQUFBLENBQU87RUFDMUI7SUFBQyxFQUFBLEVBQUksR0FBTDtJQUFVLElBQUEsRUFBTSxNQUFoQjtJQUF3QixJQUFBLEVBQU07RUFBOUIsQ0FEMEI7RUFFMUI7SUFBQyxFQUFBLEVBQUksR0FBTDtJQUFVLElBQUEsRUFBTSxRQUFoQjtJQUEwQixJQUFBLEVBQU07RUFBaEMsQ0FGMEI7RUFHMUI7SUFBQyxFQUFBLEVBQUksR0FBTDtJQUFVLElBQUEsRUFBTSxPQUFoQjtJQUF5QixJQUFBLEVBQU07RUFBL0IsQ0FIMEI7RUFJMUI7SUFBQyxFQUFBLEVBQUksR0FBTDtJQUFVLElBQUEsRUFBTSxPQUFoQjtJQUF5QixJQUFBLEVBQU07RUFBL0IsQ0FKMEI7Q0FBUDs7QUFPcEIsR0FBQSxHQUFNLENBQUEsQ0FBQSxHQUFBO0FBRU4sTUFBQSxRQUFBLEVBQUEsT0FBQSxFQUFBLFVBQUEsRUFBQSxTQUFBLEVBQUEsR0FBQSxFQUFBLFNBQUEsRUFBQSxVQUFBLEVBQUEsV0FBQSxFQUFBLElBQUEsRUFBQTtFQUFDLFNBQUEsR0FBZSxDQUFBLENBQUEsR0FBQTtXQUFHLEtBQUEsQ0FBQSxDQUFPLENBQUMsTUFBUixDQUFlLENBQUMsSUFBRCxDQUFBLEdBQUE7YUFBVyxJQUFJLENBQUM7SUFBaEIsQ0FBZjtFQUFI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QUMsRUFBakIsRUFBcUIsS0FBckI7VUFBSDtRQUFWLENBQVAsRUFBaUQsTUFBakQsQ0FGWSxFQUdaLEdBQUEsR0FBTSxJQUFJLENBQUMsSUFIQztNQUFWLENBQUEsRUFBQztJQURMLENBQUE7O2VBRkQsQ0FURDtBQWJLOztBQTZCTixHQUFBLENBQUksQ0FBQSxDQUFBLEdBQUE7U0FBRztBQUFILENBQUo7O0FBMUNxQiIsInNvdXJjZXNDb250ZW50IjpbIiMgSW5zcGlyYXRpb246IGh0dHBzOi8vYmxvZy5vcGVucmVwbGF5LmNvbS9zb2xpZC12cy1yZWFjdC10aGUtZmFzdGVzdC12cy10aGUtbW9zdC1wb3B1bGFyLXVpLWxpYnJhcnkvXHJcbiMgTGF0aHVuZCBmw7ZyIMO2dmVyc8OkdHRuaW5nIGZyw6VuIFNvbGlkIEpTWCB0aWxsIG1pbiB2YXJpYW50OlxyXG4jIDxkaXYgYT0zIGI9ND5wZWxsZTwvZGl2PiA9PiBkaXYge2E6MywgYjo0fSxcIlBlbGxlXCJcclxuIyAncjRyID0+IEFwcCcgZXJzw6R0dGVyICdyZW5kZXIoKCkgPT4gPEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIikpOydcclxuIyAgIChMw6RnZyBpbiBpZD1hcHAgaSBib2R5IGkgaW5kZXguaHRtbClcclxuIyBzYWtuYXMgZW4gaHRtbC1rb2QsIHNrcml2IGluIGRlbiBpIHV0aWxzLmpzLCBlbmxpZ3QgJ2V4cG9ydCBidXR0b24gPSAoYS4uLikgPT4gaCBcImJ1dHRvblwiLCBhXCInXHJcbiMgZXJzw6R0dCBjcmVhdGVTaWduYWwgbWVkIHNpZ25hbFxyXG4jIFRlc3Rrw7ZyIGxvZ2lrZW4gZ2Vub20gYXR0IGzDpGdnYSBpbiBhbnJvcCB0aWxsIHI0ciA9PiBBcHAgaSBldmVudHMuIFxyXG4jICAgKFJlbnNhIG1lZCBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IFwiXCIgaW5uYW4gdmFyamUgYW5yb3AgdGlsbCByNHIgPT4gQXBwKVxyXG4jIEFudsOkbmQgY29mZmVlc2NyaXB0cyBsb29wYXIgb2NoIGlmLXNhdHNlci4gPEZvcj4gYmVow7Z2cyBlai5cclxuIyBBbnbDpG5kIFwiZG9cIiBkw6UgbG9vcGFyIG9jaCBldmVudHMgZsO2cmVrb21tZXIgc2FtdGlkaWd0LiBBbm5hcnMgYW52w6RuZHMgbG9vcC12YXJpYWJsZW5zIHNpc3RhIHbDpHJkZS5cclxuIyBSZW5zYSBib3J0IG9uw7ZkaWdhIHNrcsOkcHRlY2tlbiBzb20gc2VtaWtvbG9uLCBwYXJlbnRlc2VyLCBtw6VzdmluZ2FyLCA8Lz4sIG9jaCAoKVxyXG4jIFRpbGwgZXhlbXBlbCBrYW4gbWFuIHRhIGJvcnQgZGUgc2lzdGEgbmlvIHJhZGVybmEgaSBvcmlnaW5hbGtvZGVuLlxyXG4jIHJldHVybiBrYW4gb2Z0YXN0IHN0cnlrYXMuXHJcbiMgVHlwZXIga2FuIHRhcyBib3J0LlxyXG5cclxuaW1wb3J0IHtsb2cscjRyLHNpZ25hbH0gZnJvbSBcIi9qcy91dGlscy5qc1wiXHJcbmltcG9ydCB7aW5wdXQsYnV0dG9uLGRpdixiLHB9IGZyb20gXCIvanMvdXRpbHMuanNcIlxyXG5cclxuIyBBbGwgZGF0YSBtw6VzdGUgbGlnZ2EgZsO2cmUgQXBwIVxyXG5bdG9kb3MsIHNldFRvZG9zXSA9IHNpZ25hbCBbXHJcblx0e2lkOiBcIjFcIiwgdGV4dDogXCJBZGFtXCIsIGRvbmU6IGZhbHNlfSxcclxuXHR7aWQ6IFwiMlwiLCB0ZXh0OiBcIkJlcnRpbFwiLCBkb25lOiB0cnVlfSxcclxuXHR7aWQ6IFwiM1wiLCB0ZXh0OiBcIkNlc2FyXCIsIGRvbmU6IGZhbHNlfSxcclxuXHR7aWQ6IFwiNFwiLCB0ZXh0OiBcIkRhdmlkXCIsIGRvbmU6IHRydWV9LFxyXG5dXHJcblxyXG5BcHAgPSA9PlxyXG5cclxuXHRkb25lVG9kb3MgICA9ICA9PiB0b2RvcygpLmZpbHRlciAodG9kbykgPT4gIHRvZG8uZG9uZVxyXG5cdHVuZG9uZVRvZG9zID0gID0+IHRvZG9zKCkuZmlsdGVyICh0b2RvKSA9PiAhdG9kby5kb25lXHJcblxyXG5cdGNyZWF0ZVRvZG8gPSAodGV4dCkgPT4gc2V0VG9kb3MgPT4gWy4uLnRvZG9zKCksIHsgaWQ6IFwiI3tNYXRoLnJhbmRvbSgpfVwiLCB0ZXh0LCBkb25lOiBmYWxzZSB9XVxyXG5cdHJlbW92ZVRvZG8gPSAodG9kb0lkKSA9PiBzZXRUb2RvcyB0b2RvcygpLmZpbHRlciAodG9kbykgPT4gdG9kby5pZCAhPSB0b2RvSWRcclxuXHRzZXRUb2RvRG9uZSA9ICh0b2RvSWQsIGRvbmUpID0+IHNldFRvZG9zIHRvZG9zKCkubWFwICh0b2RvKSA9PiBpZiB0b2RvLmlkID09IHRvZG9JZCB0aGVuIHsgLi4udG9kbywgZG9uZSB9IGVsc2UgdG9kb1xyXG5cclxuXHRhZGRUb2RvID0gKHMpID0+IGlmIHMgdGhlbiBjcmVhdGVUb2RvIHNcclxuXHRvbmtleWRvd24gPSAoZXZlbnQpID0+IGlmIGV2ZW50LmtleSA9PSBcIkVudGVyXCIgdGhlbiBhZGRUb2RvIGV2ZW50LnRhcmdldC52YWx1ZVxyXG5cdGFkZENsaWNrID0gKGV2ZW50KSA9PiBhZGRUb2RvIGlucC52YWx1ZVxyXG5cdFxyXG5cdGRpdiB7fSxcclxuXHRcdGlucCA9IGlucHV0IHt2YWx1ZTogXCJcIiwgb25rZXlkb3dufVxyXG5cdFx0YnV0dG9uIHtvbkNsaWNrOiBhZGRDbGlja30sIFwiQWRkXCJcclxuXHRcdHAge30sXHJcblx0XHRcdGIge30sIFwiVG9kb1wiXHJcblx0XHRcdGZvciB0b2RvIGluIHVuZG9uZVRvZG9zKClcclxuXHRcdFx0XHRkbyAodG9kbykgPT4gZGl2IHt9LFxyXG5cdFx0XHRcdFx0YnV0dG9uIHtvbkNsaWNrOiA9PiBzZXRUb2RvRG9uZSB0b2RvLmlkLCB0cnVlfSwgXCJEb25lXCJcclxuXHRcdFx0XHRcdFwiIFwiICsgdG9kby50ZXh0XHJcblx0XHRwIHt9LFxyXG5cdFx0XHRiIHt9LCBcIkRvbmVcIlxyXG5cdFx0XHRmb3IgdG9kbyBpbiBkb25lVG9kb3MoKVxyXG5cdFx0XHRcdGRvICh0b2RvKSA9PiBkaXYge30sXHJcblx0XHRcdFx0XHRidXR0b24ge29uQ2xpY2s6ID0+IHJlbW92ZVRvZG8gdG9kby5pZH0sIFwiUmVtb3ZlXCJcclxuXHRcdFx0XHRcdGJ1dHRvbiB7b25DbGljazogPT4gc2V0VG9kb0RvbmUgdG9kby5pZCwgZmFsc2V9LCBcIlVuZG9cIlxyXG5cdFx0XHRcdFx0XCIgXCIgKyB0b2RvLnRleHRcclxucjRyID0+IEFwcFxyXG5cclxuIyBPcmlnaW5hbGtvZCAoODUgcmFkZXIpOlxyXG5cclxuIyBpbXBvcnQgeyBGb3IsIHJlbmRlciB9IGZyb20gXCJzb2xpZC1qcy93ZWJcIjtcclxuIyBpbXBvcnQgeyBjcmVhdGVNZW1vLCBjcmVhdGVTaWduYWwgfSBmcm9tIFwic29saWQtanNcIjtcclxuXHJcbiMgaW50ZXJmYWNlIFRPRE8ge1xyXG4jICAgICBpZDogc3RyaW5nO1xyXG4jICAgICB0ZXh0OiBzdHJpbmc7XHJcbiMgICAgIGRvbmU6IGJvb2xlYW47XHJcbiMgfVxyXG5cclxuIyBjb25zdCBBcHAgPSAoKSA9PiB7XHJcbiMgICAgIGNvbnN0IFt0b2Rvcywgc2V0VG9kb3NdID0gY3JlYXRlU2lnbmFsPFRPRE9bXT4oW10pO1xyXG4jICAgICBjb25zdCBbaW5wdXQsIHNldElucHV0XSA9IGNyZWF0ZVNpZ25hbChcIlwiKTtcclxuIyAgICAgY29uc3QgZG9uZVRvZG9zID0gY3JlYXRlTWVtbygoKSA9PiB0b2RvcygpLmZpbHRlcigodG9kbykgPT4gdG9kby5kb25lKSk7XHJcbiMgICAgIGNvbnN0IHVuZG9uZVRvZG9zID0gY3JlYXRlTWVtbygoKSA9PiB0b2RvcygpLmZpbHRlcigodG9kbykgPT4gIXRvZG8uZG9uZSkpO1xyXG4jICAgICBjb25zdCBjcmVhdGVUb2RvID0gKHRleHQ6IHN0cmluZykgPT4ge1xyXG4jICAgICBzZXRUb2RvcyhbLi4udG9kb3MoKSwgeyBpZDogYCR7TWF0aC5yYW5kb20oKX1gLCB0ZXh0LCBkb25lOiBmYWxzZSB9XSk7XHJcbiMgICAgIH07XHJcbiMgICAgIGNvbnN0IHJlbW92ZVRvZG8gPSAodG9kb0lkOiBzdHJpbmcpID0+IHtcclxuIyAgICAgc2V0VG9kb3ModG9kb3MoKS5maWx0ZXIoKHRvZG8pID0+IHRvZG8uaWQgIT09IHRvZG9JZCkpO1xyXG4jICAgICB9O1xyXG4jICAgICBjb25zdCBzZXRUb2RvRG9uZSA9ICh0b2RvSWQ6IHN0cmluZywgZG9uZTogYm9vbGVhbikgPT4ge1xyXG4jICAgICBzZXRUb2RvcyhcclxuIyAgICAgICAgIHRvZG9zKCkubWFwKCh0b2RvKSA9PiB7XHJcbiMgICAgICAgICBpZiAodG9kby5pZCA9PT0gdG9kb0lkKSB7XHJcbiMgICAgICAgICAgICAgcmV0dXJuIHsgLi4udG9kbywgZG9uZSB9O1xyXG4jICAgICAgICAgfVxyXG4jICAgICAgICAgcmV0dXJuIHRvZG87XHJcbiMgICAgICAgICB9KVxyXG4jICAgICApO1xyXG4jICAgICB9O1xyXG4jICAgICBjb25zdCBhZGRUb2RvID0gKCkgPT4ge1xyXG4jICAgICBjb25zdCBjdXJyZW50SW5wdXQgPSBpbnB1dCgpO1xyXG4jICAgICBpZiAoY3VycmVudElucHV0KSB7XHJcbiMgICAgICAgICBjcmVhdGVUb2RvKGN1cnJlbnRJbnB1dCk7XHJcbiMgICAgICAgICBzZXRJbnB1dChcIlwiKTtcclxuIyAgICAgfVxyXG4jICAgICB9O1xyXG4jICAgICBjb25zdCBvbklucHV0ID0gKGV2ZW50OiBJbnB1dEV2ZW50KSA9PiB7XHJcbiMgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuIyAgICAgc2V0SW5wdXQodGFyZ2V0LnZhbHVlKTtcclxuIyAgICAgfTtcclxuIyAgICAgY29uc3Qgb25LZXlkb3duID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiMgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xyXG4jICAgICAgICAgYWRkVG9kbygpO1xyXG4jICAgICB9XHJcbiMgICAgIH07XHJcblxyXG4jICAgICByZXR1cm4gKFxyXG4jICAgICA8ZGl2PlxyXG4jICAgICAgICAgPGlucHV0IHZhbHVlPXtpbnB1dCgpfSBvbklucHV0PXtvbklucHV0fSBvbktleURvd249e29uS2V5ZG93bn0gLz5cclxuIyAgICAgICAgIDxidXR0b24gb25DbGljaz17YWRkVG9kb30+QWRkPC9idXR0b24+XHJcbiMgICAgICAgICA8ZGl2PlxyXG4jICAgICAgICAgPGI+VG9kbzo8L2I+XHJcbiMgICAgICAgICA8Rm9yIGVhY2g9e3VuZG9uZVRvZG9zKCl9PlxyXG4jICAgICAgICAgICAgIHsodG9kbykgPT4ge1xyXG4jICAgICAgICAgICAgIHJldHVybiAoXHJcbiMgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiMgICAgICAgICAgICAgICAgIHt0b2RvLnRleHR9XHJcbiMgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0VG9kb0RvbmUodG9kby5pZCwgdHJ1ZSl9PkRvbmU8L2J1dHRvbj5cclxuIyAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiMgICAgICAgICAgICAgKTtcclxuIyAgICAgICAgICAgICB9fVxyXG4jICAgICAgICAgPC9Gb3I+XHJcbiMgICAgICAgICA8L2Rpdj5cclxuIyAgICAgICAgIDxkaXY+XHJcbiMgICAgICAgICA8Yj5Eb25lOjwvYj5cclxuIyAgICAgICAgIDxGb3IgZWFjaD17ZG9uZVRvZG9zKCl9PlxyXG4jICAgICAgICAgICAgIHsodG9kbykgPT4ge1xyXG4jICAgICAgICAgICAgIHJldHVybiAoXHJcbiMgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiMgICAgICAgICAgICAgICAgIHt0b2RvLnRleHR9XHJcbiMgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gcmVtb3ZlVG9kbyh0b2RvLmlkKX0+UmVtb3ZlPC9idXR0b24+XHJcbiMgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0VG9kb0RvbmUodG9kby5pZCwgZmFsc2UpfT5cclxuIyAgICAgICAgICAgICAgICAgICAgIFVuZG9cclxuIyAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiMgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4jICAgICAgICAgICAgICk7XHJcbiMgICAgICAgICAgICAgfX1cclxuIyAgICAgICAgIDwvRm9yPlxyXG4jICAgICAgICAgPC9kaXY+XHJcbiMgICAgIDwvZGl2PlxyXG4jICAgICApO1xyXG4jIH07XHJcblxyXG4jIHJlbmRlcigoKSA9PiA8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKSk7Il19
//# sourceURL=c:\github\2023-012-solidjs-coffee-hyperscript-lab\coffee\sketch4.coffee