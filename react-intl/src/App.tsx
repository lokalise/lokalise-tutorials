// src/App.tsx
import { useState } from "react";
import { FormattedMessage } from "react-intl";

function App() {
  const [count, setCount] = useState(0);
  const [lastLogin] = useState(() => new Date());
  const [cartTotal] = useState(1234.5);
  const [user] = useState({
    name: "Ann",
    gender: "female", // change to 'male' or 'other' and watch the text change
  });

  return (
    <main
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Simple heading */}
      <h1>
        <FormattedMessage id="app.title" />
      </h1>

      {/* Simple paragraph */}
      <p>
        <FormattedMessage id="app.description" />
      </p>

      <section style={{ marginTop: "2rem" }}>
        <p>
          <FormattedMessage id="app.lastLogin" values={{ ts: lastLogin }} />
        </p>
      </section>

      {/* Pluralized notifications */}
      <section style={{ marginTop: "2rem" }}>
        <p>
          <FormattedMessage id="app.notifications" values={{ count }} />
        </p>

        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          <button type="button" onClick={() => setCount(0)}>
            =0
          </button>
          <button type="button" onClick={() => setCount(1)}>
            =1
          </button>
          <button type="button" onClick={() => setCount((prev) => prev + 1)}>
            +1
          </button>
        </div>
      </section>

      {/* Currency / cart total */}
      <section style={{ marginTop: "2rem" }}>
        <p>
          <FormattedMessage id="app.cartTotal" values={{ total: cartTotal }} />
        </p>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <p>
          <FormattedMessage
            id="app.userAction"
            values={{ name: user.name, gender: user.gender }}
          />
        </p>
      </section>
    </main>
  );
}

export default App;
