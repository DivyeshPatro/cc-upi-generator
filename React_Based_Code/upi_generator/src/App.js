import { useState, useEffect } from 'react';
import { banks, logos } from './constants';
import { validateMobile, validateCardNumber, getCardNetwork } from './utils/validators';
import QRDisplay from './components/QRDisplay';
import ThemeToggleButton from './components/ThemeToggleButton';
import SavedCards from './components/SavedCards';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

export default function App() {
  const [mobile, setMobile] = useState('');
  const [bank, setBank] = useState(banks[0]);
  const [card, setCard] = useState('');
  const [upiId, setUpiId] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [error, setError] = useState('');
  const [cardNetwork, setCardNetwork] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [cardError, setCardError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Debounced validation for mobile number
  useEffect(() => {
    if (!mobile) {
      setMobileError('');
      return;
    }

    const timer = setTimeout(() => {
      if (!validateMobile(mobile)) {
        setMobileError('Please enter a valid 10-digit mobile number starting with 6-9.');
      } else {
        setMobileError('');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [mobile]);

  // Debounced validation for card number
  useEffect(() => {
    if (!card) {
      setCardError('');
      setCardNetwork('');
      return;
    }

    const timer = setTimeout(() => {
      const network = getCardNetwork(card);
      setCardNetwork(network || '');

      if (card.length >= 12) {
        if (!validateCardNumber(card)) {
          setCardError('Invalid card number. Please check and try again.');
        } else {
          setCardError('');
        }
      } else {
        setCardError('');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [card]);

  // Card network logos mapping
  const getCardNetworkLogo = (network) => {

    return logos[network?.toLowerCase()] || null;
  };

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = upiId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const generateUpiId = (phone, cardInput, bank) => {
    if (bank === "ICICI") {
      return `ccpay.${phone}${cardInput.slice(-4)}@icici`;
    } else if (bank === "SBI") {
      return `sbicard.${cardInput}@sbi`;
    } else if ((getCardNetwork(cardInput) === "amex" || bank === "AMEX") && cardInput.length === 15) {
      return `AEBC.${cardInput}@sc`;
    } else if (bank === "AXIS") {
      return `CC.91${phone}${cardInput.slice(-4)}@axisbank`;
    } else if (bank === "IDFC") {
      return `${cardInput}.cc@idfcbank`;
    } else if (bank === "AU Bank") {
      return `AUCC.${phone}${cardInput.slice(-4)}@aubank`;
    }
    return `${phone}@${bank.toLowerCase()}`;
  };

  const handleGenerate = () => {
    setError('');
    setUpiId('');
    setShowQR(false);

    // Final validation before generating
    if (!validateMobile(mobile)) {
      setError('Please enter a valid 10-digit mobile number to continue.');
      return;
    }
    if (!validateCardNumber(card)) {
      setError('Please enter a valid card number to continue.');
      return;
    }

    const upi = generateUpiId(mobile, card, bank);
    setUpiId(upi);
  };

  const handleMobileChange = (val) => {
    if (/^\d*$/.test(val)) {
      setMobile(val);
    }
    // Clear main error when user starts typing
    if (error && error.toLowerCase().includes('mobile')) {
      setError('');
    }
  };

  const handleCardChange = (val) => {
    if (/^\d*$/.test(val)) {
      setCard(val);
    }
    // Clear main error when user starts typing
    if (error && error.toLowerCase().includes('card')) {
      setError('');
    }
  };

  // Handle card selection from saved cards
  const handleCardSelect = (savedCard) => {
    // Extract mobile number from UPI ID (if possible)
    // This is a basic extraction - you might need to adjust based on your UPI ID format
    const extractMobileFromUpiId = (upiId) => {
      // For AXIS bank format: CC.91{phone}{last4digits}@axisbank
      if (upiId.includes('@axisbank')) {
        const beforeAt = upiId.split('@')[0];
        const afterCC = beforeAt.replace('CC.91', '');
        return afterCC.slice(0, -4); // Remove last 4 digits
      }
      // For AU Bank format: AUCC.{phone}{last4digits}@aubank
      if (upiId.includes('@aubank')) {
        const beforeAt = upiId.split('@')[0];
        const afterAUCC = beforeAt.replace('AUCC.', '');
        return afterAUCC.slice(0, -4); // Remove last 4 digits
      }
      // For other formats, try to extract if it starts with phone number
      const match = upiId.match(/^(\d{10})/);
      return match ? match[1] : '';
    };

    const extractedMobile = extractMobileFromUpiId(savedCard.upiId);

    // Set the form fields
    setCard(savedCard.cardNumber);
    setUpiId(savedCard.upiId);
    setShowQR(true);

    // If we can extract mobile, set it too
    if (extractedMobile && extractedMobile.length === 10) {
      setMobile(extractedMobile);
    }

    // Clear any errors
    setError('');
    setMobileError('');
    setCardError('');
  };

  const handleUseCard = (upiId, bank) => {
    const upiUri = `upi://pay?pa=${upiId}&pn=${bank}&cu=INR`;
    console.log(`Using UPI ID: ${upiUri} for bank: ${bank}`);
    window.location.href = upiUri;
  };

  return (
    <ThemeProvider>
      <div className="app-container">
        {/* Theme Button Top Right */}
        <div className="theme-toggle">
          <ThemeToggleButton />
        </div>

        {/* Saved Cards Section - At the top */}
        <SavedCards
          currentUpiId={upiId}
          currentCard={card}
          currentBank={bank}
          onCardSelect={handleCardSelect}
        />

        {/* Disclaimer Box */}
        <div className="disclaimer">
          <p>⚠️ <strong>Disclaimer:</strong> The generated UPI IDs are based on predefined logic and may not always be valid. Please <strong>verify</strong> the UPI ID before making any transactions.</p>
          <p>🔐 <strong>Privacy First:</strong> Saved cards are stored locally in your browser storage and never sent to any server.</p>
          <p>💡 <strong>Open Source:</strong> See the project on <a href="https://github.com/DivyeshPatro/creditcard-upi-generator.git" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
        </div>

        {/* Data Input Section */}
        <div className="input-section">
          <div className="input-field">
            <label className="input-label">Enter your 10-digit mobile number</label>
            <input
              className={`input-control ${mobileError ? 'input-error' : ''}`}
              type="tel"
              value={mobile}
              onChange={(e) => handleMobileChange(e.target.value)}
              placeholder="Mobile Number goes here"
              maxLength={10}
            />
            {mobileError && (
              <div className="error-message">{mobileError}</div>
            )}
          </div>

          <div className="input-field">
            <label className="input-label">Select Bank</label>
            <select
              className="input-control bank-dropdown"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            >
              {banks.map((bankOption) => (
                <option key={bankOption} value={bankOption}>
                  {bankOption}
                </option>
              ))}
            </select>
          </div>

          <div className="input-field">
            <label className="input-label">Enter your card number</label>
            <div className="card-input-container">
              <input
                className={`input-control card-input ${cardError ? 'input-error' : ''}`}
                type="text"
                value={card}
                onChange={(e) => handleCardChange(e.target.value)}
                placeholder="Card Number goes here"
                maxLength={19}
              />
              {cardNetwork && getCardNetworkLogo(cardNetwork) && (
                <div className="card-logo">
                  <img
                    src={getCardNetworkLogo(cardNetwork)}
                    alt={cardNetwork}
                    className="card-logo-img"
                  />
                </div>
              )}
            </div>
            {cardNetwork && (
              <div className="card-network">
                Card Network: <span className="card-network-value">{cardNetwork.toUpperCase()}</span>
              </div>
            )}
            {cardError && (
              <div className="error-message">{cardError}</div>
            )}
          </div>

          {error && (
            <div className="error-message">{error}</div>
          )}
        </div>

        {/* Generate Button */}
        <button className="generate-button" onClick={handleGenerate}>
          🚀 Generate UPI ID
        </button>

        {/* UPI Result Section */}
        {upiId && (
          <div className="upi-result">
            <div className="upi-id-display">
              <div className="upi-id-container">
                {bank === "SBI" && (
                  <div className="disclaimer">
                    <p>⚠️ Note for SBI Users:</p>
                    <p>You need to enable SBI Pay (UPI) either through YONO SBI or BHIM SBI PAY.</p>
                    <p>Once enabled, your generated UPI ID will only work with YONO or BHIM SBI PAY.</p>
                    <p>SBI restricts UPI ID resolution to the app it was created with. Reference: <a href='https://www.sbicard.com/en/faq/upi.page' target="_blank" rel="noopener noreferrer">SBI card website ( Q-15 )</a></p>
                  </div>
                )}
                <div>
                  <strong>Generated UPI ID:</strong>
                </div>
                <div className="upi-box-row">
                  <div className="upi-id-box">{upiId}</div>

                  <button
                    className="copy-button"
                    onClick={copyToClipboard}
                    title={copySuccess ? "Copied!" : "Copy to clipboard"}
                  >
                    {copySuccess ? (
                      <svg
                        className="copy-icon success"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      <svg
                        className="copy-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {copySuccess && (
                <div className="copy-success-message">
                  ✅ Copied to clipboard!
                </div>
              )}
            </div>
            <QRDisplay upiId={upiId} showQR={showQR} onReveal={() => setShowQR(true)} />
            <button
              className="use-card-button"
              onClick={() => handleUseCard(upiId, bank)}
            >
              💸 Click to Pay
            </button>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}