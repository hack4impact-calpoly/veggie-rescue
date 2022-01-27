type Props = {
  asterix: string[];
};

function AsterixDisplay({ asterix }: Props) {
  return (
    <>
      <div style={{ display: 'flex', paddingBottom: '10px', paddingTop: '10px', }}>
        <div
          style={{
            display:"flex",
            justifyContent: 'center',
            alignItems: 'center',
            height: '56px',
            borderBottom: '4px solid black',
            width: '48px',
            fontWeight: '900',
            fontSize: '48px',
            marginRight: '15px',
        
          }}
        >
          {asterix[0]}
        </div>
        <div
          style={{
            display:"flex",
            justifyContent: 'center',
            alignItems: 'center',
            height: '56px',
            borderBottom: '4px solid black',
            width: '48px',
            fontWeight: '900',
            fontSize: '48px',
            marginRight: '15px'
          }}
        >
          {asterix[1]}
        </div>
        <div
          style={{
            display:"flex",
            justifyContent: 'center',
            alignItems: 'center',
            height: '56px',
            borderBottom: '4px solid black',
            width: '48px',
            fontWeight: '900',
            fontSize: '48px',
            marginRight: '15px'
          }}
        >
          {asterix[2]}
        </div>
        <div
          style={{
            display:"flex",
            justifyContent: 'center',
            alignItems: 'center',
            height: '56px',
            borderBottom: '4px solid black',
            width: '48px',
            fontWeight: '900',
            fontSize: '48px',
            marginRight: '15px',
        
          }}
        >
          {asterix[3]}
        </div>
      </div>
    </>
  );
}

export default AsterixDisplay;
