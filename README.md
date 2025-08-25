# 🔗 Credit Card UPI Generator

Simplify your credit card bill payments with our smart UPI ID generator. Built using **Streamlit**.

---

## 🚀 Access the Live Tools

🔹 **Streamlit Version**  
Hosted on Streamlit Cloud – [Credit Card UPI Generator](https://cc-upi-generator.streamlit.app)

🔹 **React Version (Client-Side)**  
UPI ID gets cached on the client side (not stored on any server) – [React UPI Generator](https://divyeshpatro.github.io/cc-upi-generator/)

---

## 🛠️ Tech Stack

| Version | Tech Used |
|--------|-----------|
| 🟢 Streamlit | Python, Streamlit, Pandas |
| 🔵 React | React.js, Javascript, CSS ,HTML |

---

## 📌 Features

- 🔐 No data stored – everything runs locally
- ⚡ Fast generation of UPI IDs
- 🧠 Smart VPA patterns
- 🌗 React version caches UPI locally
- ✅ Built with privacy and simplicity in mind

---
## 🧭 Overview  
💡 Ever tried paying your **credit card bill** with just a UPI ID?  
     
Well, now you can. Most Indian banks support this — no app logins, no OTPs — just pure UPI magic.  

With this tool, you can:  
⚡ Instantly generate UPI IDs for your cards  
✅ Validate them using card + mobile logic  
📲 Scan & pay with a custom QR code  

Built for everyday credit card users who wanna **top up or pay bills instantly** — no waiting, no extra apps. Just generate a UPI ID and pay like a pro. ⚡💳

## ⚡ Why This Tool Exists

> 💭 *Why do global credit card users have more freedom than us?*

### 🌍 What The Rest of the World Gets:
- ✅ **Pay anytime** — even before bill generation
- ✅ **Multiple payments** per month
- ✅ **Instant credit limit restoration**
- ✅ **Control over credit utilization**
- ✅ **Freedom to pay when funds are available**

### What We Get With BBPS(In India):
- ❌ **Can't pay early** — forced to wait for the bill
- ❌ **Only 1 payment cycle** per month
- ❌ **No instant limit updates**
- ❌ **Rigid payment windows**
- ❌ **No control over utilization**

> 🧠 Financial planning becomes guesswork.  
> 💸 You have money but **can’t pay**.  
> 🧼 Want to keep your credit utilization clean? Nope.  
> 😤 BBPS says: *"Wait till your bill drops!"*

---

### 💡 This Tool = A Small Revolution

**Generate UPI IDs for your credit card, instantly.**  
Use it to **top up**, **stay under 30% utilization**, or just **take back control** — no more waiting on billing cycles 🔁  
It’s time we **empowered users**, not systems.



## 🚀 Features

- Generate UPI IDs based on card type and selected bank
- Supports Visa, MasterCard, AMEX, RuPay, Diners (read-only)
- Validates card number using Luhn algorithm
- Validates Indian mobile numbers
- QR code generation with popup preview
- SBI-specific UPI ID resolution note
- Mobile-friendly UI with dark/light compatibility
- VPA Validator(In Progress)
- ⚠️ Disclaimer, privacy note & GitHub open-source link


## ⚠️ Disclaimer

This tool is for **educational/demo purposes only**. The UPI IDs are generated using predefined logic and may not always be valid. Please verify before using. **We are not responsible for any losses due to invalid IDs.**

## 🔐 Privacy First

We do not store any user input like phone numbers or card details. Everything runs locally during your session.

## 🧪 Dummy Cards to Test

| Card Type   | Number             |
|-------------|--------------------|
| Visa        | 4111111111111111   |
| MasterCard  | 5555555555554444   |
| RuPay       | 6069851234567890   |
| AMEX        | 371449635398431    |


## 🐍 Stack
Streamlit   
Python  
qrcode  
phonenumbers

## 💬 Who's This For?
🧍‍♂️ Everyday Users
Tired of logging into net banking just to pay your card bill? Instantly generate a UPI ID and pay from any UPI app. No hassle.

💳 Credit Card Holders
Simplify your credit card payments with smart UPI ID generation — just enter your number and go 💨

⚙️ Fintech Tinkerers
Curious how different banks format UPI IDs for credit cards? Dive into the logic and learn by doing 💡

🛡️ Blue Teamers & Cybersec Folks
Simulate UPI logic, model threats, or run phishing tests — all in a safe, sandboxed way 🔐

🧪 Real-World Scenarios:
    🎯 Phishing Awareness Training
    Generate realistic UPI IDs + QR codes to create mock phishing messages.
    → Helps train employees to detect fake payment requests safely.

    🧠 Threat Modeling for Fintech Apps
    Use fake card/UPI data to simulate real user flows.
    → Test edge cases like spoofed UPI IDs, Luhn validation bypass, and data exposure — all without touching production systems.

    🔒 Security Testing Without Risk
    Perform red/blue team exercises without relying on real UPI infrastructure or leaking sensitive data.

## 🎯 Roadmap

- ✅ **UPI ID logic based on banks**  
  Custom logic for different banks like SBI, ICICI, AMEX, AXIS, etc.

- ✅ **QR Code popup with tooltips**  
  One-click QR generation in a smooth popup, with context-aware info.

- [ ] 🌓 **Dark/Light Theme Toggle (coming soon)**  
  Choose your vibe – light for day, dark for hacking nights.

- [ ] 📦 **Docker Support (planned)**  
  Run anywhere with a single command – no setup headaches.

- [ ] 🧪 **UPI ID Validation API (Mocked) (planned)**  
  Simulate real-world UPI validations for testing and demo purposes.


## 📸 Preview

Here’s a sneak peek of the app in action:

![Credit Card UPI Generator Preview](assets/Credit_Card_UPI_Generator_Demo.jpg)


## 🛠️ Installation

```bash
git clone https://github.com/DivyeshPatro/cc-upi-generator.git
cd cc-upi-generator
pip install -r requirements.txt
streamlit run app.py
```

## 🧪 Try It Out
Enter your 10-digit mobile number   
Add a valid credit card number   
Select your bank  
Hit "Generate UPI ID"  
💥 Boom! You'll get a custom UPI ID + QR code instantly  
📱 Mobile Support
Fully responsive. Try it on your phone or tablet.

## 🙌 Acknowledgments
Built with ❤️ by a tester who’s transitioning into cybersecurity
Inspired by everyday fintech puzzles & hacker curiosity.

## 🤝 Contribute  
Open-source project. PRs and issues are welcome!  
👉 [GitHub Repo](https://github.com/DivyeshPatro/creditcard-upi-generator.git)

## 🔚 Conclusion
This project is more than just a fun utility — it's a fusion of QA mindset, security awareness, and creative engineering. Whether you're validating UPI ID formats, learning card structures, or exploring how fintech works under the hood — this open-source tool has something for everyone.

Feel free to fork, star ⭐, or contribute 🤝 — let’s build cool stuff together!

