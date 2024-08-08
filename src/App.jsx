import { memo, useCallback, useMemo, useState, useTransition } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function ListItem({ text, color }) {
  return <li style={{ color }}>{text}</li>;
}

const List = memo(({ listConfig }) => {
  const items = [];
  for (let i = 1; i <= listConfig.numOfItems; i++) {
    items.push(<ListItem text={i} color={listConfig.color} />);
  }
  return <ul>{items}</ul>;
});

function App() {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  const listConfig = useMemo(() => {
    return { numOfItems: value, color: "red" };
  }, [value]);

  const handleNumberChange = useCallback((count) => {
    setCount(count + value);
  }, []);
  return (
    <>
      {isPending ? "Loading..." : count}
      <br />
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          startTransition(() => {
            for (let i = 0; i < 20000; i++) {
              console.log(i);
            }
            setCount(count + 1);
          });
        }}
      />

      <List listConfig={listConfig} onNumberChange={handleNumberChange} />
    </>
  );
}

export default App;
