import React, { useReducer, useCallback } from "react";
import { Link } from "react-router-dom";

const initialState = { count: 0, step: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

const CounterDisplay = React.memo(function CounterDisplay({
  count,
  onIncrement,
  onDecrement,
}) {
  console.log("CounterDisplay render");

  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-2xl  ">
      <div className="text-2xl font-bold">Count: {count}</div>

      <div className="flex gap-3">
        <button
          className="px-6 py-2 rounded-xl bg-blue-100"
          onClick={onIncrement}
        >
          +
        </button>
        <button
          className="px-6 py-2 rounded-xl bg-blue-100"
          onClick={onDecrement}
        >
          -
        </button>
      </div>
    </div>
  );
});

export default function Callback() {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("Parent Component render");

  const increment = useCallback(() => {
    dispatch({ type: "increment" });
  }, []);

  const decrement = useCallback(() => {
    dispatch({ type: "decrement" });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  const changeStep = useCallback((e) => {
    dispatch({ type: "setStep", payload: Number(e.target.value) || 0 });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 font-sans">
      <Link className="p-2 rounded-xl bg-gray-100" to="/">
        Back to Home
      </Link>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl  ">
        <label className="flex items-center gap-3 text-lg">
          Step
          <input
            type="number"
            value={state.step}
            onChange={changeStep}
            className="w-20 px-2 py-1 rounded-lg text-center"
          />
        </label>

        <CounterDisplay
          count={state.count}
          onIncrement={increment}
          onDecrement={decrement}
        />

        <div className="flex gap-3">
          <button className="px-5 py-2 rounded-xl bg-gray-100" onClick={reset}>
            Reset
          </button>

          <button
            className="px-5 py-2 rounded-xl bg-green-100"
            onClick={() => {
              dispatch({ type: "setStep", payload: state.step + 1 });
            }}
          >
            Increase Step
          </button>
        </div>
      </div>
    </div>
  );
}
