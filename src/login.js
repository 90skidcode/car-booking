import bg from './images/login.png';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { ToastContainer, toast } from 'react-toast'
import PostApi from './Services/PostApi';
function Login() {
    const [status, setstatus] = useState(false);
    const [flag, setflag] = useState(true);
    const [otp, setOtp] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    let navigate = useNavigate();

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyBgAjel4JVlKeY15dy9y0KtWikXSTYLk7M",
        authDomain: "v2app-39e40.firebaseapp.com",
        projectId: "v2app-39e40",
        storageBucket: "v2app-39e40.appspot.com",
        messagingSenderId: "360173883304",
        appId: "1:360173883304:web:ec49f5e260c5a167f5579d",
        measurementId: "G-QSV17Q3H6G"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    auth.languageCode = 'en';
    const recaptchaVerifier = () => {
        //window.recaptchaVerifier.recaptcha.reset();
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => { }
        }, auth);
    }
    let loader = false;
    const requestOtp = async () => {
        loader = true;
        if (flag) {
            recaptchaVerifier();
            setflag(false);
        }

        (phoneNumber.length === 10) ?
            // reCAPTCHA solved, allow signInWithPhoneNumber.       
            signInWithPhoneNumber(auth, '+91' + phoneNumber, window.recaptchaVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    window.confirmationResult = confirmationResult;
                    setstatus(true);
                    loader = false;
                }).catch((error) => {
                    loader = false;
                    toast.error(error.message ? error.message : 'Something went wrong. Please try again!!');
                    // Error; SMS not sent
                    // ...
                })
            : toast.error("Please enter a valid phone number");
    }

    const verifyOTP = () => {
        otp.length === 6 ?
            window.confirmationResult.confirm(otp).then((result) => {               
                sessionStorage.setItem('login', true);
                let tableData = { "list_key": "Mastertable", "label": "auto_customer", "select": "*", "condition": { "status": 1, "auto_customer_phone": phoneNumber } }
                PostApi('services.php', tableData).then((e) => {                  
                    sessionStorage.setItem('user', JSON.stringify(e.responcePostData.data.result));
                    !e.responcePostData.data.result.length ?
                        PostApi('services.php', { "list_key": "AddMaster", "label": "auto_customer", "tablefields": { "auto_customer_phone": phoneNumber } }).then((e) => {
                            PostApi('services.php', tableData).then((e) => {
                                sessionStorage.setItem('user', JSON.stringify(e.responcePostData.data.result));
                                navigate('/cars');
                            })
                        }) : navigate('/cars');
                })

            }).catch((error) => {
                toast.error(error.message ? error.message : 'Something went wrong. Please try again!!');
            })
            : toast.error("Please enter a valid OTP");
    }

    return <div className="h-screen overflow-hidden bg-white rounded-lg shadow-lg ">
        <ToastContainer position='top-right' />
        <img className="object-cover object-center" src={bg} alt="avatar" />
        <div className="fixed bottom-0  w-full">
            <div className="flex items-center px-2 py-3 ">
                <h1 className="mx-3 text-xl font-semibold text-black">Enter details to login / sign-up</h1>
            </div>
            {!status ?
                <div className="items-center text-black dark:text-gray-200 px-5">
                    <h1 className="text-md text-black">Mobile Number</h1>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3  border border-r-0 text-black border-gray-300 bg-gray-50 text-gray-500 text-sm"> +91 </span>
                        <input type="number" name='mobilenumber' onChange={(e) => setPhoneNumber(e.target.value)} onWheel={(e) => e.target.blur()} className="flex-1 block w-full sm:text-sm text-black border-gray-300 " placeholder='9876543210' />
                    </div>
                    <button type="button" disabled={loader} onClick={(e) => { requestOtp() }} className="p-4 my-2 w-full bg-blue-600  text-white  font-medium  text-xs  leading-tight  uppercase  shadow-md  hover:bg-blue-700 hover:shadow-lg  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0  active:bg-blue-800 active:shadow-lg  transition  duration-150  ease-in-out">
                        Request OTP
                    </button>
                </div>
                :
                <div className="items-center text-black dark:text-gray-200 px-5">
                    <h1 className="text-md text-black">OTP</h1>
                    <input type="number" name="otp" onChange={(e) => setOtp(e.target.value)} onWheel={(e) => e.target.blur()} className="mt-1 h-12 shadow-sm px-3 rounded-sm text-slate-600 sm:text-sm border border-slate-300 hover:border-slate-500 outline-none w-full " />
                    <p className='text-xs text-black text-center mt-2'>Dont receivethe OTP? <b onClick={() => requestOtp()}> RESEND OTP</b> </p>
                    <div className='flex flex-row justify-between items-start gap-2'>
                        <button type="button" onClick={() => setstatus(false)} className="p-4 my-2 w-full text-black border border-red-600  text-red  font-medium  text-xs  leading-tight  uppercase  shadow-md  hover:bg-red-700 hover:shadow-lg  focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0  active:bg-red-800 active:shadow-lg  transition  duration-150  ease-in-out">
                            Cancel
                        </button>
                        <button type="button" onClick={() => verifyOTP()} className="p-4 my-2 w-full border  bg-blue-600  text-white  font-medium  text-xs  leading-tight  uppercase  shadow-md  hover:bg-blue-700 hover:shadow-lg  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0  active:bg-blue-800 active:shadow-lg  transition  duration-150  ease-in-out">
                            Verify
                        </button>
                    </div>
                </div>
            }
        </div>
        <div id='sign-in-button' className='hidden'></div>
    </div>
}

export default Login;