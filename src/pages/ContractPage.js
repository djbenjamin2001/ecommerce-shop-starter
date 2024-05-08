import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link from React Router
import ReactModal from 'react-modal';

// Set the root element for accessibility reasons
ReactModal.setAppElement('#root');

const Contract = ({ pdf, title, onStatusChange, initialStatus }) => {
  const [status, setStatus] = useState(initialStatus);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [decision, setDecision] = useState('');
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  useEffect(() => {
    // Update local storage and handle the More Info link visibility
    onStatusChange(title, status);
    setShowMoreInfo(status === 'Accepted');
  }, [status, onStatusChange, title]);

  const openModal = (decision) => {
    setDecision(decision);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const confirmDecision = () => {
    setStatus(decision === 'accept' ? 'Accepted' : 'Rejected');
    closeModal();
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex-grow">
        <a href={pdf} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
          {title}
        </a>
        {status && <span className={`ml-4 font-bold ${status === 'Accepted' ? 'text-green-500' : 'text-red-500'}`}>{status}</span>}
      </div>
      <div>
        <button onClick={() => openModal('accept')} className="mr-2 px-4 py-2 text-white bg-green-500 hover:bg-green-700 rounded">
          Accept
        </button>
        <button onClick={() => openModal('reject')} className="px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded">
          Reject
        </button>
        {showMoreInfo && (
          <a href='https://calendly.com/benjaminbatbayli/book-a-mountng-date' className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded">
            More Info
          </a>
        )}
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmation Modal"
        className="m-4 p-5 bg-white rounded shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-bold">Confirmation</h2>
        <p className="my-4">Are you sure you want to {decision} this contract?</p>
        <button onClick={confirmDecision} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2">
          Yes
        </button>
        <button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
          No
        </button>
      </ReactModal>
    </div>
  );
};

const ContractsPage = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    // Initialize contracts
    const fetchContracts = async () => {
      const fetchedContracts = [
        { title: 'Contract 1', pdf: 'http://example.com/contracts/contract1.pdf' },
        { title: 'Contract 2', pdf: 'http://example.com/contracts/contract2.pdf' },
        // Add more contracts as needed
      ];
      const contractsWithStatus = fetchedContracts.map(contract => {
        const storedStatus = localStorage.getItem(contract.title);
        return { ...contract, status: storedStatus || '' };
      });
      setContracts(contractsWithStatus);
    };

    fetchContracts();
  }, []);

  const handleStatusChange = (title, status) => {
    localStorage.setItem(title, status);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {contracts.map((contract, index) => (
        <Contract
          key={index}
          pdf={contract.pdf}
          title={contract.title}
          initialStatus={contract.status}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};

export default ContractsPage;
