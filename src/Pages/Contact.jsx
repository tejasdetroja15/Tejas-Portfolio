import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send, Sparkles, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import SocialLinks from "../components/SocialLinks";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 800,
      easing: 'ease-out-cubic',
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Sending Message...',
      html: 'Please wait while we send your message',
      allowOutsideClick: false,
      background: '#2A2D3A',
      color: '#FAFAFA',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      // Get form data
      const form = e.target;
      const formData = new FormData(form);

      // Submit form
      await form.submit();

      // Show success message
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully!',
        icon: 'success',
        background: '#2A2D3A',
        color: '#FAFAFA',
        confirmButtonColor: '#6366F1',
        timer: 2000,
        timerProgressBar: true
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        background: '#2A2D3A',
        color: '#FAFAFA',
        confirmButtonColor: '#6366F1'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 relative overflow-hidden" id="Contact">
      {/* Floating Background Elements */}
      <div className="floating-element w-96 h-96 top-1/4 left-1/4 opacity-5" />
      <div className="floating-element w-80 h-80 bottom-1/4 right-1/4 opacity-5" delay={2} />
      
      <div className="premium-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            data-aos="fade-in-up"
            data-aos-duration="1000"
            className="text-4xl md:text-6xl font-bold bg-gradient-premium bg-clip-text text-transparent mb-4"
          >
            Contact Me
          </h2>
          <p
            data-aos="fade-in-up"
            data-aos-duration="1100"
            className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Got a question? Send me a message, and I'll get back to you soon.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div
            data-aos="fade-in-up"
            data-aos-duration="1200"
            className="bg-primary-card/30 backdrop-blur-xl rounded-2xl shadow-soft-lg p-8 border border-border-default/30"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  Send Message
                </h3>
                <p className="text-text-secondary">
                  Have something to discuss? Send me a message and let's talk.
                </p>
              </div>
              <div className="w-12 h-12 bg-accent-purple/20 rounded-lg flex items-center justify-center border border-accent-purple/30">
                <Share2 className="w-6 h-6 text-accent-purple" />
              </div>
            </div>

            <form 
              action="https://formsubmit.co/tejasdetroja1510@gmail.com"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* FormSubmit Configuration */}
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />

              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group"
              >
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-accent-purple transition-colors pointer-events-none z-10" />
                <input
                  type="text"
                  name="name"
                  placeholder="     Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="premium-input pl-12"
                  required
                />
              </div>
              
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group"
              >
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-accent-purple transition-colors pointer-events-none z-10" />
                <input
                  type="email"
                  name="email"
                  placeholder="     Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="premium-input pl-12"
                  required
                />
              </div>
              
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="relative group"
              >
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-text-muted group-focus-within:text-accent-purple transition-colors pointer-events-none z-10" />
                <textarea
                  name="message"
                  placeholder="     Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="premium-input pl-12 resize-none h-32"
                  required
                />
              </div>
              
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="premium-button w-full py-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-border-default/30">
              <p className="text-text-secondary text-center mb-4">Connect with me on social media</p>
              <div className="flex justify-center">
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;