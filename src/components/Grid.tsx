interface Props {
  children: any;
}

export const Grid = ({ children }: Props) => {
  return (
    <div
      style={{
        margin: 10,
        padding: 1,
        display: 'grid',
        gridTemplate: 'repeat(5, 1fr) / repeat(5, 1fr)',
        gap: '1px 1px',
        minHeight: 'min(calc(100vw - 20px), 320px)',
        maxHeight: 700,
        maxWidth: 700,
        minWidth: 320,
        backgroundColor: 'black',
      }}
    >
      {children}
    </div>
  );
};
