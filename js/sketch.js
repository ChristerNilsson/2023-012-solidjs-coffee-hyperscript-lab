// Generated by CoffeeScript 2.5.1
var setTitle, setTodos, title, todos;

import {
  batch
} from "https://cdn.skypack.dev/solid-js@1.2.6";

import {
  r4r,
  signal,
  div,
  h3,
  input,
  button,
  log
} from "/js/utils.js";

[title, setTitle] = signal("");

[todos, setTodos] = signal([
  {
    title: 'städa',
    done: false
  },
  {
    title: 'raka',
    done: true
  }
]);

r4r(() => {
  var addTodo, i, todo;
  addTodo = (e) => {
    log("addTodo");
    // e.preventDefault()
    return batch(() => {
      log("batch");
      //setTodos todos.length, {title: title(), done: false}
      // setTodos todos().concat [{title: title(), done: false}]
      setTodos(() => {
        
        // temp = todos()
        // temp.push {title: title(), done: false}
        // temp
        return todos().concat([
          {
            title: 'städax',
            done: false
          },
          {
            title: 'rakax',
            done: true
          }
        ]);
      });
      log(todos());
      //setTodos [todos()..., {title: 'sven', done: false}]
      return setTitle("");
    });
  };
  return div({}, h3({}, "Simple Todos Example"), input({
    placeholder: "enter todo and click +",
    required: true,
    value: () => {
      return title();
    },
    onInput: (e) => {
      return setTitle(e.currentTarget.value);
    }
  }), button({
    onClick: addTodo
  }, "+"), (function() {
    var j, len, ref, results;
    ref = todos();
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      todo = ref[i];
      // do (i) =>
      results.push(div({}, input({
        type: "checkbox",
        checked: () => {
          return todo.done;
        }
      // onInput:(e) => setTodos i, "done", e.currentTarget.checked
      }), input({
        type: "text",
        value: () => {
          return todo.title;
        }
      })));
    }
    return results;
  }).call(this));
});

// button {onClick:() => setTodos removeIndex todos, i}, "x"

