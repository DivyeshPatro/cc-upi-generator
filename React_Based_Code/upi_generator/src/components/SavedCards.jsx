import { useState, useEffect } from 'react';
import QRDisplay from './QRDisplay';

// Utility functions for localStorage
const STORAGE_KEY = 'savedCards';

const saveToStorage = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
};

const loadFromStorage = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return [];
    }
};

const SavedCards = ({ currentUpiId, currentCard, currentBank, onCardSelect }) => {
    const [savedCards, setSavedCards] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showNameInput, setShowNameInput] = useState(false);
    const [cardName, setCardName] = useState('');
    const [saveError, setSaveError] = useState('');
    const [saveSuccess, setSaveSuccess] = useState('');
    const [copySuccess, setCopySuccess] = useState({});
    const [showFullCard, setShowFullCard] = useState(false);

    // Load saved cards from localStorage on component mount
    useEffect(() => {
        loadSavedCards();
    }, []);

    const loadSavedCards = () => {
        const cards = loadFromStorage();
        setSavedCards(cards);
    };

    const saveCard = () => {
        if (!cardName.trim()) {
            setSaveError('Please enter a card name');
            return;
        }

        if (!currentUpiId || !currentCard) {
            setSaveError('No card data to save');
            return;
        }

        // Check if card already exists
        const existingCard = savedCards.find(card => card.cardNumber === currentCard);
        if (existingCard) {
            setSaveError(`Card is already saved with name: "${existingCard.name}"`);
            return;
        }

        const newCard = {
            id: Date.now().toString(),
            name: cardName.trim(),
            cardNumber: currentCard,
            upiId: currentUpiId,
            bank: currentBank,
            savedAt: new Date().toISOString()
        };

        const updatedCards = [...savedCards, newCard];

        // Save to localStorage
        if (saveToStorage(updatedCards)) {
            setSavedCards(updatedCards);
        } else {
            setSaveError('Failed to save card. Please check if your browser supports localStorage.');
            return;
        }

        setCardName('');
        setShowNameInput(false);
        setSaveError('');
        setSaveSuccess('Card saved successfully!');

        // Clear success message after 3 seconds
        setTimeout(() => setSaveSuccess(''), 3000);
    };

    const deleteCard = (cardId) => {
        if (window.confirm('Are you sure you want to delete this saved card?')) {
            const updatedCards = savedCards.filter(card => card.id !== cardId);

            if (saveToStorage(updatedCards)) {
                setSavedCards(updatedCards);
            } else {
                alert('Failed to delete card. Please try again.');
            }
        }
    };

    const clearAllCards = () => {
        if (window.confirm('Are you sure you want to delete ALL saved cards? This action cannot be undone.')) {
            if (saveToStorage([])) {
                setSavedCards([]);
            } else {
                alert('Failed to clear cards. Please try again.');
            }
        }
    };

    const handleUseCard = (upiId, bank) => {
        const upiUri = `upi://pay?pa=${upiId}&pn=${bank}&cu=INR`;
        console.log(`Using UPI ID: ${upiUri} for bank: ${bank}`);
        window.location.href = upiUri;
    };

    const toggleCardVisibility = () => {
        setShowFullCard((prev) => !prev);
    };

    const copyToClipboard = async (text, type, cardId) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopySuccess(prev => ({ ...prev, [`${cardId}-${type}`]: true }));
            setTimeout(() => {
                setCopySuccess(prev => ({ ...prev, [`${cardId}-${type}`]: false }));
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopySuccess(prev => ({ ...prev, [`${cardId}-${type}`]: true }));
            setTimeout(() => {
                setCopySuccess(prev => ({ ...prev, [`${cardId}-${type}`]: false }));
            }, 2000);
        }
    };

    const formatCardNumber = (cardNumber) => {
        return cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
    };

    const maskCardNumber = (cardNumber) => {
        if (cardNumber.length <= 4) return cardNumber;
        const lastFour = cardNumber.slice(-4);
        const masked = '*'.repeat(cardNumber.length - 4);
        return masked + lastFour;
    };

    return (
        <div className="saved-cards-section">
            {/* Save Card Button - Show when there's current UPI ID and card no. */}
            {currentUpiId && currentCard && (
                <div className="save-card-container">
                    {!showNameInput ? (
                        <button
                            className="save-card-button"
                            onClick={() => setShowNameInput(true)}
                        >
                            💾 Save Your Card
                        </button>
                    ) : (
                        <div className="save-card-form">
                            <div className="save-card-input-group">
                                <input
                                    type="text"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                    placeholder="Enter a name for this card"
                                    className="save-card-input"
                                    maxLength={50}
                                />
                                <button
                                    className="save-card-confirm"
                                    onClick={saveCard}
                                >
                                    Save
                                </button>
                                <button
                                    className="save-card-cancel"
                                    onClick={() => {
                                        setShowNameInput(false);
                                        setCardName('');
                                        setSaveError('');
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                            {saveError && (
                                <div className="save-error-message">{saveError}</div>
                            )}
                        </div>
                    )}
                    {saveSuccess && (
                        <div className="save-success-message">{saveSuccess}</div>
                    )}
                </div>
            )}

            {/* Saved Cards Section */}
            {savedCards.length > 0 && (
                <div className="saved-cards-expandable">
                    <div
                        className="saved-cards-header"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <h3>Your Saved Cards ({savedCards.length})</h3>
                        <div className="header-actions">
                            {savedCards.length > 0 && (
                                <button
                                    className="clear-all-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        clearAllCards();
                                    }}
                                    title="Clear all saved cards"
                                >
                                    🗑️ Clear All
                                </button>
                            )}
                            <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
                                ▼
                            </span>
                        </div>
                    </div>

                    {isExpanded && (
                        <div className="saved-cards-content">
                            {savedCards.map((card) => (
                                <div key={card.id} className="saved-card-item">
                                    <div className="saved-card-header">
                                        <div className="saved-card-name">{card.name}</div>
                                        <button
                                            className="delete-card-button"
                                            onClick={() => deleteCard(card.id)}
                                            title="Delete this card"
                                        >
                                            🗑️
                                        </button>
                                    </div>

                                    <div className="saved-card-details">
                                        <div className="saved-card-field">
                                            <label>Card Number:</label>
                                            <div className="saved-card-value">
                                                {showFullCard
                                                    ? formatCardNumber(card.cardNumber)
                                                    : formatCardNumber(maskCardNumber(card.cardNumber))}

                                                {/* Toggle Eye / Eye-off Icon */}
                                                <button
                                                    className="eye-button"
                                                    onClick={toggleCardVisibility}
                                                    title={showFullCard ? 'Hide card number' : 'Show card number'}
                                                >
                                                    {showFullCard ? (
                                                        <svg
                                                            className="eye-icon"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="M17.94 17.94A10.05 10.05 0 0 1 12 20C7 20 2.73 15.5 1 12a19.77 19.77 0 0 1 3.17-4.73" />
                                                            <path d="M22.54 9.42A19.77 19.77 0 0 0 21 12c-1.73 3.5-6 8-11 8a10.05 10.05 0 0 1-5.94-2.06" />
                                                            <line x1="1" y1="1" x2="23" y2="23" />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            className="eye-icon"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                            <circle cx="12" cy="12" r="3" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="saved-card-field">
                                            <label>UPI ID:</label>
                                            <div className="saved-card-value">
                                                {card.upiId}
                                                <button
                                                    className="copy-button"
                                                    onClick={() => copyToClipboard(card.upiId, 'upi', card.id)}
                                                    title={copySuccess[`${card.id}-upi`] ? "Copied!" : "Copy UPI ID"}
                                                >
                                                    {copySuccess[`${card.id}-upi`] ? (
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

                                        <div className="saved-card-qr">
                                            <QRDisplay upiId={card.upiId} showQR={true} />
                                        </div>

                                        <button
                                            className="use-card-button"
                                            onClick={() => handleUseCard(card.upiId, card.bank)}
                                        >
                                            💸 Click to Pay
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SavedCards;