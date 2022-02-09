type Props = {
  asterix: string[];
};

function AsterixDisplay({ asterix }: Props) {
  return (
    <> 
      <div className="flex pb-5 pt-5">
        <div
          style={{
            display:"flex",
            justifyContent: 'center',
            alignItems: 'center',
            height: '56px',
            borderBottom: '4px solid black',
            width: '56px',
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
