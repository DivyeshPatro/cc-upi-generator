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
    💡 <b>Open Source:</b> This tool is <b>completely open source</b>. You can find the project on <a href="https://github.com/DivyeshPatro/creditcard-upi-generator.git" target="_blank" style="text-decoration: underline; color: #0c5460;">GitHub</a>. Contributions are welcome! 🚀
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
            st.code(upi_id)
            show_qr_popup(upi_id)
    else:
        st.markdown(f"<div class='small-text error-msg'>❌ Invalid inputs. Please correct above or fill all the required fields.</div>", unsafe_allow_html=True)
