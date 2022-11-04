import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toast";
import BottomNavigation from "./navigation";
import PostApi from "./Services/PostApi";
import TopBar from "./topBar";

function MyAccount() {

    let navigate = useNavigate();
    if (!sessionStorage.getItem('user')) {
        navigate('/login');
    }

    const [formValues, setFormValues] = useState({});
    
    let customerList = {
        "list_key": "Mastertable", "label": "auto_customer", "select": "*",
        "condition": { "status": 1, "auto_customer_code": JSON.parse(sessionStorage.getItem('user'))[0].auto_customer_code }
    }

    useEffect(() => {
        PostApi('services.php', customerList).then((e) => {
            setFormValues(e.responcePostData.data.result[0]);
        })
    }, [])


    const handlechange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const saveProfile = () => {

        let customerList = {
            "list_key": "UpdateMaster", "label": "auto_customer", "update_coloum": formValues,
            "condition": { "status": 1, "auto_customer_code": JSON.parse(sessionStorage.getItem('user'))[0].auto_customer_code }
        }

        PostApi('services.php', customerList).then((e) => {
            toast.success('Profile updated successfully');
        });
    }


    return <> <TopBar /> <ToastContainer position='top-right z-[999]' /><section className="text-gray-600 body-font">
        <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Account settings</h2>
            <form>
                <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label class="text-gray-700 dark:text-gray-200" for="username">Name</label>
                        <input id="auto_customer_fname" value={formValues['auto_customer_fname']} onChange={(e) => handlechange(e)} type="text" name="auto_customer_fname" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label class="text-gray-700 dark:text-gray-200" for="emailAddress">Email Address</label>
                        <input id="auto_customer_email" value={formValues['auto_customer_email']} onChange={(e) => handlechange(e)} name="auto_customer_email" type="email" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label class="text-gray-700 dark:text-gray-200" for="password">DOB</label>
                        <input id="auto_customer_dob" value={formValues['auto_customer_dob']} onChange={(e) => handlechange(e)} name="auto_customer_dob" type="date" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label class="text-gray-700 dark:text-gray-200" for="password">Phone</label>
                        <input id="auto_customer_phone" value={formValues['auto_customer_phone']} disabled name="auto_customer_phone" type="number" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label class="text-gray-700 dark:text-gray-200" for="password">Pincode</label>
                        <input id="auto_customer_pincode" value={formValues['auto_customer_pincode']} onChange={(e) => handlechange(e)} name="auto_customer_pincode" type="number" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label class="text-gray-700 dark:text-gray-200" for="passwordConfirmation">Address</label>
                        <textarea id="auto_customer_address" value={formValues['auto_customer_address']} onChange={(e) => handlechange(e)} name="auto_customer_address" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>
                </div>

                <div class="flex justify-end mt-6 mb-10">
                    <button type="button" onClick={() => saveProfile()} class="px-8 py-2.5 leading-5 text-white w-full transition-colors duration-300 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Save</button>
                </div>
            </form>
        </section>
    </section>
        <BottomNavigation />
    </>
}

export default MyAccount;