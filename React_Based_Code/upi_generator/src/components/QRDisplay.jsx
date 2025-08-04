import { QRCodeCanvas } from "qrcode.react";

export default function QRDisplay({ upiId, showQR, onReveal }) {
    return (
        <div className="qr-container">
            {/* QR Code Layer */}
            <div className={`qr-code ${showQR ? '' : 'blurred'}`}>
                <QRCodeCanvas
                    value={`upi://pay?pa=${upiId}&pn=GeneratedUser`}
                    size={208}
                    style={{ borderRadius: '0.5rem' }}
                />
            </div>

            {/* Button Overlay */}
            {!showQR && (
                <div className="qr-reveal-button">
                    <button
                        onClick={onReveal}
                        className="reveal-btn"
                    >
                        Show QR Code
                    </button>
                </div>
            )}
        </div>
    );
}