import qrcode
from io import BytesIO

def luhn_check(card_number):
    digits = [int(d) for d in str(card_number)]
    checksum = 0
    double = False
    for d in reversed(digits):
        d = d * 2 - 9 if double and d * 2 > 9 else d * 2 if double else d
        checksum += d
        double = not double
    return checksum % 10 == 0

def get_card_network(card_number):
    if not card_number or len(card_number) < 2:
        return None
    first_two = int(card_number[:2])
    first_six = int(card_number[:6]) if len(card_number) >= 6 else 0
    if card_number[0] == '4':
        return 'visa'
    if (51 <= first_two <= 55) or (2221 <= first_six <= 2720):
        return 'mastercard'
    if first_two in [34, 37]:
        return 'amex'
    if first_two == 36:
        return 'diners'
    if first_two in [60, 65, 81, 82]:
        return 'rupay'
    return None

def generate_upi_id(phone, card_input, bank):
    if bank == "ICICI":
        return f"ccpay.{card_input}@icici"
    elif bank == "SBI":
        return f"sbicard.{card_input}@sbi"
    elif bank == "AMEX" and len(card_input) == 15:
        return f"AEBC.{card_input}@sc"
    elif bank == "AXIS":
        return f"CC.91{phone}{card_input[-4:]}@axisbank"
    elif bank == "IDFC":
        return f"{card_input}.cc@idfcbank"
    elif bank == "AU Bank":
        return f"AUCC.{phone}{card_input[-4:]}@aubank"
    return None

def generate_qr(upi_id):
    qr = qrcode.make(f"upi://pay?pa={upi_id}&pn=Test User")
    buffer = BytesIO()
    qr.save(buffer, format="PNG")
    return buffer.getvalue()