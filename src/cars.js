
import { useState } from 'react';
import BottomNavigation from './navigation';
import TopBar from './topBar';
function Cars() {
  const [modal, setModal] = useState(false);
  const [selectedCar, setselectedCar] = useState({});
  let carsList = [{
    name: 'Tata Nexon',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: '5',
    img: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/42611/tata-nexon-ev-right-front-three-quarter6.jpeg?q=75'
  }, {
    name: 'Maruti Suzuki',
    transmission: 'Manual',
    fuel: 'Diesel',
    seats: '5',
    img: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/54399/exterior-right-front-three-quarter-10.jpeg?q=75'
  }, {
    name: 'Toyota Innova Crysta',
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: '7 & 8',
    img: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/51435/innova-crysta-exterior-right-front-three-quarter-3.jpeg?q=75'
  }]

  return (
    <div className='bg-slate-200'>
      <TopBar />
      <div className="mx-2 pb-[70px] pt-12">
        {
          // eslint-disable-next-line react/jsx-key
          carsList.map((item, i) => (<div key={i} className="w-full my-2 overflow-hidden bg-white rounded-lg shadow-lg ">
            <img className="object-cover" src={item.img} alt="avatar" />
            <div className="py-3 text-center border-t">
              <div className="block text-2xl font-bold text-gray-800">{item.name}</div>
              <div className="justify-center items-center text-sm text-gray-700 flex justify-items-center w-full mt-1">
                <svg className="h-4 mx-3" viewBox="0 0 16 16" fill="currentcolor" focusable="false" aria-hidden="true" role="img">
                  <path d="M8.17 15.91a1.72 1.72 0 01-.5-3.36v-4H2.22v4a1.72 1.72 0 11-1 0V3.46A1.74 1.74 0 010 1.81a1.72 1.72 0 112.22 1.65v4.13h5.45V3.46a1.74 1.74 0 01-1.22-1.65 1.73 1.73 0 013.45 0 1.74 1.74 0 01-1.23 1.65v4.13h4.91a.2.2 0 00.2-.2V3.46a1.72 1.72 0 111 0v3.93a1.2 1.2 0 01-1.2 1.2H8.67v4a1.72 1.72 0 01-.5 3.36zm0-2.44a.72.72 0 10.73.72.72.72 0 00-.73-.72zm-6.45 0a.72.72 0 10.72.72.72.72 0 00-.72-.72zM14.28 1.09a.72.72 0 10.72.72.72.72 0 00-.72-.72zm-6.11 0a.72.72 0 10.73.72.72.72 0 00-.73-.72zm-6.45 0a.72.72 0 10.72.72.72.72 0 00-.72-.72z"></path></svg>
                {item.transmission}
                <svg className="h-4 mx-3" viewBox="0 0 16 16" fill="currentcolor" focusable="false" aria-hidden="true" role="img"><path d="M13.88 8.21h-.27a1 1 0 01-1-1V4.59l.5 1.09v1.5a.53.53 0 00.53.53h.28zM10.68 7H4.59a.26.26 0 01-.26-.26V2.82a1.3 1.3 0 011.3-1.3h4a1.3 1.3 0 011.3 1.3v3.94a.26.26 0 01-.25.24zm-5.85-.5h5.61V2.82a.8.8 0 00-.8-.8h-4a.8.8 0 00-.8.8zm7.62 9.42h-10a1.22 1.22 0 010-2.44h.26V2.09a2 2 0 012-2h5.64a2 2 0 012 2v.07l2.29 5a.58.58 0 010 .18v4.23a.88.88 0 11-1.75 0v-.89a.45.45 0 00-.45-.44h-.13v3.25a1.22 1.22 0 010 2.44zm-10-1.59a.37.37 0 100 .74h10a.37.37 0 100-.74h-10zm1.11-.84h8V2.09A1.16 1.16 0 0010.39.93H4.75a1.16 1.16 0 00-1.16 1.16zm8.85-4.09h.13a1.3 1.3 0 011.3 1.29v.89l.05-4.14-1.48-3.24z"></path></svg>
                {item.fuel}
                <svg className="h-4 mx-3" viewBox="0 0 16 16" fill="currentcolor" focusable="false" aria-hidden="true" role="img"><path d="M8.88 14.53a23.14 23.14 0 01-4.11-.46c-.73-.12-1.48-.49-2-2.34a28.16 28.16 0 01-1.3-6.48.49.49 0 01.45-.54.51.51 0 01.54.46 27.92 27.92 0 001.22 6.21c.47 1.62.94 1.62 1.26 1.71a18.47 18.47 0 005.4.37.5.5 0 11.1 1 14.56 14.56 0 01-1.56.07zm5.62 1.09a1.41 1.41 0 00.39-1.19v-.54c-.07-1.79-.12-3-1.85-3.7a9 9 0 00-2.81-.54A4.53 4.53 0 018 9.13c-.8-.61-1-1.27-1.32-2.6l-.27-1a1.45 1.45 0 00-1-1.08 2.2 2.2 0 10-.8.08 1.45 1.45 0 00-.61.66c-.39.76-.34 3.25 1.13 5.49a3.28 3.28 0 001.07 1.11 7.93 7.93 0 003.84.75 9.55 9.55 0 011.26.07c.78.13.93.73 1.06 1.7.1.64.21 1.45 1 1.56a2.05 2.05 0 00.37 0 1.16 1.16 0 00.77-.25zM5.13 5.39c.09 0 .21.13.28.39.11.36.19.7.27 1 .37 1.4.61 2.33 1.69 3.15a5.14 5.14 0 002.75.71 8.08 8.08 0 012.5.47c1.1.46 1.17 1 1.24 2.82v.55a.67.67 0 01-.06.4h-.31a2.8 2.8 0 01-.17-.74c-.12-.85-.32-2.28-1.89-2.54a9 9 0 00-1.41-.09 7 7 0 01-3.39-.64 2.3 2.3 0 01-.75-.77 6.11 6.11 0 01-1.04-4.46c.09-.17.2-.25.28-.25zM6 2.31A1.21 1.21 0 114.79 1.1 1.21 1.21 0 016 2.31z"></path></svg>
                {item.seats} Seats </div>

            </div>
            <div className="text-center">
              <button onClick={() => {setModal(true);setselectedCar(item)}} type="button" className="px-6 mb-2 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase shadow-md    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0  active:bg-blue-800 active:shadow-lg  transition  duration-150  ease-in-out rounded-sm">
                Book Now
              </button>
            </div>
          </div>)
          )
        }

      </div>

      <div className={`relative z-30 w-full ${!modal ? 'hidden' : ''}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center w-full min-h-full  text-center sm:p-0">
            <div className="relative bg-white rounded-t-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="1280.000000pt" height="640.000000pt" viewBox="0 0 1280.000000 640.000000" preserveAspectRatio="xMidYMid meet">
                      <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                        <path d="M3525 5341 c-72 -18 -79 -28 -90 -121 -4 -30 -11 -62 -16 -71 -4 -9 -97 -51 -206 -94 -774 -304 -1348 -540 -1603 -661 -163 -77 -222 -91 -421 -104 -85 -5 -170 -14 -189 -20 -101 -32 -362 -58 -620 -63 l-115 -2 -47 -80 c-47 -78 -47 -80 -29 -100 34 -36 35 -77 5 -177 -30 -99 -34 -178 -19 -370 5 -67 4 -88 -6 -88 -29 0 -83 -56 -110 -114 -50 -106 -74 -343 -48 -467 13 -58 13 -62 3 -159 -5 -54 16 -238 28 -244 2 -1 29 -20 61 -41 73 -49 123 -103 132 -143 17 -79 167 -155 355 -181 104 -15 969 -97 1087 -104 l32 -2 5 160 c7 230 50 394 146 559 281 479 917 673 1405 429 316 -159 530 -424 598 -742 22 -106 29 -365 13 -519 l-8 -82 3002 0 c2855 0 3002 1 2995 18 -33 87 -56 325 -45 461 28 320 177 567 459 759 399 273 847 282 1243 24 239 -157 397 -392 460 -687 18 -84 15 -341 -5 -430 -8 -38 -14 -71 -12 -73 7 -8 386 20 478 34 180 28 253 65 304 152 24 41 28 57 28 127 -1 44 -9 117 -20 163 -18 79 -18 88 -2 190 31 199 40 306 41 497 1 176 -1 195 -23 260 -46 135 -103 190 -283 274 -222 104 -633 220 -1168 330 -523 108 -1524 210 -2054 211 l-229 0 -236 139 c-813 477 -1593 884 -1852 966 -498 157 -1598 195 -2892 100 l-188 -14 -47 30 c-92 58 -223 89 -297 70z m1912 -311 c13 -45 58 -305 88 -515 33 -226 74 -539 71 -542 -7 -7 -1672 40 -2054 58 -357 16 -464 56 -573 215 -62 91 -87 225 -59 326 12 40 56 74 192 148 369 198 799 289 1618 340 246 15 290 16 510 16 l194 -1 13 -45z m649 10 c383 -36 717 -86 934 -139 210 -52 451 -163 720 -332 141 -88 379 -259 380 -271 0 -5 -14 -8 -32 -8 -48 0 -114 -37 -140 -78 -24 -39 -30 -113 -15 -189 l9 -43 -904 0 -904 0 -176 540 -175 540 47 0 c25 0 141 -9 256 -20z" />
                        <path d="M2617 3125 c-431 -82 -774 -440 -838 -875 -17 -117 -7 -292 24 -410 113 -436 497 -751 947 -777 507 -29 959 313 1076 813 28 117 26 348 -4 467 -94 378 -383 670 -760 768 -105 27 -336 34 -445 14z m378 -310 c84 -21 209 -85 280 -142 116 -94 210 -242 251 -393 23 -87 24 -260 0 -355 -58 -237 -242 -439 -473 -519 -531 -186 -1074 277 -969 828 30 152 94 274 206 386 111 110 237 178 385 206 84 16 235 11 320 -11z" />
                        <path d="M2918 2568 c2 -90 7 -167 12 -172 17 -17 108 58 201 166 l51 57 -48 31 c-52 33 -131 65 -185 75 l-34 6 3 -163z" />
                        <path d="M2591 2700 c-62 -22 -167 -82 -164 -94 3 -13 237 -216 249 -216 7 0 15 7 18 16 8 20 8 127 -1 232 -7 95 -8 96 -102 62z" />
                        <path d="M3209 2355 c-57 -64 -105 -123 -107 -131 -6 -25 46 -35 157 -29 58 3 121 8 139 11 33 5 34 6 27 42 -7 44 -64 167 -92 201 l-19 24 -105 -118z" />
                        <path d="M2260 2409 c-31 -44 -68 -133 -77 -186 l-6 -33 155 0 c165 0 201 9 181 44 -13 24 -204 216 -214 216 -5 0 -22 -18 -39 -41z" />
                        <path d="M2786 2354 c-36 -35 0 -87 44 -64 26 14 26 56 1 70 -25 13 -27 13 -45 -6z" />
                        <path d="M2751 2186 c-57 -32 -68 -111 -22 -157 43 -42 101 -43 143 -1 42 42 41 100 -1 143 -33 32 -78 38 -120 15z" />
                        <path d="M2560 2136 c-19 -23 -8 -61 18 -64 44 -7 67 32 36 62 -19 20 -38 20 -54 2z" />
                        <path d="M3002 2124 c-27 -19 -28 -36 -3 -58 25 -23 61 -6 61 29 0 33 -30 49 -58 29z" />
                        <path d="M2245 1993 c-77 -6 -76 -5 -59 -65 16 -55 61 -146 92 -186 l18 -23 103 122 c57 67 104 129 105 138 1 14 -14 16 -104 17 -58 0 -127 -1 -155 -3z" />
                        <path d="M3165 1981 c-44 -4 -61 -10 -63 -22 -3 -16 210 -229 228 -229 22 0 86 141 105 228 l7 32 -109 -2 c-59 -1 -135 -4 -168 -7z" />
                        <path d="M2776 1914 c-19 -18 -19 -20 -6 -45 6 -11 21 -19 35 -19 20 0 45 24 45 44 0 10 -32 36 -45 36 -7 0 -21 -7 -29 -16z" />
                        <path d="M2589 1743 c-86 -90 -139 -151 -139 -162 0 -25 179 -101 236 -101 l27 0 -7 143 c-9 166 -13 187 -35 187 -9 0 -46 -30 -82 -67z" />
                        <path d="M2936 1801 c-6 -10 -24 -168 -29 -258 -3 -60 -2 -63 19 -63 79 0 262 68 248 92 -5 7 -53 64 -108 126 -93 105 -117 124 -130 103z" />
                        <path d="M10723 3125 c-318 -58 -597 -266 -743 -555 -223 -441 -98 -996 289 -1288 112 -84 188 -125 311 -166 274 -91 545 -70 802 61 552 282 735 983 392 1500 -225 339 -651 521 -1051 448z m385 -315 c348 -98 579 -443 532 -796 -67 -508 -596 -796 -1055 -574 -239 116 -396 352 -412 620 -20 335 192 640 516 745 122 40 289 42 419 5z" />
                        <path d="M11017 2568 c3 -90 9 -167 14 -172 13 -14 53 18 155 122 l95 97 -23 18 c-50 40 -189 97 -235 97 -10 0 -11 -33 -6 -162z" />
                        <path d="M10705 2706 c-50 -16 -133 -58 -163 -82 l-23 -19 121 -107 c67 -60 128 -108 135 -108 23 0 27 39 20 186 -8 162 -4 157 -90 130z" />
                        <path d="M11307 2354 c-59 -65 -107 -126 -107 -136 0 -11 11 -18 38 -22 44 -7 278 7 289 17 15 16 -51 183 -94 236 l-19 24 -107 -119z" />
                        <path d="M10362 2413 c-39 -62 -70 -134 -78 -184 l-7 -39 152 0 c86 0 161 5 172 10 17 10 18 13 5 38 -8 15 -59 71 -114 125 l-99 99 -31 -49z" />
                        <path d="M10888 2359 c-24 -14 -23 -56 2 -69 44 -23 80 29 44 64 -18 19 -23 19 -46 5z" />
                        <path d="M10851 2187 c-49 -29 -66 -101 -35 -146 9 -13 32 -29 50 -37 29 -12 39 -12 68 0 99 41 85 180 -19 192 -24 3 -50 -1 -64 -9z" />
                        <path d="M10660 2136 c-19 -23 -8 -61 18 -64 44 -7 67 32 36 62 -19 20 -38 20 -54 2z" />
                        <path d="M11096 2124 c-9 -8 -16 -22 -16 -29 0 -13 26 -45 36 -45 20 0 44 25 44 45 0 14 -8 29 -19 35 -25 13 -27 13 -45 -6z" />
                        <path d="M10335 1991 c-60 -6 -60 -6 -57 -36 9 -69 104 -248 122 -229 57 61 210 250 207 258 -4 12 -176 17 -272 7z" />
                        <path d="M11267 1983 c-68 -5 -79 -19 -47 -60 23 -31 200 -193 210 -193 3 0 20 24 37 53 29 48 52 111 67 180 l6 27 -107 -2 c-60 -1 -134 -3 -166 -5z" />
                        <path d="M10870 1910 c-16 -31 4 -62 38 -58 21 2 28 9 30 32 5 45 -47 65 -68 26z" />
                        <path d="M10651 1703 c-56 -59 -101 -113 -101 -120 0 -28 172 -103 237 -103 l26 0 -7 123 c-10 179 -15 207 -36 207 -10 0 -63 -48 -119 -107z" />
                        <path d="M11035 1801 c-7 -12 -23 -144 -29 -243 -4 -77 -4 -78 19 -78 45 0 130 22 193 51 l64 29 -19 23 c-65 82 -198 227 -209 227 -7 0 -15 -4 -19 -9z" />
                      </g>
                    </svg>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 text-center font-medium text-gray-900" id="modal-title">{selectedCar.name}</h3>
                    <div className="mt-2">
                      <label className='text-left'>Name</label>
                      <input type="text" className="mt-1 h-12 shadow-sm px-3 rounded-sm text-slate-600 sm:text-sm border border-slate-300 hover:border-slate-500 outline-none w-full " />
                      <label className='text-left'>From Date</label>
                      <input type="date" className="mt-1 h-12 shadow-sm px-3 rounded-sm text-slate-600 sm:text-sm border border-slate-300 hover:border-slate-500 outline-none w-full " />
                      <label className='text-left'>To Date</label>
                      <input type="date" className="mt-1 h-12 shadow-sm px-3 rounded-sm text-slate-600 sm:text-sm border border-slate-300 hover:border-slate-500 outline-none w-full " />
                      {/* <p className="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">Book Now</button>
                <button type="button" onClick={() => setModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}

export default Cars;
