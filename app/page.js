"use client";
import Hi from "@/public/Hi.jpeg";
import Image from "next/image";
import { useEffect, useState } from "react";
import ThanksCat from "@/public/thanks-cat.gif";

export default function Home() {
  const [showProblemModal, setShowProblemModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [getIdTicket, setIdTicket] = useState("");

  useEffect(() => {
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwfbgvYTiHcQ4JJRowGCgenxfQ7InNGUhefPUCvSiNwygMyqIl5qwMgSW5xDdplQxBd6g/exec";

    const form = document.forms["Kelah-Keluh"];

    if (form) {
      const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch(scriptURL, { method: "POST", body: new FormData(form) })
          .then((response) => {
            if (response.ok) {
              setShowSuccessModal(true);
              form.reset();
              setShowProblemModal(false);
              setShowRequestModal(false);
              setShowSuggestionModal(false);
              setTimeout(() => {
                setShowSuccessModal(false);
              }, 5000);
            } else {
              console.error("Failed to submit form");
            }
          })
          .catch((error) => console.error("Error!", error.message))
          .finally(() => {
            setLoading(false);
          });
      };

      form.addEventListener("submit", handleSubmit);

      return () => {
        form.removeEventListener("submit", handleSubmit);
      };
    }

    const interval = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 1000);

    const uuid = crypto.randomUUID().substring(0, 6)
    setIdTicket(uuid);

    return () => {
      clearInterval(interval);
    };
  }, [showProblemModal, showRequestModal, showSuggestionModal]);

  return (
    <>
      <section
        className="h-dvh overflow-hidden bg-[#2246ED] relative flex flex-col md:justify-center md:items-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url('/BgGrid.svg')` }}
      >
        <Image
          src={Hi}
          width={300}
          height={300}
          className=" bouncing-img hidden md:flex z-[1] absolute  w-[234px] h-[304px] rounded-2xl left-0 top-0 object-cover"
          alt=""
        />

        <div className="flex flex-col justify-center items-center z-[2] gap-4 lg:gap-10 md:p-0 p-4">
          <h1 className=" font-acumin-pro-bold italic text-2xl lg:text-3xl text-white">
            CRETECH
          </h1>
          <div className="flex flex-col gap-4 justify-center  items-center lg:pb-12 pb-10">
            <h1 className=" text-balance text-center font-Garamond-Regular text-white text-5xl lg:text-8xl md:py-0 pt-8">
              Tiada kesan tanpa <br /> keluhanmu..
            </h1>
            <p className="text-sm lg:text-xl text-center text-white text-balance w-full md:w-1/2 ">
              Form ini dibuat untuk menampung Request, Suggestion & Problem ke
              Tech team. Semua yang ada di form ini akan di review & solve
              setiap minggunya.
            </p>
          </div>

          <div className="z-[2] flex flex-col lg:flex-row md:justify-center px-8 gap-4 lg:gap-10 w-full">
            <button
              onClick={() => setShowProblemModal(true)}
              className="group hover:bg-gradient-to-r from-green-500 via-green-400 to-lime-300 transition-all duration-300 px-8 py-4 hover:border-transparent flex gap-4 border rounded-full border-white justify-center items-center"
            >
              <h1 className="group-hover:text-black text-white text-2xl ">
                Problem ⚙
              </h1>
            </button>
            <button
              onClick={() => setShowRequestModal(true)}
              className="group hover:bg-gradient-to-r from-green-500 via-green-400 to-lime-300 transition-all duration-300 px-8 py-4 hover:border-transparent flex gap-4 border rounded-full border-white justify-center items-center"
            >
              <h1 className="group-hover:text-black text-white text-2xl ">
                Request 🙇‍♂️
              </h1>
            </button>
            <button
              onClick={() => setShowSuggestionModal(true)}
              className="group hover:bg-gradient-to-r from-green-500 via-green-400 to-lime-300 transition-all duration-300 px-8 py-4 hover:border-transparent flex gap-4 border rounded-full border-white justify-center items-center"
            >
              <h1 className="group-hover:text-black text-white text-2xl ">
                Suggestion 🧠
              </h1>
            </button>
          </div>
          <div className="z-[2] footer absolute bottom-[20px]">
            <p className="text-white">
              ©{currentYear} | Cretech - Everything Fixed!
            </p>
          </div>
        </div>
      </section>

      {showProblemModal && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
            <div className=" bg-white p-6 gap-2 rounded-lg shadow-lg w-[90%] max-h-[95dvh] sm:w-[50%] sm:min-h-[50%] overflow-y-auto flex flex-col">
              <form name="Kelah-Keluh">
                <input type="hidden" name="category" value="Problem" />
                <input type="hidden" name="id_ticket" value={getIdTicket} />
                <div className="flex justify-between">
                  <h2 className="text-2xl sm:text-3xl mb-4">Apa problem lo?</h2>
                  <h1
                    onClick={() => setShowProblemModal(false)}
                    className="group cursor-pointer "
                  >
                    <svg
                      className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400 group-hover:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fillRule="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                  </h1>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-500 via-green-400 to-lime-300 rounded-xl w-full ">
                  <h1 className=" text-sm sm:text-xl text-black">
                    Hardware: Kerusakan laptop, laptop lemot, etc <br />{" "}
                    Software: Install ulang, software, icloud & perpassword an
                    duniawi, etc
                  </h1>
                </div>
                <label className="block text-md mt-4 text-black">Name</label>

                <input
                  type="text"
                  disabled={loading}
                  name="name"
                  placeholder="Ex: Borax"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />

                <label className="block text-md mt-4 text-black">
                  Division
                </label>

                <select
                  name="division"
                  disabled={loading}
                  className="mt-1 px-1 py-[9px] border border-gray-300 rounded-md w-full"
                  required
                >
                  <option disabled>Select Division</option>
                  <option value="Community">Community</option>
                  <option value="Condfe">Condfe</option>
                  <option value="Creative">Creative</option>
                  <option value="Digital">Digital</option>
                  <option value="Editor">Editor</option>
                  <option value="Finance">Finance</option>
                  <option value="Hr">Hr</option>
                  <option value="Marketing">Marketing</option>
                  <option value="OGS">OGS</option>
                  <option value="Production">Production</option>
                  <option value="Tech">Tech</option>
                </select>

                <label className="block text-md mt-4 text-black">
                  Type of Problem
                </label>

                <select
                  name="type"
                  disabled={loading}
                  className="mt-1 px-1 py-[9px] border border-gray-300 rounded-md w-full"
                  required
                >
                  <option disabled>Select Type</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                </select>

                <label className="block text-md mt-4 text-black">
                  Description
                </label>

                <textarea
                  name="description"
                  disabled={loading}
                  placeholder="Ex: (Hardware) laptopnya lemot, wifi disconnect. (Software) Install ulang laptop, email kantor ga bisa login "
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  rows="4"
                  required
                ></textarea>

                <div className="flex justify-end space-x-2 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowProblemModal(false)}
                    className="bg-gray-500 hover:bg-slate-800 transition-all duration-300 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={loading}
                    type="submit"
                    className={`bg-blue-500 text-white px-4 py-2 rounded ${
                      loading ? "" : "hover:bg-[#2246ED]"
                    }`}
                  >
                    {loading ? <span>Sending..</span> : <span>Submit</span>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {showRequestModal && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
            <div className=" bg-white p-6 gap-2 rounded-lg shadow-lg w-[90%] max-h-[95dvh] sm:w-[50%] sm:min-h-[50%] overflow-y-auto flex flex-col">
              <form name="Kelah-Keluh">
                <input type="hidden" name="category" value="Request" />
                <input type="hidden" name="id_ticket" value={getIdTicket} />
                <div className="flex justify-between">
                  <h2 className="text-2xl sm:text-3xl mb-4">Apa request lo?</h2>
                  <h1
                    onClick={() => setShowRequestModal(false)}
                    className="group cursor-pointer "
                  >
                    <svg
                      className="w-7 h-7 sm:w-8 sm:h-8  text-gray-400 group-hover:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fillRule="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                  </h1>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-500 via-green-400 to-lime-300 rounded-xl w-full ">
                  <h1 className=" text-sm sm:text-xl text-black">
                    Hardware: Pembelian sparepart PC / Laptop untuk operasional
                    Kantor, etc <br />
                    Software: Pembelian domain, icloud, subscribtion, email, etc
                  </h1>
                </div>

                <label className="block text-md mt-6 text-black">Name</label>

                <input
                  type="text"
                  name="name"
                  disabled={loading}
                  placeholder="Ex: Borax"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />

                <label className="block text-md mt-4 text-black">
                  Division
                </label>

                <select
                  name="division"
                  disabled={loading}
                  className="mt-1 px-1 py-[9px] border border-gray-300 rounded-md w-full"
                  required
                >
                  <option disabled>Select Division</option>
                  <option value="Community">Community</option>
                  <option value="Condfe">Condfe</option>
                  <option value="Creative">Creative</option>
                  <option value="Digital">Digital</option>
                  <option value="Editor">Editor</option>
                  <option value="Finance">Finance</option>
                  <option value="Hr">Hr</option>
                  <option value="Marketing">Marketing</option>
                  <option value="OGS">OGS</option>
                  <option value="Production">Production</option>
                  <option value="Tech">Tech</option>
                </select>

                <label className="block text-md mt-4 text-black">
                  Type of Request
                </label>

                <select
                  name="type"
                  disabled={loading}
                  className="mt-1 px-1 py-[9px] border border-gray-300 rounded-md w-full"
                  required
                >
                  <option disabled>Select type</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Data">Data</option>

                </select>

                <label className="block text-md mt-4 text-black">
                  Approval
                </label>

                <select
                  name="approval"
                  disabled={loading}
                  className="mt-1 px-1 py-[9px] border border-gray-300 rounded-md w-full"
                  required
                >
                  <option disabled>Select approval</option>
                  <option value="Head">Head</option>
                  <option value="Bob">Bob</option>
                  <option value="None">None</option>

                </select>

                <label className="block text-md mt-4 text-black">
                  Description
                </label>

                <textarea
                  name="description"
                  disabled={loading}
                  placeholder="Ex: (Hardware) Harddisk backup habis. (Software) Buat akun email kantor"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  rows="4"
                  required
                ></textarea>

                <div className="flex justify-end space-x-2 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowRequestModal(false)}
                    className="bg-gray-500 hover:bg-slate-800 transition-all duration-300 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={loading}
                    type="submit"
                    className={`bg-blue-500 text-white px-4 py-2 rounded ${
                      loading ? "" : "hover:bg-[#2246ED]"
                    }`}
                  >
                    {loading ? <span>Sending..</span> : <span>Submit</span>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {showSuggestionModal && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
            <div className=" bg-white p-6 gap-2 rounded-lg shadow-lg w-[90%] max-h-[95dvh] sm:w-[50%] sm:min-h-[50%] overflow-y-auto  flex flex-col">
              <form name="Kelah-Keluh">
                <input type="hidden" name="category" value="Suggestion" />
                <input type="hidden" name="id_ticket" value={getIdTicket} />
                <div className="flex justify-between">
                  <h2 className="text-2xl sm:text-3xl mb-4">
                    Lu punya ide atau masukkan apa nih buat kita?
                  </h2>
                  <h1
                    onClick={() => setShowSuggestionModal(false)}
                    className="group cursor-pointer "
                  >
                    <svg
                      className="sm:w-8 sm:h-8 w-7 h-7 text-gray-400 group-hover:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fillRule="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                  </h1>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-500 via-green-400 to-lime-300 rounded-xl w-full ">
                  <h1 className=" text-sm sm:text-xl text-black">
                    Ide apapun yang bisa ngebantu/ mempermudah perkerjaan kalian
                    yang bisa kita develop. Jika possible, project akan
                    dimasukan ke basecamp, dan di develop.
                  </h1>
                </div>

                <label className="block text-md mt-4 text-black">Name</label>
                <input
                  type="text"
                  name="name"
                  disabled={loading}
                  placeholder="Ex: Borax"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />

                <label className="block text-md mt-4 text-black">
                  Division
                </label>
                <select
                  name="division"
                  disabled={loading}
                  className="mt-1 px-1 py-[9px] border border-gray-300 rounded-md w-full"
                  required
                >
                  <option disabled>Select Division</option>
                  <option value="Community">Community</option>
                  <option value="Condfe">Condfe</option>
                  <option value="Creative">Creative</option>
                  <option value="Digital">Digital</option>
                  <option value="Editor">Editor</option>
                  <option value="Finance">Finance</option>
                  <option value="Hr">Hr</option>
                  <option value="Marketing">Marketing</option>
                  <option value="OGS">OGS</option>
                  <option value="Production">Production</option>
                  <option value="Tech">Tech</option>
                </select>

                <label className="block text-md mt-4 text-black">
                  Reference
                </label>
                <textarea
                  name="reference"
                  disabled={loading}
                  placeholder="Ex: Link website, artikel atau video"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  rows="1"
                  required
                ></textarea>

                <label className="block text-md mt-4 text-black">
                  Description
                </label>

                <textarea
                  name="description"
                  disabled={loading}
                  placeholder="Ex: Detail singkat ide atau saran tentang apa yang ingin di develop"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  rows="4"
                  required
                ></textarea>

                <div className="flex justify-end space-x-2 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowSuggestionModal(false)}
                    className="bg-gray-500 hover:bg-slate-800 transition-all duration-300 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={loading}
                    type="submit"
                    className={`bg-blue-500 text-white px-4 py-2 rounded ${
                      loading ? "" : "hover:bg-[#2246ED]"
                    }`}
                  >
                    {loading ? <span>Sending..</span> : <span>Submit</span>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
          <div className=" flex flex-col justify-center items-center p-6 gap-2 rounded-lg shadow-lg ">
            <Image
              width={300}
              height={300}
              className="w-full h-full"
              src={ThanksCat}
              alt=""
            />
          </div>
        </div>
      )}
    </>
  );
}
