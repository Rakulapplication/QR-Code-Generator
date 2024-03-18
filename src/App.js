import {useState} from 'react';
import './App.css';

function App() {

  const [img,setImg] = useState("");
  const [loading,setLoading] = useState(false);
  const [qrData,setQrData] = useState("Rakul");
  const [qrSize,setQrSize] = useState("150");

  async function generateQR(){
    setLoading(true);
    try{
     const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
     setImg(url);
    }catch(error){
      console.error("Error generating QR Code", error);
    }finally{
      setLoading(false);
    }
  }
  function downloadQR(){
    fetch(img)
    .then((Response)=>Response.blob())
    .then((blob)=>{const link=document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download="QRCode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    })
    .catch((error)=>{
      console.error("Error downloading QR Code", error);
    });
  }

  return (
    <div className='app-container'>
      <h1>QR CODE GENERATE</h1>
      {loading && <p>Please wait ...</p>}
      {img && <img src={img} className='qr-code-image' />}
      <div>
        <label htmlFor='dataInput' className='input-label'>
          Data for QR Code:
        </label>
        <input type='text' id="dataInput" placeholder='Enter data for QR Code' onChange={(e)=>setQrData(e.target.value)}>
        </input>
        <label htmlFor='sizeInput' className='input-label'>
          Image Size (e.g., 150):
        </label>
        <input type='text' id="dataInput" placeholder='Enter data for QR Code' onChange={(e)=>setQrSize(e.target.value)}>
        </input>
        <button className='generate-button' onClick={generateQR} disabled={loading}>Generate QR Code</button>
        <button className='download-button' onClick={downloadQR}>Download QR Code</button>
      </div>
      <p className='footer'>Designed by <a href="">Rakul</a>
      </p>
    </div>
  );
}

export default App;
