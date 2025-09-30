import React, { useState } from "react";
import { 
  MessageCircle,   // instead of Mail
  Smartphone,      // instead of Phone
  Building2,       // instead of MapPin (office/building)
  CalendarClock,   // instead of Clock (support hours)
  BadgeCheck       // instead of CheckCircle (success tick)
} from "lucide-react";
import { motion } from "framer-motion";

export default function GetInTouch() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    farmSize: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     setSubmitted(true);

//     // Reset form after 2s
//     setTimeout(() => {
//       setSubmitted(false);
//       setFormData({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         farmSize: "",
//         message: "",
//       });
//     }, 2500);
//   };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // http://localhost:5000/api/contact
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setSubmitted(true);
      // reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        farmSize: "",
        message: "",
      });
    } else {
      const data = await res.json();
      alert("❌ Error: " + data.error);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Something went wrong");
  }
};

  return (
    <section id="contact-us" className="py-10 px-4 md:px-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mt-0 text-gray-900 text-center"
        >
          Get In Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-black-300   text-center mt-6 text-sm md:text-base"
        >
          Have question about farmAssist? Our team is here to help you out.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-lg md:text-2xl font-bold text-black">Contact Information</h3>

{/* new */}
{[
  { icon: MessageCircle, label: "Email", lines: ["support@farmassist.com", "info@farmassist.com"] },
  { icon: Smartphone, label: "Phone", lines: ["+91 98765 43210"] },
  { icon: Building2, label: "Office", lines: ["123 Green Valley, Kochi, Kerala, India"] },
  { icon: CalendarClock, label: "Support Hours", lines: ["Mon - Fri: 9:00 AM - 6:00 PM"] },
].map((item, idx) => (
  <motion.div
    key={idx}
    whileHover={{ scale: 1.05 }}
    className="flex items-start space-x-3"
  >
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600">
      <item.icon className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className="font-semibold text-gray-800">{item.label}</p>
      {item.lines.map((line, i) => (
        <p key={i} className="text-gray-700 text-sm">{line}</p>
      ))}
    </div>
  </motion.div>
))}

{/* end */}


            {/* {[
              { icon: MessageCircle, label: "Email", lines: ["support@farmassist.com", "info@farmassist.com"] },
              { icon: Smartphone, label: "Phone", lines: ["+91 98765 43210"] },
              { icon: Building2, label: "Office", lines: ["123 Green Valley, Kochi, Kerala, India"] },
              { icon: CalendarClock, label: "Support Hours", lines: ["Mon - Fri: 9:00 AM - 6:00 PM"] },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="flex items-start space-x-3"
              >
                <item.icon className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">{item.label}</p>
                  {item.lines.map((line, i) => (
                    <p key={i} className="text-gray-700 text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))} */}
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white shadow-lg rounded-2xl p-6 relative overflow-hidden"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Send Us a Message</h3>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <input
                  type="text"
                  name="farmSize"
                  value={formData.farmSize}
                  onChange={handleChange}
                  placeholder="Farm Size (e.g. 2 acres)"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Your Message"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                ></textarea>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Send Message
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center h-56"
              >
                <BadgeCheck className="w-12 h-12 text-green-600 mb-3" />
                <p className="text-green-700 font-semibold">Message Sent!</p>
                <p className="text-gray-500 text-sm">
                  We typically respond within 24 hours during business days.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
