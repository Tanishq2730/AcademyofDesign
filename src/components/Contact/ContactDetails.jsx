import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactDetails() {
  return (
    <div className="contact-fade space-y-12">
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
          <Mail className="text-purple-500" size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Email Us</h3>
          <p className="text-gray-400 text-lg">hello@nuvosid.com</p>
          <p className="text-gray-400 text-lg">admissions@nuvosid.com</p>
        </div>
      </div>

      <div className="flex items-start gap-6">
        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
          <Phone className="text-purple-500" size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Call Us</h3>
          <p className="text-gray-400 text-lg">+91 (800) 123-4567</p>
          <p className="text-gray-400 text-lg">+91 (800) 987-6543</p>
        </div>
      </div>

      <div className="flex items-start gap-6">
        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
          <MapPin className="text-purple-500" size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Visit Campus</h3>
          <p className="text-gray-400 text-lg">123 Design Square, Creative District</p>
          <p className="text-gray-400 text-lg">Mumbai, MH 400001, India</p>
        </div>
      </div>
    </div>
  );
}
