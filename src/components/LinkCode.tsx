import { ReactComponent as LinkedinLogo } from '../assets/linkedin.svg';

const LinkCode = () => {
  return (
    <h3
      style={{
        display: 'flex',
        alignItems: 'center',
        width: 250,
        justifyContent: 'space-evenly',
      }}
    >
      Link to project files &nbsp; =&gt; &nbsp;
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/ledhad/sensory-bingo"
      >
        <LinkedinLogo />
      </a>
    </h3>
  );
};

export default LinkCode;