// render App, document.getElementById "app"
// onInput:(e) => setTodos i, "title", e.currentTarget.value

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjb2ZmZWVcXHNrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxLQUFBLEVBQUE7O0FBQUEsT0FBQTtFQUFTLEtBQVQ7Q0FBQSxNQUFBOztBQUNBLE9BQUE7RUFBUyxHQUFUO0VBQWMsTUFBZDtFQUFzQixHQUF0QjtFQUEyQixFQUEzQjtFQUErQixLQUEvQjtFQUFzQyxNQUF0QztFQUE2QyxHQUE3QztDQUFBLE1BQUE7O0FBRUEsQ0FBQyxLQUFELEVBQVEsUUFBUixDQUFBLEdBQW9CLE1BQUEsQ0FBTyxFQUFQOztBQUNwQixDQUFDLEtBQUQsRUFBUSxRQUFSLENBQUEsR0FBb0IsTUFBQSxDQUFPO0VBQUM7SUFBQyxLQUFBLEVBQU8sT0FBUjtJQUFpQixJQUFBLEVBQU07RUFBdkIsQ0FBRDtFQUErQjtJQUFDLEtBQUEsRUFBTyxNQUFSO0lBQWdCLElBQUEsRUFBTTtFQUF0QixDQUEvQjtDQUFQOztBQUVwQixHQUFBLENBQUksQ0FBQSxDQUFBLEdBQUE7QUFFSixNQUFBLE9BQUEsRUFBQSxDQUFBLEVBQUE7RUFBQyxPQUFBLEdBQVUsQ0FBQyxDQUFELENBQUEsR0FBQTtJQUNULEdBQUEsQ0FBSSxTQUFKLEVBQUY7O1dBRUUsS0FBQSxDQUFNLENBQUEsQ0FBQSxHQUFBO01BQ0wsR0FBQSxDQUFJLE9BQUosRUFBSDs7O01BR0csUUFBQSxDQUFTLENBQUEsQ0FBQSxHQUFBLEVBQUE7Ozs7O2VBSVIsS0FBQSxDQUFBLENBQU8sQ0FBQyxNQUFSLENBQWU7VUFBQztZQUFDLEtBQUEsRUFBTyxRQUFSO1lBQWtCLElBQUEsRUFBTTtVQUF4QixDQUFEO1VBQWdDO1lBQUMsS0FBQSxFQUFPLE9BQVI7WUFBaUIsSUFBQSxFQUFNO1VBQXZCLENBQWhDO1NBQWY7TUFKUSxDQUFUO01BS0EsR0FBQSxDQUFJLEtBQUEsQ0FBQSxDQUFKLEVBUkg7O2FBVUcsUUFBQSxDQUFTLEVBQVQ7SUFYSyxDQUFOO0VBSFM7U0FnQlYsR0FBQSxDQUFJLENBQUEsQ0FBSixFQUNDLEVBQUEsQ0FBRyxDQUFBLENBQUgsRUFBTyxzQkFBUCxDQURELEVBRUMsS0FBQSxDQUFNO0lBQ0wsV0FBQSxFQUFjLHdCQURUO0lBRUwsUUFBQSxFQUFXLElBRk47SUFHTCxLQUFBLEVBQVEsQ0FBQSxDQUFBLEdBQUE7YUFBRyxLQUFBLENBQUE7SUFBSCxDQUhIO0lBSUwsT0FBQSxFQUFVLENBQUMsQ0FBRCxDQUFBLEdBQUE7YUFBTyxRQUFBLENBQVMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUF6QjtJQUFQO0VBSkwsQ0FBTixDQUZELEVBUUMsTUFBQSxDQUFPO0lBQUMsT0FBQSxFQUFRO0VBQVQsQ0FBUCxFQUF5QixHQUF6QixDQVJEOztBQVVDO0FBQUE7SUFBQSxLQUFBLDZDQUFBO29CQUFBOzttQkFFQyxHQUFBLENBQUksQ0FBQSxDQUFKLEVBQ0MsS0FBQSxDQUFNO1FBQ0wsSUFBQSxFQUFLLFVBREE7UUFFTCxPQUFBLEVBQVMsQ0FBQSxDQUFBLEdBQUE7aUJBQUcsSUFBSSxDQUFDO1FBQVIsQ0FGSjs7TUFBQSxDQUFOLENBREQsRUFNQyxLQUFBLENBQU07UUFDTCxJQUFBLEVBQUssTUFEQTtRQUVMLEtBQUEsRUFBTyxDQUFBLENBQUEsR0FBQTtpQkFBRyxJQUFJLENBQUM7UUFBUjtNQUZGLENBQU4sQ0FORDtJQUZELENBQUE7O2VBVkQ7QUFsQkcsQ0FBSixFQU5BOzs7OztBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYmF0Y2ggfSBmcm9tIFwiaHR0cHM6Ly9jZG4uc2t5cGFjay5kZXYvc29saWQtanNAMS4yLjZcIlxyXG5pbXBvcnQgeyByNHIsIHNpZ25hbCwgZGl2LCBoMywgaW5wdXQsIGJ1dHRvbixsb2cgfSBmcm9tIFwiL2pzL3V0aWxzLmpzXCJcclxuXHJcblt0aXRsZSwgc2V0VGl0bGVdID0gc2lnbmFsIFwiXCJcclxuW3RvZG9zLCBzZXRUb2Rvc10gPSBzaWduYWwgW3t0aXRsZTogJ3N0w6RkYScsIGRvbmU6IGZhbHNlfSx7dGl0bGU6ICdyYWthJywgZG9uZTogdHJ1ZX1dXHJcblxyXG5yNHIgPT5cclxuXHJcblx0YWRkVG9kbyA9IChlKSA9PlxyXG5cdFx0bG9nIFwiYWRkVG9kb1wiXHJcblx0XHQjIGUucHJldmVudERlZmF1bHQoKVxyXG5cdFx0YmF0Y2ggPT5cclxuXHRcdFx0bG9nIFwiYmF0Y2hcIlxyXG5cdFx0XHQjc2V0VG9kb3MgdG9kb3MubGVuZ3RoLCB7dGl0bGU6IHRpdGxlKCksIGRvbmU6IGZhbHNlfVxyXG5cdFx0XHQjIHNldFRvZG9zIHRvZG9zKCkuY29uY2F0IFt7dGl0bGU6IHRpdGxlKCksIGRvbmU6IGZhbHNlfV1cclxuXHRcdFx0c2V0VG9kb3MgPT4gXHJcblx0XHRcdFx0IyB0ZW1wID0gdG9kb3MoKVxyXG5cdFx0XHRcdCMgdGVtcC5wdXNoIHt0aXRsZTogdGl0bGUoKSwgZG9uZTogZmFsc2V9XHJcblx0XHRcdFx0IyB0ZW1wXHJcblx0XHRcdFx0dG9kb3MoKS5jb25jYXQgW3t0aXRsZTogJ3N0w6RkYXgnLCBkb25lOiBmYWxzZX0se3RpdGxlOiAncmFrYXgnLCBkb25lOiB0cnVlfV1cclxuXHRcdFx0bG9nIHRvZG9zKClcclxuXHRcdFx0I3NldFRvZG9zIFt0b2RvcygpLi4uLCB7dGl0bGU6ICdzdmVuJywgZG9uZTogZmFsc2V9XVxyXG5cdFx0XHRzZXRUaXRsZSBcIlwiXHJcblxyXG5cdGRpdiB7fSxcclxuXHRcdGgzIHt9LCBcIlNpbXBsZSBUb2RvcyBFeGFtcGxlXCJcclxuXHRcdGlucHV0IHtcclxuXHRcdFx0cGxhY2Vob2xkZXIgOiBcImVudGVyIHRvZG8gYW5kIGNsaWNrICtcIixcclxuXHRcdFx0cmVxdWlyZWQgOiB0cnVlLFxyXG5cdFx0XHR2YWx1ZSA6ID0+IHRpdGxlKCksXHJcblx0XHRcdG9uSW5wdXQgOiAoZSkgPT4gc2V0VGl0bGUgZS5jdXJyZW50VGFyZ2V0LnZhbHVlXHJcblx0XHR9XHJcblx0XHRidXR0b24ge29uQ2xpY2s6YWRkVG9kb30sXCIrXCJcclxuXHJcblx0XHRmb3IgdG9kbyxpIGluIHRvZG9zKClcclxuXHRcdFx0IyBkbyAoaSkgPT5cclxuXHRcdFx0ZGl2IHt9LFxyXG5cdFx0XHRcdGlucHV0IHtcclxuXHRcdFx0XHRcdHR5cGU6XCJjaGVja2JveFwiLFxyXG5cdFx0XHRcdFx0Y2hlY2tlZDogPT4gdG9kby5kb25lXHJcblx0XHRcdFx0XHQjIG9uSW5wdXQ6KGUpID0+IHNldFRvZG9zIGksIFwiZG9uZVwiLCBlLmN1cnJlbnRUYXJnZXQuY2hlY2tlZFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpbnB1dCB7XHJcblx0XHRcdFx0XHR0eXBlOlwidGV4dFwiLFxyXG5cdFx0XHRcdFx0dmFsdWU6ID0+IHRvZG8udGl0bGVcclxuXHRcdFx0XHRcdCMgb25JbnB1dDooZSkgPT4gc2V0VG9kb3MgaSwgXCJ0aXRsZVwiLCBlLmN1cnJlbnRUYXJnZXQudmFsdWVcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0IyBidXR0b24ge29uQ2xpY2s6KCkgPT4gc2V0VG9kb3MgcmVtb3ZlSW5kZXggdG9kb3MsIGl9LCBcInhcIlxyXG5cclxuIyByZW5kZXIgQXBwLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBcImFwcFwiIl19
//# sourceURL=c:\github\2023-012-solidjs-coffee-hyperscript-lab\coffee\sketch.coffee