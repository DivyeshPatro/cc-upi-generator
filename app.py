import streamlit as st
import re
import phonenumbers
from logic import luhn_check, get_card_network, generate_upi_id
from qr_popup import show_qr_popup

# Config
st.set_page_config(page_title="Credit Card UPI Generator", page_icon="💳", layout="centered")

# Inject Styles
with open("styles.css") as f:
    st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

# UI Start
st.title("🔗 Credit Card UPI Generator")

st.markdown("""
<div style='padding: 15px; border: 1px solid #ffc107; border-radius: 5px; margin-bottom: 20px; font-size: 0.9rem;'>
    ⚠️ <b>Disclaimer:</b> The generated UPI IDs are based on predefined logic and may not always be valid. Please <b>verify</b> the UPI ID before making any transactions.<br><br>
    🔐 <b>Privacy First:</b> The credit card numbers and phone numbers entered here are <b>not stored</b> anywhere. Everything runs locally during your session.<br><br>
    💡 <b>Open Source:</b> This tool is <b>completely open source</b>. You can find the project on <a href="https://github.com/DivyeshPatro/cc-upi-generator.git" target="_blank" style="text-decoration: underline; color: #0c5460;">GitHub</a>. Contributions are welcome! 🚀
</div>
""", unsafe_allow_html=True)

# Inputs
phone = st.text_input("📱 Enter your 10-digit mobile number", max_chars=10, placeholder= "Mobile Number goes here")
valid_phone =False
valid_card = False
if phone and len(phone) == 10 and phone.isdigit():
    if phone[0] in ['6', '7', '8', '9']:
        try:
            phone_obj = phonenumbers.parse(f"+91{phone}", "IN")
            if phonenumbers.is_valid_number(phone_obj):
                st.markdown(f"<div class='small-text success-msg'>✅ {phone} is a valid Indian mobile number</div>", unsafe_allow_html=True)
                valid_phone =True
            else:
                st.markdown(f"<div class='small-text error-msg'>❌ Invalid number format.</div>", unsafe_allow_html=True)
        except:
            st.markdown(f"<div class='small-text error-msg'>❌ Invalid phone number.</div>", unsafe_allow_html=True)
    else:
        st.markdown(f"<div class='small-text error-msg'>❌ Mobile numbers in India start with 6, 7, 8, or 9.</div>", unsafe_allow_html=True)

bank = st.selectbox("🏦 Select your bank", ["ICICI", "SBI", "AMEX", "AXIS", "IDFC", "AU Bank"])

col1, col2 = st.columns([4, 1])
with col1:
    card_input = st.text_input("💳 Enter your card number", max_chars=16, placeholder="Card Number goes here")
    card_network = None
    if card_input:
        if not card_input.isdigit():
            st.markdown("<div class='small-text error-msg'>❌ Only digits allowed.</div>", unsafe_allow_html=True)
        elif not luhn_check(card_input):
            st.markdown(f"<div class='small-text error-msg'>❌ Invalid card number</div>", unsafe_allow_html=True)
        elif re.fullmatch(r"\d{14}", card_input) and card_input[:2] == "36":
            st.markdown(f"<div class='small-text error-msg'>❌ Diners Club not supported yet.</div>", unsafe_allow_html=True)
        else:    
            card_network = get_card_network(card_input)
            valid_card = True

with col2:
    st.text("")
    if card_network:
        st.image(f"logos/{card_network}.png", width=60)

# Generate Button
if st.button("🚀 Generate UPI ID"):
    # validate inputs again before generation    
    if valid_phone and valid_card:
        upi_id = generate_upi_id(phone, card_input, bank)
        if upi_id:
            st.markdown(f"<div class='small-text success-msg'>✅ UPI ID generated!</div>", unsafe_allow_html=True)
            # 👉 SBI-specific alert
            if bank == "SBI":
                st.markdown("""
                <div class='small-text' style='color:#c27c0e; background-color:#fff3cd; border:1px solid #ffeeba; padding:10px; border-radius:5px; margin-top:10px;'>
                ⚠️ <b>Note for SBI Users:</b><br>
                You need to enable <b>SBI Pay (UPI)</b> either through <b>YONO SBI</b> or <b>BHIM SBI PAY</b>.<br>
                Once enabled, your generated UPI ID will only work with <b>YONO</b> or <b>BHIM SBI PAY</b>.<br>
                <b>SBI restricts UPI ID resolution</b> to the app it was created with.
                <span style="position:relative; cursor:help;">
                    Reference: 
                    <a href="https://www.sbicard.com/en/faq/upi.page" target="_blank" style="text-decoration:underline; color:#0c5460;">
                        SBI card website  ( Q-15 )
                    </a>
                    <span style="visibility:hidden; width:200px; background-color:#333; color:#fff; text-align:left; border-radius:5px; padding:5px; position:absolute; z-index:1; bottom:120%; left:0; opacity:0; transition:opacity 0.3s;">
                        Opens the official SBI UPI FAQ page
                    </span>
                </span>
                <script>
                    const tooltip = document.querySelectorAll("span[style*='position:relative']");
                    tooltip.forEach(el => {
                    el.addEventListener("mouseover", () => {
                        el.children[1].style.visibility = "visible";
                        el.children[1].style.opacity = "1";
                    });
                    el.addEventListener("mouseout", () => {
                        el.children[1].style.visibility = "hidden";
                        el.children[1].style.opacity = "0";
                    });
                    });
                </script>
                </div>
                """, unsafe_allow_html=True)
            upi_uri = (f"upi://pay?pa={upi_id}&pn={bank}&cu=INR")
            col1, col2 = st.columns([3, 1])
            with col1:
                st.code(upi_id)
            with col2:
                st.markdown(
                    f"""
                    <a href="{upi_uri}" target="_blank">
                        <button style="
                            padding: 4px 14px;
                            border: none;
                            border-radius: 4px;
                            background-color: #ad8748;
                            color: white;
                            cursor: pointer;
                        ">💸 Click to Pay</button>
                    </a>
                    """,
                    unsafe_allow_html=True
                )
                st.markdown(
                    "<div style='font-size: 12px; color: grey; margin-top: 4px;'>⚠️ Works only on smartphone with UPI apps installed.</div>",
                    unsafe_allow_html=True
                )
            show_qr_popup(upi_id,bank)
    else:
        st.markdown(f"<div class='small-text error-msg'>❌ Invalid inputs. Please correct above or fill all the required fields.</div>", unsafe_allow_html=True)
