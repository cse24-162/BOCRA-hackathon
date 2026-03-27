import { useState } from 'react';
import { CheckCircle2, Upload, ArrowLeft, ArrowRight, ShoppingCart, Trash2, Plus } from 'lucide-react';
import { submitLicense } from '../utils/api';

// ── License catalog — application fees only (P5,600 per BOCRA official PDF) ─
const LICENSE_CATALOG = [
  { type: 'Internet Service Provider',   applicationFee: 5600, description: 'Internet services on regional networks' },
  { type: 'Telecommunications Operator', applicationFee: 5600, description: 'Voice/data/text services on public fixed networks' },
  { type: 'Broadcasting License',         applicationFee: 5600, description: 'Broadcasting signal distribution services' },
  { type: 'Spectrum License',             applicationFee: 5600, description: 'Radio frequency spectrum usage license' },
  { type: 'Value Added Services',         applicationFee: 5600, description: 'VOIP, premium rate, and other value-added services' },
  { type: 'Infrastructure Provider',      applicationFee: 5600, description: 'Network infrastructure and facilities provision' },
];

type CartItem = typeof LICENSE_CATALOG[0];

const formatPula = (amount: number) =>
  `P ${amount.toLocaleString('en-BW', { minimumFractionDigits: 2 })}`;

const STEPS = [
  { number: 1, title: 'Company Details',  description: 'Basic company information' },
  { number: 2, title: 'Select Licenses',  description: 'Add licenses to cart' },
  { number: 3, title: 'Documentation',    description: 'Upload required documents' },
  { number: 4, title: 'Review & Pay',     description: 'Confirm and submit' },
];

