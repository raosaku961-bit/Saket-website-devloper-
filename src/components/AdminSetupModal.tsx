import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Smartphone,
  CheckCircle,
  AlertTriangle,
  Play,
  Database,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { InquiryRecord } from '../types';

interface AdminSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSetupModal: React.FC<AdminSetupModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'hindi_guide' | 'inquiries' | 'test_email'>('hindi_guide');
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    if (isOpen && activeTab === 'inquiries') {
      fetchInquiries();
    }
  }, [isOpen, activeTab]);

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      setInquiries(data.inquiries || []);
    } catch {
      // ignore
    } finally {
      setLoadingInquiries(false);
    }
  };

  const runTestEmail = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/inquiry/test', { method: 'POST' });
      const data = await res.json();
      setTestResult(data);
    } catch {
      setTestResult({
        success: false,
        message: 'Could not connect to backend server. Make sure the server is running.',
      });
    } finally {
      setTesting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0c1222] border border-cyan-500/40 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#080d1a]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
              SWD
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>साकेत के लिए गाइड (Owner Control & Hindi Guide)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Saket Web Developer • Phone-Friendly Setup Instructions
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 px-6 bg-[#0a0f1d] gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('hindi_guide')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'hindi_guide'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            📖 5-स्टेप सेटअप गाइड (हिंदी)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('test_email')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'test_email'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            ✉️ ईमेल टेस्ट (Test Delivery)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inquiries')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'inquiries'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            📋 सुरक्षित इन्क्वायरी लॉग ({inquiries.length})
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-sm leading-relaxed">
          {/* TAB 1: Complete Hindi Guide */}
          {activeTab === 'hindi_guide' && (
            <div className="space-y-6">
              {/* Introduction Box */}
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200">
                नमस्ते <strong>साकेत जी</strong>! आपकी प्रीमियम वेबसाइट पूरी तरह तैयार है। इसमें 3D Three.js सीन, सभी 6 डेमो प्रोजेक्ट्स, व्हाट्सएप्प इंटीग्रेशन और कांटेक्ट फॉर्म तैयार है। नीचे आसान 5 स्टेप्स में समझें कि इसे अपने एंड्रॉइड फोन से कैसे मैनेज और पब्लिश करें:
              </div>

              {/* Step 1: Preview */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-xs">
                    1
                  </span>
                  <span>वेबसाइट का लाइव प्रीव्यू कैसे देखें?</span>
                </div>
                <p className="text-xs text-slate-300 mb-2">
                  - ऊपर या साइड में दिए गए <strong>Preview</strong> टैब पर क्लिक करें।
                </p>
                <p className="text-xs text-slate-300">
                  - अपने मोबाइल पर इस लिंक को खोलकर स्क्रोल करें, 3D कोर को अपनी उंगली से घुमाकर देखें, और बटन दबाकर चेक करें।
                </p>
              </div>

              {/* Step 2: Contact Details */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-2">
                  <span className="w-6 h-6 rounded-full bg-purple-950 border border-purple-500/40 flex items-center justify-center text-xs">
                    2
                  </span>
                  <span>अपनी संपर्क जानकारी (Contact Details) कैसे बदलें?</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <p>वेबसाइट पर वर्तमान में आपकी ये डिटेल्स सेट हैं:</p>
                  <p className="font-mono text-emerald-300">• ईमेल: raosaku961@gmail.com</p>
                  <p className="font-mono text-emerald-300">• व्हाट्सएप्प: +91 9219523899</p>
                  <p className="mt-2 text-slate-400">
                    यदि आपको कभी फोन नंबर या ईमेल बदलना हो, तो <code>server.ts</code>, <code>src/components/ContactSection.tsx</code> और <code>src/components/Footer.tsx</code> में जाकर केवल नंबर या ईमेल बदल सकते हैं।
                  </p>
                </div>
              </div>

              {/* Step 3: Google App Password Setup */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-xs">
                    3
                  </span>
                  <span>कांटेक्ट फॉर्म से अपनी जीमेल पर ईमेल पाने का तरीका (Google App Password)</span>
                </div>
                <div className="text-xs text-slate-300 space-y-2">
                  <p>
                    गूगल अब सुरक्षा कारणों से आपके साधारण पासवर्ड से ईमेल भेजने की अनुमति नहीं देता। इसके लिए आपको अपने एंड्रॉइड फोन से सिर्फ 2 मिनट में एक <strong>16-अक्षरों का Google App Password</strong> बनाना होगा:
                  </p>
                  <ol className="list-decimal pl-5 space-y-1.5 text-slate-200">
                    <li>
                      अपने फोन में Chrome खोलें और जाएं:{' '}
                      <a
                        href="https://myaccount.google.com/security"
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 underline font-mono"
                      >
                        myaccount.google.com/security
                      </a>
                    </li>
                    <li>
                      <strong>2-Step Verification</strong> ऑन (चालू) होना चाहिए।
                    </li>
                    <li>
                      सर्च बार में लिखें <strong>"App passwords"</strong> (या सीधे खोलें:{' '}
                      <span className="text-cyan-300 font-mono">myaccount.google.com/apppasswords</span>
                      )
                    </li>
                    <li>
                      ऐप के नाम में लिखें: <strong>SaketWebsite</strong> और <strong>Create</strong> दबाएं।
                    </li>
                    <li>
                      गूगल आपको 16 अक्षरों का एक कोड देगा (जैसे: <code>abcd efgh ijkl mnop</code>)।
                    </li>
                    <li>
                      उसे कॉपी करके अपने <code>.env</code> फाइल में{' '}
                      <code>GMAIL_APP_PASSWORD="abcdefghijklmnop"</code> में पेस्ट कर दें।
                    </li>
                  </ol>
                  <div className="p-2.5 rounded bg-amber-950/40 border border-amber-600/40 text-amber-200 text-[11px]">
                    नोट: जब तक आप यह ऐप पासवर्ड नहीं डालते, तब तक कोई भी क्लाइंट इन्क्वायरी खोएगी नहीं! सर्वर उसे आपके इस डैशबोर्ड (Inquiry Log) में सुरक्षित सेव करता रहेगा और क्लाइंट को डायरेक्ट व्हाट्सएप्प का बटन भी देगा!
                  </div>
                </div>
              </div>

              {/* Step 4: Testing Form */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-2">
                  <span className="w-6 h-6 rounded-full bg-blue-950 border border-blue-500/40 flex items-center justify-center text-xs">
                    4
                  </span>
                  <span>फॉर्म सबमिशन की टेस्टिंग कैसे करें?</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <p>1. वेबसाइट के <strong>Contact Form</strong> पर जाएं।</p>
                  <p>2. अपना नाम, ईमेल, कोई भी सर्विस और प्रोजेक्ट डिटेल्स लिखें।</p>
                  <p>3. <strong>"Send Project Inquiry"</strong> बटन दबाएं।</p>
                  <p>4. यदि ईमेल कन्फिगर है, तो आपको तुरंत अपनी जीमेल (raosaku961@gmail.com) पर नोटिफिकेशन आ जाएगा!</p>
                </div>
              </div>

              {/* Step 5: Render.com Deployment & Download ZIP */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                  <span className="w-6 h-6 rounded-full bg-amber-950 border border-amber-500/40 flex items-center justify-center text-xs">
                    5
                  </span>
                  <span>Render.com पर फ्री में वेबसाइट डिप्लॉय कैसे करें?</span>
                </div>
                <div className="text-xs text-slate-300 space-y-3">
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-200">
                    <div className="font-bold mb-1 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      प्रोजेक्ट Render.com के लिए पूरी तरह कॉन्फ़िगर हो चुका है!
                    </div>
                    <p>Build Command: <code className="bg-emerald-900/60 px-1 py-0.5 rounded">npm install && npm run build</code></p>
                    <p className="mt-1">Start Command: <code className="bg-emerald-900/60 px-1 py-0.5 rounded">npm start</code></p>
                  </div>

                  <p className="font-semibold text-white">Render.com पर लाइव करने के 4 आसान स्टेप्स:</p>
                  <ol className="list-decimal pl-5 space-y-1.5 text-slate-200">
                    <li>नीचे दिए गए बटन से अपने प्रोजेक्ट की <strong>ZIP फाइल</strong> फोन में डाउनलोड करें।</li>
                    <li>अपने GitHub अकाउंट (github.com) पर एक नई रिपॉजिटरी (Repository) बनाकर यह फाइल्स अपलोड कर दें।</li>
                    <li><a href="https://render.com" target="_blank" rel="noreferrer" className="text-cyan-400 underline font-semibold">Render.com</a> पर फ्री अकाउंट बनाकर <strong>"New Web Service"</strong> चुनें और अपने GitHub को कनेक्ट करें।</li>
                    <li>Environment Variables सेक्शन में <code>GMAIL_APP_PASSWORD</code> = <code>zsxmyvkhghyqluqp</code> और <code>BUSINESS_EMAIL</code> = <code>raosaku961@gmail.com</code> जोड़ें।</li>
                  </ol>

                  {/* 1-Tap Download ZIP Button */}
                  <div className="pt-2">
                    <a
                      href="/api/download-zip"
                      download="saket-web-developer.zip"
                      className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <span>📥 Download Complete Project ZIP (प्रोजेक्ट ज़िप डाउनलोड करें)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Test Email Delivery */}
          {activeTab === 'test_email' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <h4 className="text-white font-bold text-sm mb-1">
                  ईमेल कनेक्शन टेस्ट करें (Test Gmail Delivery)
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  यह टेस्ट बटन <code>raosaku961@gmail.com</code> पर एक टेस्ट ईमेल भेजने का प्रयास करेगा।
                </p>

                <button
                  type="button"
                  onClick={runTestEmail}
                  disabled={testing}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {testing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sending Test Email to raosaku961@gmail.com...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Send Test Email Now</span>
                    </>
                  )}
                </button>

                {testResult && (
                  <div
                    className={`mt-4 p-4 rounded-xl text-xs border ${
                      testResult.success
                        ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-600 text-rose-200'
                    }`}
                  >
                    <div className="font-bold mb-1">
                      {testResult.success ? 'Success! ईमेल भेजा गया' : 'Setup Required (सेटअप आवश्यक)'}
                    </div>
                    <p>{testResult.message}</p>
                    {!testResult.success && (
                      <p className="mt-2 text-slate-300">
                        कृप्या अपनी <code>.env</code> फाइल में <code>GMAIL_APP_PASSWORD</code> दर्ज करें। ऊपर दिए गए "5-स्टेप सेटअप गाइड" टैब में स्टेप 3 देखें।
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Local Saved Inquiries */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold text-sm">
                    क्लाइंट इन्क्वायरी बैकअप लॉग (Safe Server Backup)
                  </h4>
                  <p className="text-xs text-slate-400">
                    वेबसाइट पर सबमिट की गई सभी इन्क्वायरीज यहाँ सर्वर पर सुरक्षित रिकॉर्ड होती हैं।
                  </p>
                </div>
                <button
                  type="button"
                  onClick={fetchInquiries}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                  title="Refresh"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingInquiries ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {inquiries.length === 0 ? (
                <div className="p-8 text-center rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs">
                  अभी तक कोई इन्क्वायरी प्राप्त नहीं हुई है। आप कांटेक्ट फॉर्म में टेस्ट मैसेज भरकर सबमिट कर सकते हैं!
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="font-bold text-white text-sm">{inq.fullName}</span>
                        <span className="text-[10px] font-mono text-cyan-400">{inq.id}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-slate-300">
                        <div>
                          <span className="text-slate-400">Email:</span> {inq.email}
                        </div>
                        <div>
                          <span className="text-slate-400">Service:</span> {inq.service}
                        </div>
                        <div>
                          <span className="text-slate-400">Budget:</span> {inq.budget}
                        </div>
                        <div>
                          <span className="text-slate-400">Date:</span> {inq.formattedDate}
                        </div>
                      </div>
                      <div className="p-2.5 rounded bg-slate-950 text-slate-300 whitespace-pre-wrap">
                        {inq.details}
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span
                          className={`text-[10px] font-semibold ${
                            inq.emailDelivered ? 'text-emerald-400' : 'text-amber-400'
                          }`}
                        >
                          {inq.emailDelivered ? '✓ Delivered to Email' : '• Saved in Server Backup'}
                        </span>
                        <a
                          href={`mailto:${inq.email}`}
                          className="text-blue-400 hover:underline text-[11px]"
                        >
                          Reply to Client →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-800 bg-[#080d1a]">
          <span className="text-xs text-slate-400">
            Saket Web Developer • Confidential Owner Console
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
