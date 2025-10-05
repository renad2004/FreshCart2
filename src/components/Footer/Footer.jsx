import amazon from '../../assets/images/amazon-pay.png'
import mastercard from '../../assets/images/mastercard.webp'
import americanExpress from '../../assets/images/American-Express-Color.png'
import paypal from '../../assets/images/paypal.png'
import getAppleStore from '../../assets/images/get-apple-store.png'
import getGooglePlay from '../../assets/images/get-google-play.png'

export default function Footer() {
  return (
    <footer className='w-full    bg-slate-200 py-8  '>
      <div className="container  mx-auto px-4">

        {/* App Section */}
        <div className="mb-6">
          <h3 className='text-2xl font-semibold'>Get The Fresh Cart App</h3>
          <p className='text-slate-500 mt-2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam.
          </p>
        </div>

        {/* Email Section */}
        <div className='flex gap-3 items-center mb-6'>
          <input 
            className='border border-slate-300 rounded-md px-4 py-2 flex-grow' 
            type='text' 
            placeholder='Enter your email...'
          />
          <button className='bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition'>
            Share app link
          </button>
        </div>

        {/* Bottom Section */}
        <div className='flex flex-col md:flex-row justify-between gap-8'>

          {/* Payment Partners */}
          <div>
            <h3 className='text-lg font-medium mb-3'>Payment Partners</h3>
            <div className="flex gap-4 items-center">
              <img src={amazon} alt="Amazon Pay" className='h-8'/>
              <img src={mastercard} alt="Mastercard" className='h-8'/>
              <img src={americanExpress} alt="American Express" className='h-8'/>
              <img src={paypal} alt="PayPal" className='h-8'/>
            </div>
          </div>

          {/* App Store Buttons */}
          <div>
            <h3 className='text-lg font-medium mb-3'>Get Our App</h3>
            <div className="flex gap-4 items-center">
              <img src={getAppleStore} alt="Apple Store" className='h-10'/>
              <img src={getGooglePlay} alt="Google Play" className='h-10'/>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
