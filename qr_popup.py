# qr_popup.py

import qrcode
from io import BytesIO
from base64 import b64encode
import streamlit.components.v1 as components

def show_qr_popup(upi_id,bank):
    qr_img = qrcode.make(f"upi://pay?pa={upi_id}&pn={bank}&cu=INR")
    buffer = BytesIO()
    qr_img.save(buffer, format="PNG")
    qr_base64 = b64encode(buffer.getvalue()).decode()

    components.html(f"""
        <button onclick="document.getElementById('qrModal').style.display='block'"
            style="padding:8px 16px; border:none; border-radius:5px; background-color:#4CAF50; color:white; cursor:pointer;">
            📷 Show QR Code
        </button>

        <div id="qrModal" style="display:none; position:fixed; z-index:9999; left:0; top:0; width:50%; height:100%;
             background-color:rgba(0,0,0,0.6);">
            
            <div style="background-color:#fefefe; margin:5% auto; padding:10px; border:1px solid #888; width:300px;
                border-radius:10px; text-align:center;">
                <span onclick="document.getElementById('qrModal').style.display='none'" 
                    style="color:#aaa; float:right; font-size:28px; font-weight:bold; cursor:pointer;">&times;</span>
                
                <h4>Scan QR to open in UPI app.</h4>
                <img src="data:image/png;base64,{qr_base64}" width="200" />
                <br><br>
                <button onclick="document.getElementById('qrModal').style.display='none'"
                    style="padding:6px 14px; background-color:#dc3545; border:none; color:white; border-radius:5px; cursor:pointer;">
                    Close</button>
            </div>
        </div>
    """, height=400)