export function LicensingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted]     = useState(false);
  const [trackingId, setTrackingId]   = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError]             = useState('');
  const [stepError, setStepError]     = useState('');
  const [cart, setCart]               = useState<CartItem[]>([]);

  const [formData, setFormData] = useState({
    companyName: '',
    registrationNumber: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    businessPlan:        null as File | null,
    financialStatements: null as File | null,
    incorporationCert:   null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files?.[0]) setFormData({ ...formData, [field]: e.target.files[0] });
  };

  const addToCart    = (license: CartItem) => { if (!isInCart(license.type)) setCart([...cart, license]); };
  const removeFromCart = (type: string)    => setCart(cart.filter(i => i.type !== type));
  const isInCart     = (type: string)      => cart.some(i => i.type === type);

  const subtotal  = cart.reduce((sum, i) => sum + i.applicationFee, 0);
  const vat       = subtotal * 0.12;
  const grandTotal = subtotal + vat;

  const validateStep = () => {
    if (currentStep === 1) {
      const { companyName, registrationNumber, contactPerson, email, phone, address } = formData;
      if (!companyName || !registrationNumber || !contactPerson || !email || !phone || !address) {
        setStepError('Please fill in all required fields before proceeding.');
        return false;
      }
    }
    if (currentStep === 2 && cart.length === 0) {
      setStepError('Please add at least one license to your cart.');
      return false;
    }
    if (currentStep === 3) {
      if (!formData.businessPlan || !formData.financialStatements || !formData.incorporationCert) {
        setStepError('Please upload all required documents before proceeding.');
        return false;
      }
    }
    setStepError('');
    return true;
  };

  const handleNext = () => { if (validateStep()) setCurrentStep(s => s + 1); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const result = await submitLicense({ ...formData, licenses: cart.map(l => l.type), totalFee: grandTotal });
      setTrackingId(result.trackingId);
      setSubmitted(true);
    } catch {
      setError('Failed to submit license application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success ───────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted Successfully</h2>
            <p className="text-gray-600 mb-6">Your license application has been received and is under review.</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Your Application Tracking ID</p>
              <p className="text-2xl font-bold text-[#0095DA] mb-2 break-all">{trackingId}</p>
              <p className="text-sm text-gray-600">Please save this ID to track your application status</p>
            </div>
            <div className="space-y-3">
              <a href="/dashboard" className="block w-full bg-[#0095DA] text-white px-6 py-3 rounded-md font-medium hover:bg-[#0077B3] transition-colors">Go to Dashboard</a>
              <a href="/" className="block w-full bg-white text-[#0095DA] border border-gray-300 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors">Return to Home</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">License Application</h1>
          <p className="text-sm text-gray-600">Apply for telecommunications, broadcasting, or spectrum licenses</p>
        </div>

        {/* Stepper */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${currentStep >= step.number ? 'bg-[#00A651] text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {currentStep > step.number ? <CheckCircle2 size={18} /> : step.number}
                  </div>
                  <p className="text-xs font-medium text-gray-700 mt-1 text-center hidden sm:block">{step.title}</p>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 transition-colors ${currentStep > step.number ? 'bg-[#00A651]' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-sm text-red-700">{error}</div>}

        <form onSubmit={handleSubmit}>

          {/* ── STEP 1: Company Details ───────────────────────────────────── */}
          {currentStep === 1 && (
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Company Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {([
                  { id: 'companyName',        label: 'Company Name *',        type: 'text',  placeholder: 'Enter company name' },
                  { id: 'registrationNumber', label: 'Registration Number *', type: 'text',  placeholder: 'Company reg. number' },
                  { id: 'contactPerson',      label: 'Contact Person *',      type: 'text',  placeholder: 'Full name' },
                  { id: 'email',              label: 'Email Address *',       type: 'email', placeholder: 'company@example.com' },
                  { id: 'phone',              label: 'Phone Number *',        type: 'tel',   placeholder: '+267 7XXX XXXX' },
                  { id: 'address',            label: 'Physical Address *',    type: 'text',  placeholder: 'Street, City' },
                ] as const).map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input type={type} id={id} name={id} value={(formData as any)[id]} onChange={handleChange}
                      placeholder={placeholder}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A651] focus:border-transparent text-sm" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 2: License Cart ──────────────────────────────────────── */}
          {currentStep === 2 && (
            <div className="flex flex-col sm:flex-row gap-6">

              {/* License list */}
              <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Available Licenses</h2>
                <div className="space-y-3">
                  {LICENSE_CATALOG.map((license) => (
                    <div key={license.type}
                      className={`border rounded-lg p-4 transition-colors ${isInCart(license.type) ? 'border-[#00A651] bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="flex justify-between items-center gap-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{license.type}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{license.description}</p>
                          <p className="text-xs text-gray-700 mt-1">Application fee: <strong>{formatPula(license.applicationFee)}</strong></p>
                        </div>
                        <button type="button"
                          onClick={() => isInCart(license.type) ? removeFromCart(license.type) : addToCart(license)}
                          className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${isInCart(license.type) ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-[#0095DA] text-white hover:bg-[#0077B3]'}`}>
                          {isInCart(license.type) ? <><Trash2 size={12} /> Remove</> : <><Plus size={12} /> Add</>}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart summary */}
              <div className="w-full sm:w-64 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-20">
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingCart size={20} className="text-[#0095DA]" />
                  <h3 className="font-bold text-gray-900">Cart ({cart.length})</h3>
                </div>

                {cart.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-6">No licenses added yet</p>
                ) : (
                  <div className="space-y-2 mb-4">
                    {cart.map(item => (
                      <div key={item.type} className="flex justify-between items-center text-xs border-b pb-2">
                        <span className="text-gray-800 font-medium pr-2">{item.type}</span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-gray-600">{formatPula(item.applicationFee)}</span>
                          <button type="button" onClick={() => removeFromCart(item.type)} className="text-red-400 hover:text-red-600">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {cart.length > 0 && (
                  <div className="border-t pt-3 space-y-1 text-xs text-gray-600">
                    <div className="flex justify-between"><span>Subtotal</span><span>{formatPula(subtotal)}</span></div>
                    <div className="flex justify-between"><span>VAT (12%)</span><span>{formatPula(vat)}</span></div>
                    <div className="flex justify-between font-bold text-sm text-gray-900 pt-1 border-t">
                      <span>Total</span><span>{formatPula(grandTotal)}</span>
                    </div>
                  </div>
                )}

                <button type="button" onClick={() => setCart([])}
                  className="mt-4 w-full text-xs text-[#0095DA] hover:underline text-center">
                  Clear cart
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Documentation ─────────────────────────────────────── */}
          {currentStep === 3 && (
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Upload Documentation</h2>
              <div className="space-y-4">
                {([
                  { field: 'businessPlan',        label: 'Business Plan *',               accept: '.pdf,.doc,.docx', hint: 'PDF, DOC, DOCX (max 10MB)' },
                  { field: 'financialStatements',  label: 'Financial Statements *',        accept: '.pdf',            hint: 'PDF (max 10MB)' },
                  { field: 'incorporationCert',    label: 'Certificate of Incorporation *', accept: '.pdf',           hint: 'PDF (max 5MB)' },
                ] as const).map(({ field, label, accept, hint }) => (
                  <div key={field} className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#00A651] transition-colors">
                    <label htmlFor={field} className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <Upload size={28} className="text-gray-400 mb-2" />
                        <p className="font-medium text-gray-900 mb-1">{label}</p>
                        <p className="text-sm text-gray-500">{(formData as any)[field] ? (formData as any)[field].name : 'Click to upload or drag and drop'}</p>
                        <p className="text-xs text-gray-400 mt-1">{hint}</p>
                      </div>
                      <input type="file" id={field} onChange={(e) => handleFileChange(e, field)} className="hidden" accept={accept} />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 4: Review & Pay ──────────────────────────────────────── */}
          {currentStep === 4 && (
            <div className="space-y-6">
              {/* Company info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Review Application</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {([
                    ['Company Name', formData.companyName],
                    ['Registration No.', formData.registrationNumber],
                    ['Contact Person', formData.contactPerson],
                    ['Email', formData.email],
                    ['Phone', formData.phone],
                    ['Address', formData.address],
                  ] as [string, string][]).map(([label, value]) => (
                    <div key={label} className="flex gap-2">
                      <span className="text-gray-500 w-36 flex-shrink-0">{label}:</span>
                      <span className="text-gray-900 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fee summary */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Licenses & Fees</h3>
                <div className="space-y-3 mb-4">
                  {cart.map((item, i) => (
                    <div key={item.type} className={`flex justify-between items-center text-sm py-2 ${i !== cart.length - 1 ? 'border-b' : ''}`}>
                      <div>
                        <p className="font-medium text-gray-900">{item.type}</p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                      <span className="text-gray-700 font-medium">{formatPula(item.applicationFee)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatPula(subtotal)}</span></div>
                  <div className="flex justify-between text-gray-600"><span>VAT (12%)</span><span>{formatPula(vat)}</span></div>
                  <div className="flex justify-between font-bold text-base text-gray-900 pt-2 border-t">
                    <span>Total Due</span>
                    <span className="text-[#0095DA]">{formatPula(grandTotal)}</span>
                  </div>
                </div>
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
                  <p className="font-medium mb-1">Payment Instructions</p>
                  <p>After submission, BOCRA will send a payment reference to <strong>{formData.email}</strong>. Payment can be made via bank transfer or at the BOCRA offices.</p>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-3">Uploaded Documents</h3>
                <div className="space-y-2 text-sm">
                  {([
                    ['Business Plan', formData.businessPlan],
                    ['Financial Statements', formData.financialStatements],
                    ['Certificate of Incorporation', formData.incorporationCert],
                  ] as [string, File | null][]).map(([label, file]) => (
                    <div key={label} className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{label}:</span>
                      <span className="text-gray-500 truncate">{file?.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Navigation ───────────────────────────────────────────────── */}
          <div className="mt-6 space-y-2">
            {stepError && <p className="text-sm text-red-600 text-center">{stepError}</p>}
            <div className="flex gap-4">
              {currentStep > 1 && (
                <button type="button" onClick={() => { setCurrentStep(s => s - 1); setStepError(''); }}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                  <ArrowLeft size={18} /> Previous
                </button>
              )}
              {currentStep < 4 ? (
                <button type="button" onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#00A651] text-white px-6 py-3 rounded-md font-medium hover:bg-[#008A43] transition-colors ml-auto text-sm">
                  Next <ArrowRight size={18} />
                </button>
              ) : (
                <button type="submit" disabled={isSubmitting}
                  className="flex-1 bg-[#0095DA] text-white px-6 py-3 rounded-md font-medium hover:bg-[#0077B3] transition-colors ml-auto disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                  {isSubmitting ? 'Submitting...' : `Submit & Pay ${formatPula(grandTotal)}`}
                </button>
              )}
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}