import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Pet, PaymentMethod, PaymentTransaction } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet?: Pet | null;
  purpose?: 'Adoption Fee' | 'Shelter Sponsorship' | 'Ad Promotion Boost' | 'General Donation';
  defaultAmount?: number;
  onPaymentSuccess: (transaction: PaymentTransaction) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  pet,
  purpose = 'Adoption Fee' as 'Adoption Fee' | 'Shelter Sponsorship' | 'Ad Promotion Boost' | 'General Donation',
  defaultAmount = 1500,
  onPaymentSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('esewa');
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [payerName, setPayerName] = useState('');
  const [payerPhone, setPayerPhone] = useState('');
  const [payerEmail, setPayerEmail] = useState('');
  const [esewaId, setEsewaId] = useState('');
  const [khaltiId, setKhaltiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedTx, setCompletedTx] = useState<PaymentTransaction | null>(null);

  if (!isOpen) return null;

  const currentAmount = customAmount ? parseFloat(customAmount) || amount : amount;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff8c61', '#8bf1e6', '#9e421d', '#60bb46', '#5c2d91'],
      });
    } catch (e) {
      console.log('Confetti trigger', e);
    }
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const txRef = `NPR-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

    setTimeout(() => {
      setIsProcessing(false);
      const newTx: PaymentTransaction = {
        id: `tx-${Date.now()}`,
        petId: pet?.id,
        petName: pet?.name || 'PetConnect Community',
        amount: currentAmount,
        currency: 'NPR',
        purpose,
        paymentMethod: selectedMethod,
        payerName: payerName.trim() || 'Aarav Sharma',
        payerPhone: payerPhone.trim() || '+977 984-1234567',
        payerEmail: payerEmail.trim() || 'adopter@nepal.org',
        status: 'Completed',
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        transactionRef: txRef,
      };

      setCompletedTx(newTx);
      onPaymentSuccess(newTx);
      triggerConfetti();
    }, 1400);
  };

  const handleResetAndClose = () => {
    setCompletedTx(null);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white rounded-[32px] max-w-xl w-full p-6 md:p-8 ambient-shadow-lg relative max-h-[90vh] overflow-y-auto border border-[#dde9ff]"
      >
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 text-[#56423c] hover:text-[#0d1c2f] p-2 rounded-full hover:bg-[#eff4ff] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        {completedTx ? (
          /* Payment Success & Digital Receipt State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center gap-5 pt-2"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-[#8bf1e6] text-[#006f67] flex items-center justify-center shadow-lg"
            >
              <span className="material-symbols-outlined text-[42px]">check_circle</span>
            </motion.div>

            <div>
              <h2 className="font-['Quicksand'] text-[26px] font-bold text-[#0d1c2f]">
                Payment Successful!
              </h2>
              <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#56423c] mt-1">
                Thank you for supporting animal welfare and rescue in Nepal.
              </p>
            </div>

            {/* Official Digital Invoice Slip */}
            <div className="w-full bg-[#f8f9ff] rounded-[24px] p-6 border border-[#dde9ff] text-left flex flex-col gap-3.5">
              <div className="flex justify-between items-center pb-3 border-b border-[#dde9ff]">
                <div>
                  <span className="text-[11px] font-bold font-['Plus_Jakarta_Sans'] uppercase tracking-wider text-[#56423c]">
                    Transaction Ref
                  </span>
                  <p className="font-mono text-[14px] font-bold text-[#0d1c2f]">
                    {completedTx.transactionRef}
                  </p>
                </div>
                <span className="bg-[#8bf1e6] text-[#006f67] text-[12px] font-bold px-3 py-1 rounded-full uppercase">
                  PAID (NEPAL)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[13px] font-['Plus_Jakarta_Sans']">
                <div>
                  <span className="text-[#56423c] block">Purpose</span>
                  <span className="font-bold text-[#0d1c2f]">{completedTx.purpose}</span>
                </div>
                <div>
                  <span className="text-[#56423c] block">Associated Pet / Cause</span>
                  <span className="font-bold text-[#0d1c2f]">{completedTx.petName}</span>
                </div>
                <div>
                  <span className="text-[#56423c] block">Paid by</span>
                  <span className="font-bold text-[#0d1c2f]">{completedTx.payerName}</span>
                </div>
                <div>
                  <span className="text-[#56423c] block">Payment Gateway</span>
                  <span className="font-bold text-[#0d1c2f] uppercase">{completedTx.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-[#56423c] block">Date & Time</span>
                  <span className="font-medium text-[#0d1c2f]">{completedTx.date}</span>
                </div>
                <div>
                  <span className="text-[#56423c] block">Total Amount</span>
                  <span className="font-bold text-[16px] text-[#9e421d]">
                    NPR {completedTx.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 w-full mt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-[#eff4ff] hover:bg-[#dde9ff] text-[#0d1c2f] font-['Plus_Jakarta_Sans'] font-semibold text-[14px] rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                Print / Save Slip
              </button>
              <button
                onClick={handleResetAndClose}
                className="flex-1 py-3 bg-[#9e421d] hover:bg-[#7e2b07] text-white font-['Plus_Jakarta_Sans'] font-semibold text-[14px] rounded-full transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </motion.div>
        ) : (
          /* Payment Setup Form */
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#ff8c61]/30 flex items-center justify-center text-[#9e421d]">
                <span className="material-symbols-outlined text-[28px]">payments</span>
              </div>
              <div>
                <h2 className="font-['Quicksand'] text-[24px] font-bold text-[#0d1c2f]">
                  {purpose}
                </h2>
                <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#56423c]">
                  {pet ? `For ${pet.name} (${pet.shelterName || 'Kathmandu Rescue'})` : 'PetConnect Animal Fund Nepal'}
                </p>
              </div>
            </div>

            {/* Select Gateway */}
            <div className="flex flex-col gap-2">
              <label className="font-['Plus_Jakarta_Sans'] font-bold text-[13px] text-[#0d1c2f] uppercase tracking-wider">
                Select Payment Method
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* eSewa */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('esewa')}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
                    selectedMethod === 'esewa'
                      ? 'border-[#60bb46] bg-[#60bb46]/10 ring-2 ring-[#60bb46]/30'
                      : 'border-[#dde9ff] hover:bg-[#f8f9ff]'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-[#60bb46] text-white flex items-center justify-center text-[10px] font-black">
                    e
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-[13px] text-[#0d1c2f]">
                    eSewa
                  </span>
                </button>

                {/* Khalti */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('khalti')}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
                    selectedMethod === 'khalti'
                      ? 'border-[#5c2d91] bg-[#5c2d91]/10 ring-2 ring-[#5c2d91]/30'
                      : 'border-[#dde9ff] hover:bg-[#f8f9ff]'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-[#5c2d91] text-white flex items-center justify-center text-[10px] font-black">
                    K
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-[13px] text-[#0d1c2f]">
                    Khalti
                  </span>
                </button>

                {/* Fonepay QR */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('fonepay')}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
                    selectedMethod === 'fonepay'
                      ? 'border-[#d0021b] bg-[#d0021b]/10 ring-2 ring-[#d0021b]/30'
                      : 'border-[#dde9ff] hover:bg-[#f8f9ff]'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-[#d0021b] text-white flex items-center justify-center text-[10px] font-black">
                    QR
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-[13px] text-[#0d1c2f]">
                    Fonepay
                  </span>
                </button>

                {/* Card */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('card')}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
                    selectedMethod === 'card'
                      ? 'border-[#9e421d] bg-[#9e421d]/10 ring-2 ring-[#9e421d]/30'
                      : 'border-[#dde9ff] hover:bg-[#f8f9ff]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] text-[#9e421d]">
                    credit_card
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-[13px] text-[#0d1c2f]">
                    Cards
                  </span>
                </button>
              </div>
            </div>

            <form onSubmit={handleProcessPayment} className="flex flex-col gap-4">
              {/* Amount Selection */}
              <div className="flex flex-col gap-2">
                <label className="font-['Plus_Jakarta_Sans'] font-bold text-[13px] text-[#0d1c2f] uppercase tracking-wider">
                  Amount (NPR)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[500, 1500, 3000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => {
                        setAmount(val);
                        setCustomAmount('');
                      }}
                      className={`py-2.5 rounded-xl border text-[14px] font-['Plus_Jakarta_Sans'] font-bold transition-all cursor-pointer ${
                        amount === val && !customAmount
                          ? 'bg-[#9e421d] text-white border-[#9e421d]'
                          : 'bg-[#f8f9ff] text-[#0d1c2f] border-[#ddc1b7]'
                      }`}
                    >
                      NPR {val.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="relative mt-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] font-bold text-[#56423c]">
                    Custom NPR:
                  </span>
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full pl-28 pr-4 py-2.5 bg-[#f8f9ff] border border-[#ddc1b7] rounded-xl text-[14px] focus:outline-none focus:border-[#9e421d]"
                  />
                </div>
              </div>

              {/* Gateway-specific inputs */}
              {selectedMethod === 'esewa' && (
                <div className="bg-[#60bb46]/10 p-4 rounded-2xl border border-[#60bb46]/30 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-[#2e7d32] font-bold text-[14px]">
                    <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                    eSewa ID / Registered Mobile
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="9841XXXXXX / eSewa Email"
                    value={esewaId}
                    onChange={(e) => setEsewaId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#60bb46]/50 rounded-xl text-[14px] focus:outline-none"
                  />
                </div>
              )}

              {selectedMethod === 'khalti' && (
                <div className="bg-[#5c2d91]/10 p-4 rounded-2xl border border-[#5c2d91]/30 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-[#5c2d91] font-bold text-[14px]">
                    <span className="material-symbols-outlined text-[18px]">phone_android</span>
                    Khalti Registered Mobile Number
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="9801XXXXXX"
                    value={khaltiId}
                    onChange={(e) => setKhaltiId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#5c2d91]/50 rounded-xl text-[14px] focus:outline-none"
                  />
                </div>
              )}

              {selectedMethod === 'fonepay' && (
                <div className="bg-[#d0021b]/5 p-5 rounded-2xl border border-[#d0021b]/30 flex flex-col items-center text-center gap-3">
                  <span className="font-['Plus_Jakarta_Sans'] text-[13px] font-bold text-[#d0021b]">
                    Scan Fonepay QR with Any Nepali Mobile Banking App
                  </span>
                  {/* Dynamic QR Box with Scanning Radar line */}
                  <div className="w-44 h-44 bg-white p-2.5 rounded-2xl border border-[#dde9ff] shadow-sm flex items-center justify-center relative overflow-hidden">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=fonepay://petconnect.nepal/pay?amount=1500"
                      alt="Fonepay QR Code"
                      className="w-full h-full object-contain"
                    />
                    {/* Animated scanning radar beam */}
                    <motion.div
                      animate={{ y: [-70, 70, -70] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-x-0 h-0.5 bg-[#d0021b] shadow-[0_0_8px_#d0021b]"
                    />
                  </div>
                  <p className="text-[12px] text-[#56423c]">
                    Supports Nabil, Global IME, NIC Asia, Everest Bank, Sanima, and 50+ partner banks.
                  </p>
                </div>
              )}

              {selectedMethod === 'card' && (
                <div className="bg-[#f8f9ff] p-4 rounded-2xl border border-[#dde9ff] flex flex-col gap-3">
                  <div>
                    <label className="font-['Plus_Jakarta_Sans'] text-[12px] font-bold text-[#56423c] block mb-1">
                      Card Number (Visa / Mastercard / SCT)
                    </label>
                    <input
                      type="text"
                      placeholder="4123 4567 8901 2345"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#ddc1b7] rounded-xl text-[14px] focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-['Plus_Jakarta_Sans'] text-[12px] font-bold text-[#56423c] block mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        placeholder="12/28"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#ddc1b7] rounded-xl text-[14px] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-['Plus_Jakarta_Sans'] text-[12px] font-bold text-[#56423c] block mb-1">
                        CVC
                      </label>
                      <input
                        type="password"
                        placeholder="•••"
                        required
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#ddc1b7] rounded-xl text-[14px] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Payer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-['Plus_Jakarta_Sans'] text-[12px] font-bold text-[#56423c] block mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suman Shrestha"
                    value={payerName}
                    onChange={(e) => setPayerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#ddc1b7] rounded-xl text-[14px] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-['Plus_Jakarta_Sans'] text-[12px] font-bold text-[#56423c] block mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+977 98XXXXXXXX"
                    value={payerPhone}
                    onChange={(e) => setPayerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#ddc1b7] rounded-xl text-[14px] focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Pay Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#9e421d] hover:bg-[#7e2b07] disabled:bg-[#9e421d]/60 text-white font-['Plus_Jakarta_Sans'] font-bold text-[16px] rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isProcessing ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting to {selectedMethod.toUpperCase()} Gateway...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                    Pay NPR {currentAmount.toLocaleString()} via {selectedMethod.toUpperCase()}
                  </>
                )}
              </motion.button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};
