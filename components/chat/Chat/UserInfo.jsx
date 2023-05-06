import React, { useState } from 'react';

function UserInfo() {
  const [transcriptId, setTranscriptId] = useState('');
  const [clientId, setClientId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('transcriptId', transcriptId);
    localStorage.setItem('clientId', clientId);
  }

  return (

      <div className={`modal ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="modal-overlay"></div>

        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="transcriptId">
                Transcript ID
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="transcriptId" type="text" placeholder="Enter transcript ID" value={transcriptId} onChange={(e) => setTranscriptId(e.target.value)} />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="clientId">
                Client ID
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="clientId" type="text" placeholder="Enter client ID" value={clientId} onChange={(e) => setClientId(e.target.value)} />
            </div>
            <div className="flex items-center justify-end">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default UserInfo;
