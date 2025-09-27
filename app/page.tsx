export default function Home() {
  return (
    <>
      <div
        style={{
          fontFamily: "var(--font-rampart-one)",
          fontSize: "283px",
          textAlign: "center",
          marginTop: "calc(50vh)",
          marginLeft: "50%",
          transform: "translate(-50%, -50%)",
          position: "fixed",
        }}
      >
        AIFSM 2025
      </div>

      <ul style={{ position: "fixed", top: "10px", left: "10px", padding: 0, margin: 0 }}>
        <li>
          <a className="hover:underline" href="/about">
            About
          </a>
        </li>
        <li>
          <a className="hover:underline" href="/committee">
            Committee
          </a>
        </li>
        <li>
          <a className="hover:underline" href="/events">
            Events
          </a>
        </li>
        <li>
          <a className="hover:underline" href="/gallery">
            Gallery
          </a>
        </li>
        <li>
          <a className="hover:underline" href="/contact">
            Contact
          </a>
        </li>
        <li>
          <a className="hover:underline" href="/register">
            Register
          </a>
        </li>
        <li>
          <a className="hover:underline" href="/login">
            Login
          </a>
        </li>
        <li>
          <a className="hover:underline" href="/results">
            Results
          </a>
        </li>
      </ul>
    </>
  );
}
