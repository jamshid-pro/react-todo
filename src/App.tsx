import { ChangeEvent, useState } from "react";
import styles from "./app.module.css";

interface IData {
  id:number,
  title: string,
}

const App = (): JSX.Element => {
  const data: IData[] = [{ title: "Some todo...", id: 1 }];
  const [title, setTitle] = useState<string>();
  const [todo, setTodo] = useState<IData[]>(data);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setTitle(e.target.value);
  }

  const handleSubmit = (): void => {
    if(!title?.length) return;
    const newTodo = {
      id: Date.now(),
      title
    }
    setTodo(prev => [...prev, newTodo]);
    setTitle('');
  }

  const removeItem = (id: number): void => {
    const newTodo = todo.filter((val) => val.id !== id);
    setTodo(newTodo);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{ padding: "20px" }}>
          <h2 className={styles.title}>TODO List</h2>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              value={title || ''}
              onChange={changeHandler}
            />
            <button onClick={handleSubmit} className={styles.button}>Add</button>
          </div>
        </div>
      </div>

      <div className={styles.items}>
        {todo.map((val) => (
          <div className={styles.item} key={val.id}>
            <h2 className={styles.item__title}>{val.title}</h2>
            <button
              className={styles.delBtn}
              onClick={() => removeItem(val.id)}
            >
              DEL
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
