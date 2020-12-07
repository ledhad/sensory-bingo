// Button
interface GameJSXProps {
  onClick: () => void;
  children: any;
}

let Button = ({ onClick, children }: GameJSXProps) => {
  return (
    <>
      <section>
        <button onClick={onClick}>
          <div className="left"></div>
          {children}
          <div className="right"></div>
        </button>
      </section>
    </>
  );
};

export default Button;
