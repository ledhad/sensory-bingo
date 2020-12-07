const partyEmoji = '🥳';

const WinningEmoji = () => {
  return (
    <>
      <span
        style={{
          position: 'absolute',
          top: 'min(25vw, 300px)',
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          fontSize: 150,
          zIndex: 21,
        }}
      >
        {partyEmoji}
      </span>
    </>
  );
};

export default WinningEmoji;
