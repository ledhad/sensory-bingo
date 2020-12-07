interface Props {
  text: string;
  index: number;
  winCell: boolean;
  onClick: (id: number) => void;
  activeCell: boolean;
}

export const Cell = ({
  text,
  index,
  onClick,
  winCell = false,
  activeCell = false,
}: Props) => {
  return (
    <section
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: 5,
        backgroundColor: 'white',
        color: activeCell ? 'rgba(0,0,0,0.3)' : 'black',
        fontSize: 'calc(min(100vw / 35, 20px))',
      }}
      onClick={() => onClick(index)}
    >
      <span
        style={{
          position: 'absolute',
          width: '100%',
          display: 'flex',
          top: 0,
          justifyContent: 'flex-end',
          paddingRight: 8,
          marginTop: 5,
          fontSize: 'calc(min(100vw / 45, 16px))',
        }}
      >
        {index}
      </span>
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: winCell ? '#E1FEDD' : 'rgba(0,0,0, 0.03)',
          borderRadius: 5,
          fontFamily: 'Roboto',
          textAlign: 'center',
          textDecoration: activeCell ? 'line-through' : 'none',
        }}
      >
        {text}
      </div>
    </section>
  );
};
