"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Award, 
  Check, 
  CreditCard, 
  Loader2 
} from "lucide-react";
import styles from "./Workshops.module.scss";
import workshopsList from "@/data/workshops.json";

export default function WorkshopsConsole() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("schedule"); // schedule, keynotes, speaker
  
  // Registration Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    country: "🇮🇳 India",
    designation: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Payment States
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState("pay"); // pay, processing, success
  const [registeredData, setRegisteredData] = useState(null);
  const [transactionId, setTransactionId] = useState("");

  const activeWorkshop = workshopsList[activeIdx];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.designation) {
      setError("Please select a Designation");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/workshops/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          workshopId: activeWorkshop.id,
          workshopTitle: activeWorkshop.title
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to process registration");
      }

      // Generate a mock Transaction ID
      const mockTxn = "TXN" + Math.floor(10000000 + Math.random() * 90000000);
      setTransactionId(mockTxn);
      setRegisteredData(data.data || formData);
      
      // Step to Payment overlay
      setIsSubmitting(false);
      setShowPaymentModal(true);
      setPaymentStep("pay");
    } catch (e) {
      setError(e.message);
      setIsSubmitting(false);
    }
  };

  const handleMockPayment = () => {
    setPaymentStep("processing");
    setTimeout(() => {
      setPaymentStep("success");
    }, 2000);
  };

  const handleCloseSuccess = () => {
    setShowPaymentModal(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      interest: "",
      country: "🇮🇳 India",
      designation: ""
    });
    setPaymentStep("pay");
  };

  return (
    <>
      {/* Showcase split layout */}
      <div className="row g-4 g-lg-5">
        {/* Left Column Selector */}
        <div className="col-12 col-lg-4">
          <div className={styles.selectorCol}>
            {workshopsList.map((w, idx) => (
              <div
                key={w.id}
                onClick={() => {
                  setActiveIdx(idx);
                  setActiveTab("schedule");
                }}
                className={`${styles.selectorItem} ${activeIdx === idx ? styles.active : ""}`}
              >
                <span className={styles.catBadge}>{w.category}</span>
                <h3>{w.title}</h3>
                <div className={styles.metaRow}>
                  <div className={styles.date}>
                    <Calendar size={12} />
                    <span>{w.date}</span>
                  </div>
                  <span className={styles.price}>{w.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Console Showcase */}
        <div className="col-12 col-lg-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={styles.consoleCard}
            >
              {/* Showcase Banner Cover */}
              <div className={styles.bannerImage}>
                <img src={activeWorkshop.image} alt={activeWorkshop.title} />
                <div className={styles.accentOverlay} />
                <div className={styles.bannerMeta}>
                  <h2>{activeWorkshop.title}</h2>
                  <div className={styles.pricingBadge}>
                    <span className={styles.current}>{activeWorkshop.price}</span>
                    <span className={styles.original}>{activeWorkshop.originalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Body Details */}
              <div className={styles.detailsBody}>
                {/* Grid Quick Meta */}
                <div className={styles.infoGrid}>
                  <div className={styles.gridItem}>
                    <Calendar size={16} />
                    <span>{activeWorkshop.date}</span>
                  </div>
                  <div className={styles.gridItem}>
                    <Clock size={16} />
                    <span>{activeWorkshop.time}</span>
                  </div>
                  <div className={styles.gridItem}>
                    <MapPin size={16} />
                    <span>{activeWorkshop.location}</span>
                  </div>
                </div>

                <p className={styles.introDesc}>{activeWorkshop.subtitle}</p>

                {/* Tabs Nav */}
                <div className={styles.tabNav}>
                  <button 
                    onClick={() => setActiveTab("schedule")}
                    className={`${styles.tabBtn} ${activeTab === "schedule" ? styles.active : ""}`}
                  >
                    Event Schedule
                  </button>
                  <button 
                    onClick={() => setActiveTab("keynotes")}
                    className={`${styles.tabBtn} ${activeTab === "keynotes" ? styles.active : ""}`}
                  >
                    Key Takeaways
                  </button>
                  <button 
                    onClick={() => setActiveTab("speaker")}
                    className={`${styles.tabBtn} ${activeTab === "speaker" ? styles.active : ""}`}
                  >
                    Lead Speaker
                  </button>
                </div>

                {/* Tab Panes */}
                <div className={styles.tabPane}>
                  {activeTab === "schedule" && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className={styles.timeline}
                    >
                      {activeWorkshop.schedule.map((slot, i) => (
                        <div key={i} className={styles.timelineNode}>
                          <span className={styles.nodeTime}>{slot.time}</span>
                          <span className={styles.nodeDesc}>{slot.activity}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === "keynotes" && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className={styles.keynoteList}
                    >
                      {activeWorkshop.keynotes.map((point, i) => (
                        <div key={i} className={styles.keynoteItem}>
                          <Award size={16} />
                          <span>{point}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === "speaker" && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className={styles.speakerBox}
                    >
                      <div className={styles.speakerPhoto}>
                        <img src={activeWorkshop.speaker.image} alt={activeWorkshop.speaker.name} />
                      </div>
                      <div className={styles.speakerMeta}>
                        <h3>{activeWorkshop.speaker.name}</h3>
                        <div className={styles.title}>{activeWorkshop.speaker.designation}</div>
                        <div className={styles.creds}>{activeWorkshop.speaker.credentials}</div>
                        <p className={styles.bio}>{activeWorkshop.speaker.bio}</p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Registration Form Block */}
                <div className={styles.registrationBlock}>
                  <h3>Secure Your Spot</h3>
                  <p>Register for a premium seat today. Complete the registration form to proceed with payment validation.</p>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm mb-6">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit} className={styles.glossyForm}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Tanishq Shrivastava"
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="phone">Phone No.</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 99999 99999"
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. yourname@domain.com"
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="interest">Interest</label>
                      <input
                        type="text"
                        id="interest"
                        name="interest"
                        required
                        value={formData.interest}
                        onChange={handleInputChange}
                        placeholder="e.g. AutoCAD drafting, UI/UX"
                      />
                    </div>

                    <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                      <label htmlFor="country">Country</label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="🇮🇳 India">🇮🇳 &nbsp; India</option>
                        <option value="🇺🇸 United States">🇺🇸 &nbsp; United States</option>
                        <option value="🇬🇧 United Kingdom">🇬🇧 &nbsp; United Kingdom</option>
                        <option value="🇦🇪 United Arab Emirates">🇦🇪 &nbsp; United Arab Emirates</option>
                        <option value="🇨🇦 Canada">🇨🇦 &nbsp; Canada</option>
                        <option value="🇸🇬 Singapore">🇸🇬 &nbsp; Singapore</option>
                        <option value="🇦🇺 Australia">🇦🇺 &nbsp; Australia</option>
                        <option value="🇩🇪 Germany">🇩🇪 &nbsp; Germany</option>
                      </select>
                    </div>

                    <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                      <label htmlFor="designation">Designation</label>
                      <select
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="" disabled>Select your Designation</option>
                        <option value="Student">Student</option>
                        <option value="Architect">Architect</option>
                        <option value="Interior Designer">Interior Designer</option>
                        <option value="Civil Engineer">Civil Engineer</option>
                        <option value="Working Professional">Working Professional</option>
                        <option value="Freelancer">Freelancer</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`${styles.submitBtn} ${styles.fullWidth}`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          <span>PROCESSING REGISTRATION...</span>
                        </>
                      ) : (
                        <>
                          <span>REGISTER EVENT & DOWNLOAD A SHEET</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mock Razorpay Payment Modal Overlay */}
      {showPaymentModal && (
        <div className={styles.paymentModalOverlay}>
          <div className={styles.paymentModal}>
            
            {paymentStep === "pay" && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col h-full"
              >
                <div className={styles.rzpHeader}>
                  <div className={styles.rzpLogo}>
                    Razor<span>pay</span>
                  </div>
                  <span className={styles.rzpSecured}>
                    Secured Checkout
                  </span>
                </div>

                <div className={styles.rzpAmountBlock}>
                  <div className={styles.rzpFor}>Registration Fee for</div>
                  <div className={styles.rzpTitle}>{activeWorkshop.title}</div>
                  <div className={styles.rzpPrice}>{activeWorkshop.price}</div>
                </div>

                <div className={styles.rzpForm}>
                  <div className="flex flex-col gap-4">
                    <div className={styles.inputGroup}>
                      <label>Dummy Card Details</label>
                      <input
                        type="text"
                        disabled
                        value="4111 •••• •••• 1111"
                        className="bg-black/40 border-white/5 text-gray-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className={styles.inputGroup}>
                        <label>Expiry Date</label>
                        <input
                          type="text"
                          disabled
                          value="12 / 29"
                          className="bg-black/40 border-white/5 text-gray-400 text-center"
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label>CVV</label>
                        <input
                          type="password"
                          disabled
                          value="•••"
                          className="bg-black/40 border-white/5 text-gray-400 text-center"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleMockPayment}
                    className={styles.rzpPayBtn}
                  >
                    <CreditCard size={18} />
                    <span>Complete Payment ({activeWorkshop.price})</span>
                  </button>

                  <button 
                    onClick={() => setShowPaymentModal(false)}
                    className={styles.rzpCancelBtn}
                  >
                    Cancel Transaction
                  </button>
                </div>
              </motion.div>
            )}

            {paymentStep === "processing" && (
              <div className="flex flex-col items-center justify-center py-20 px-8 text-center min-h-[400px]">
                <Loader2 className="animate-spin text-blue-500 mb-6" size={48} />
                <h3 className="text-xl font-bold mb-2" style={{ color: "var(--fg)" }}>Processing Transaction</h3>
                <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                  Please do not close this window or click back. We are validating your payment details with Razorpay servers...
                </p>
              </div>
            )}

            {paymentStep === "success" && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={styles.receiptState}
              >
                <div className={styles.successCircle}>
                  <Check size={36} />
                </div>
                <h3>Seat Confirmed!</h3>
                <p className={styles.successMessage}>
                  Your payment has been successfully captured by Razorpay. An entry ticket and workshop manual have been sent to your email.
                </p>

                <div className={styles.receiptCard}>
                  <div className={styles.receiptRow}>
                    <span className={styles.label}>Attendee Name</span>
                    <span className={styles.value}>{registeredData?.name}</span>
                  </div>
                  <div className={styles.receiptRow}>
                    <span className={styles.label}>Workshop</span>
                    <span className={styles.value}>{activeWorkshop.title.split("Masterclass")[0]}</span>
                  </div>
                  <div className={styles.receiptRow}>
                    <span className={styles.label}>Amount Paid</span>
                    <span className={`${styles.value} ${styles.highlight}`}>{activeWorkshop.price}</span>
                  </div>
                  <div className={styles.receiptRow}>
                    <span className={styles.label}>Transaction ID</span>
                    <span className="font-mono text-xs text-gray-300">{transactionId}</span>
                  </div>
                  <div className={styles.receiptRow}>
                    <span className={styles.label}>Speaker</span>
                    <span className={styles.value}>{activeWorkshop.speaker.name}</span>
                  </div>
                  <div className={styles.receiptRow}>
                    <span className={styles.label}>Date / Time</span>
                    <span className={styles.value}>{activeWorkshop.date}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCloseSuccess}
                  className={styles.closeBtn}
                >
                  Close Receipt
                </button>
              </motion.div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
