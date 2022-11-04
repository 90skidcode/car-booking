
import { useEffect, useState } from 'react';
import BottomNavigation from './navigation';
import TopBar from './topBar';
import PostApi from './Services/PostApi';
import { UtilsJson } from './utils/UtilsJson';
import { toast, ToastContainer } from 'react-toast';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginFileRename from 'filepond-plugin-file-rename';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileRename)

function Booking() {
  const [modal, setModal] = useState(false);
  const [imagemodal, setimageModal] = useState(false);
  const [selectedCar, setselectedCar] = useState({});
  const [selectedCarImage, setselectedCarImage] = useState([]);
  const [carsList, setcarsList] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const [files, setFiles] = useState([])
  const [filesDetails, setFilesDetails] = useState([])
  let productData = { "list_key": "Mastertable", "label": "auto_product", "select": "*", "condition": { "status": 1 } }
  let bookingData = { "list_key": "Mastertable", "label": "auto_booking", "select": "*", "condition": { "auto_customer_code": JSON.parse(sessionStorage.getItem('user'))[0].id } }

  useEffect(() => {
    PostApi('services.php', productData).then((e) => { setcarsList(e.responcePostData.data.result); })
    PostApi('services.php', bookingData).then((e) => { setBookingList(e.responcePostData.data.result); })
  }, []);

  const findCar = (carCode, value) => {
    try {
      return carsList.length ? carsList.find(x => x.id === carCode) ? carsList.find(x => x.id === carCode)[value] : '' : '';
    } catch (error) {
      return '';
    }

  }

  const startRide = (id) => {
    let rideData = {
      "list_key": "AddMaster", "label": "auto_ride", "tablefields": {
        'auto_booking_id': selectedCar.id,
        'auto_cust_code': selectedCar.auto_customer_code,
        'auto_customer_book_name': selectedCar.auto_customer_book_name,
        "auto_customer_book_number": selectedCar.auto_customer_book_number,
        "auto_ride_start": new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
        "auto_start_ride_images": files.join(',')
      }
    };

    PostApi('services.php', rideData).then((e) => {
      toast.success('Ride Started successfully');
      let customerList = {
        "list_key": "UpdateMaster", "label": "auto_booking", "update_coloum": { 'status': 3 },
        "condition": { "id": selectedCar.id }
      }
      PostApi('services.php', customerList).then((e) => {
        window.location.reload(false);
      });
    });
  }

  const cancelBooking = () => {
    let customerList = {
      "list_key": "UpdateMaster", "label": "auto_booking", "update_coloum": { 'status': 2 },
      "condition": { "id": selectedCar.id }
    }

    PostApi('services.php', customerList).then((e) => {
      toast.success('Booking canceled successfully');
      PostApi('services.php', bookingData).then((e) => { setBookingList(e.responcePostData.data.result); })
    });
  }

  const viewImage = (item) => {
    setimageModal(true);
    setselectedCar(item);
    let rideData = { "list_key": "Mastertable", "label": "auto_ride", "select": "*", "condition": { "auto_booking_id": item.id, "auto_cust_code": JSON.parse(sessionStorage.getItem('user'))[0].id } }
    PostApi('services.php', rideData).then((e) => { setselectedCarImage(e.responcePostData.data.result); })
  }

  return (
    <div className='bg-slate-200 h-full'>
      <TopBar />
      <ToastContainer position='top-right z-[999]' />
      <div className="mx-2 pb-[70px] pt-12">
        {
          // eslint-disable-next-line react/jsx-key
          bookingList.map((item, i) => (
            <div key={i} className="w-full my-2 overflow-hidden bg-white rounded-lg shadow-lg ">
              <img className="object-cover" src={`${UtilsJson.baseUrl}image/${findCar(item.auto_product_code, 'auto_product_images')}`} alt="car" />
              <div className="py-3 text-center border-t">
                <div className="block text-2xl font-bold text-gray-800">{findCar(item.auto_product_code, 'auto_product_name')}</div>
                <div className="justify-center items-center text-sm text-gray-700 flex justify-items-center w-full mt-1">
                  <svg className="h-4 mx-3" viewBox="0 0 16 16" fill="currentcolor" focusable="false" aria-hidden="true" role="img">
                    <path d="M8.17 15.91a1.72 1.72 0 01-.5-3.36v-4H2.22v4a1.72 1.72 0 11-1 0V3.46A1.74 1.74 0 010 1.81a1.72 1.72 0 112.22 1.65v4.13h5.45V3.46a1.74 1.74 0 01-1.22-1.65 1.73 1.73 0 013.45 0 1.74 1.74 0 01-1.23 1.65v4.13h4.91a.2.2 0 00.2-.2V3.46a1.72 1.72 0 111 0v3.93a1.2 1.2 0 01-1.2 1.2H8.67v4a1.72 1.72 0 01-.5 3.36zm0-2.44a.72.72 0 10.73.72.72.72 0 00-.73-.72zm-6.45 0a.72.72 0 10.72.72.72.72 0 00-.72-.72zM14.28 1.09a.72.72 0 10.72.72.72.72 0 00-.72-.72zm-6.11 0a.72.72 0 10.73.72.72.72 0 00-.73-.72zm-6.45 0a.72.72 0 10.72.72.72.72 0 00-.72-.72z"></path></svg>
                  {findCar(item.auto_product_code, 'auto_product_geartype')}
                  <svg className="h-4 mx-3" viewBox="0 0 16 16" fill="currentcolor" focusable="false" aria-hidden="true" role="img"><path d="M13.88 8.21h-.27a1 1 0 01-1-1V4.59l.5 1.09v1.5a.53.53 0 00.53.53h.28zM10.68 7H4.59a.26.26 0 01-.26-.26V2.82a1.3 1.3 0 011.3-1.3h4a1.3 1.3 0 011.3 1.3v3.94a.26.26 0 01-.25.24zm-5.85-.5h5.61V2.82a.8.8 0 00-.8-.8h-4a.8.8 0 00-.8.8zm7.62 9.42h-10a1.22 1.22 0 010-2.44h.26V2.09a2 2 0 012-2h5.64a2 2 0 012 2v.07l2.29 5a.58.58 0 010 .18v4.23a.88.88 0 11-1.75 0v-.89a.45.45 0 00-.45-.44h-.13v3.25a1.22 1.22 0 010 2.44zm-10-1.59a.37.37 0 100 .74h10a.37.37 0 100-.74h-10zm1.11-.84h8V2.09A1.16 1.16 0 0010.39.93H4.75a1.16 1.16 0 00-1.16 1.16zm8.85-4.09h.13a1.3 1.3 0 011.3 1.29v.89l.05-4.14-1.48-3.24z"></path></svg>
                  {findCar(item.auto_product_code, 'auto_product_fueltype')}
                  <svg className="h-4 mx-3" viewBox="0 0 16 16" fill="currentcolor" focusable="false" aria-hidden="true" role="img"><path d="M8.88 14.53a23.14 23.14 0 01-4.11-.46c-.73-.12-1.48-.49-2-2.34a28.16 28.16 0 01-1.3-6.48.49.49 0 01.45-.54.51.51 0 01.54.46 27.92 27.92 0 001.22 6.21c.47 1.62.94 1.62 1.26 1.71a18.47 18.47 0 005.4.37.5.5 0 11.1 1 14.56 14.56 0 01-1.56.07zm5.62 1.09a1.41 1.41 0 00.39-1.19v-.54c-.07-1.79-.12-3-1.85-3.7a9 9 0 00-2.81-.54A4.53 4.53 0 018 9.13c-.8-.61-1-1.27-1.32-2.6l-.27-1a1.45 1.45 0 00-1-1.08 2.2 2.2 0 10-.8.08 1.45 1.45 0 00-.61.66c-.39.76-.34 3.25 1.13 5.49a3.28 3.28 0 001.07 1.11 7.93 7.93 0 003.84.75 9.55 9.55 0 011.26.07c.78.13.93.73 1.06 1.7.1.64.21 1.45 1 1.56a2.05 2.05 0 00.37 0 1.16 1.16 0 00.77-.25zM5.13 5.39c.09 0 .21.13.28.39.11.36.19.7.27 1 .37 1.4.61 2.33 1.69 3.15a5.14 5.14 0 002.75.71 8.08 8.08 0 012.5.47c1.1.46 1.17 1 1.24 2.82v.55a.67.67 0 01-.06.4h-.31a2.8 2.8 0 01-.17-.74c-.12-.85-.32-2.28-1.89-2.54a9 9 0 00-1.41-.09 7 7 0 01-3.39-.64 2.3 2.3 0 01-.75-.77 6.11 6.11 0 01-1.04-4.46c.09-.17.2-.25.28-.25zM6 2.31A1.21 1.21 0 114.79 1.1 1.21 1.21 0 016 2.31z"></path></svg>
                  {findCar(item.auto_product_code, 'auto_product_seat')} Seats </div>
              </div>
              <div className="py-3 text-center border-t">
                <div className="justify-center items-center text-center text-sm text-gray-700 flex justify-items-center w-full mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  mx-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>  {item.auto_customer_book_name}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  mx-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>  {item.auto_customer_book_number} <br />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  mx-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>  {item.auto_start_date} -  {item.auto_end_date} </div>
              </div>
              <div className="text-center">
                {item.status === '1' ? <>
                  <button onClick={() => { setModal(true); setselectedCar(item); }} type="button" className="px-6 mb-2 mr-2 py-2.5 border-2 border-blue-600 bg-blue-600 text-white font-medium text-xs leading-tight uppercase shadow-md    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0  active:bg-blue-800 active:shadow-lg  transition  duration-150  ease-in-out rounded-sm">
                    Ride Now
                  </button>
                  <button onClick={() => { setselectedCar(item); cancelBooking(); }} type="button" className="px-6 mb-2 py-2.5 border-2 border-red-600 bg-white text-black font-medium text-xs leading-tight uppercase shadow-md    focus:outline-none focus:ring-0 transition  duration-150  ease-in-out rounded-sm">
                    Cancel Booking
                  </button>
                </>
                  : item.status === '2' ?
                    <h1 className='m-2 text-red-600'>Booking canceled</h1> :
                    item.status === '3' ?
                      <>
                        <button onClick={() => viewImage(item)} type="button" className="px-6 mb-2 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase shadow-md    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0  active:bg-blue-800 active:shadow-lg  transition  duration-150  ease-in-out rounded-sm">
                          View Image
                        </button>
                      </> : ''}
              </div>
            </div>
          )
          )
        }

      </div>

      <div className={`relative z-30 w-full ${!modal ? 'hidden' : ''}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center w-full min-h-full  text-center sm:p-0">
            <div className="relative bg-white rounded-t-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-full">
              <div className="bg-white px-4 pt-5  sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 text-center font-medium text-gray-900" id="modal-title">{selectedCar.name}</h3>
                    <div className="mt-2">
                      <FilePond
                        id="files"
                        fileRenameFunction={(file) => { return `${new Date().getTime()}${file.extension}` }}
                        value={filesDetails}
                        allowMultiple={false}
                        maxFiles={10}
                        onupdatefiles={setFilesDetails}
                        server={{
                          'url': 'https://thecoderspace.com/codedev/automobile/api/upload.php',
                          process: {
                            onload: (response) => {
                              setFiles([...files, JSON.parse(response).result]);
                            }
                          }
                        }}
                        name="file" /* sets the file input name, it's filepond by default */
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                        onremovefile={(error, file) => {
                          setFiles(files.filter(item => item !== file.filename))
                        }}
                      /> </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={() => startRide()} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">Start Ride</button>
                <button type="button" onClick={() => {
                  setModal(false);
                  setFiles([]);
                  setFilesDetails([]);
                  window.location.reload(false);
                }} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`relative z-30 w-full ${!imagemodal ? 'hidden' : ''}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center w-full min-h-full  text-center sm:p-0">
            <div className="relative bg-white rounded-t-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-full">
              <div className="bg-white px-4 pt-5  sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 sm:mt-0 sm:ml-4 text-center flex flex-col items-center justify-center justify-self-center ">
                    <h3 className="text-lg leading-6 text-center font-medium text-gray-900" id="modal-title">{selectedCar.auto_product_name}</h3>
                    {
                      // eslint-disable-next-line jsx-a11y/alt-text
                      (selectedCarImage)[0]?.auto_start_ride_images ?
                        (selectedCarImage)[0]?.auto_start_ride_images.split(',').map(i => i ? <img alt={i} className='text-center m-2' src={`${UtilsJson.baseUrl}image/${i}`} />
                          : '') : ''
                    }
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={() => setimageModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}

export default Booking;