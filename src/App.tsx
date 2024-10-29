import React, {useState, useEffect, useRef} from 'react';

import { ITodo } from './components/types/data';

import { TodoList } from './components/todoList';
import { log } from 'console';

const App: React.FC = () => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<ITodo[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  // const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
  //   setValue(e.target.value)
  // }; Это вместо варианта с инлайново со стрелочной функцией, если брать такой пример.

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if(e.key === 'Enter') {
      addTodo();    
    }
  }

  const addTodo = () => {
    if (value) {
      setTodos([...todos, {
        id: Date.now(),
        title: value,
        complete: false
      }])
      setValue('');
    }
  }

  //inputRef и этот useEffect тут применён, для того, чтобы при перезагрузки страницы поле инпут было сразу в фокусе
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [])

  return(
    <div>
      <div>
        <input value={value} onChange={e => setValue(e.target.value)} onKeyDown={handleKeyDown} ref={inputRef} />
        <button onClick={addTodo}>Add</button>
      </div>

      <TodoList items={todos} />
    </div>
  )
}

export default App;
