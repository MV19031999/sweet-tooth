import './PaymentStimulator.css'

function PaymentStimulator({handlePaymentStatus}) {
return (
<div className='popup'>

<div className='stimulator'>

<h1> Welcome to Payment Test Stimulation </h1>

<p>Please choose one of the following options to test for payment success or failure</p>

<div className='button-display'>
<button 
    className='success' 
    onClick={() => {handlePaymentStatus(true)}}>Payment Successful</button>

<button 
    className='fail'
    onClick={() => {handlePaymentStatus(false)}}>Payment Failed</button>
</div>

</div>

</div>
)}

export default PaymentStimulator
