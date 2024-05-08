import heimwoodlogo from './heimwoodlogo.avif';

const Footer = () => {
  return (
    <footer className="bg-emerald-600 text-white p-4 sm:p-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between text-center sm:text-left">
        {/* First Column */}
        <div className="flex flex-col mb-6 sm:mb-0">
          <span className="font-bold text-lg mb-2">Heimwood</span>
          <span>CVR: 42513881</span>
          <span>Strandvejen 18</span>
          <span>2100 København Ø</span>
          <span>Telefon: 61 31 31 00</span>
          <span>E-mail: heimwood@heimwood.dk</span>
        </div>
        
        {/* Second Column - Large Logo or Branding */}
        <div className="flex justify-center items-center mb-6 sm:mb-0">
          <img src={heimwoodlogo} className='w-24 sm:w-[10rem]' alt="Heimwood logo" />       
        </div>

        {/* Third Column */}
        <div className="flex flex-col items-center sm:items-end mb-6 sm:mb-0">
          <div className="mb-4">
            <span>Følg os på:</span>
            {/* Placeholder icons for social media */}
            <span className="inline-block ml-2"><i className="fab fa-facebook-f"></i></span>
            <span className="inline-block ml-2"><i className="fab fa-instagram"></i></span>
            <span className="inline-block ml-2"><i className="fab fa-pinterest-p"></i></span>
          </div>
          <span className="mb-1 cursor-pointer hover:text-blue-400">Privatlivspolitik</span>
          <span className="mb-1 cursor-pointer hover:text-blue-400">Book et møde</span>
          <span className="mb-1 cursor-pointer hover:text-blue-400">Alle køkkener</span>
          <span className="cursor-pointer hover:text-blue-400">Fingertappet køkken</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
