 "use client";

import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import * as styles from "./Components.module.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    "first-name": "",
    "last-name": "",
    "work-mail": "",
    "company-name": "",
    "company-industry": "",
    services: [],
    "project-details": "",
  });

  const [status, setStatus] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        services: checked
          ? [...prev.services, value]
          : prev.services.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    if (!recaptchaToken) {
      setStatus("Please complete the reCAPTCHA.");
      return;
    }

    try {
      const form = new FormData();
      form.append("_wpcf7", "313");
      form.append("_wpcf7_version", "5.7");
      form.append("_wpcf7_locale", "en_US");
      form.append("_wpcf7_unit_tag", "wpcf7-f313-p1-o1");
      form.append("_wpcf7_container_post", "1");

      form.append("first-name", formData["first-name"]);
      form.append("last-name", formData["last-name"]);
      form.append("work-mail", formData["work-mail"]);
      form.append("company-name", formData["company-name"]);
      form.append("company-industry", formData["company-industry"]);
      // formData.services.forEach((service) =>
      //   form.append("services[]", service)
      // );
      form.append("services[]", formData.services.join(", "));
      form.append("project-details", formData["project-details"]);

      // Append reCAPTCHA token
      form.append("g-recaptcha-response", recaptchaToken);
      
      const response = await fetch(
        "https://backend.manipal.digital/wp-json/contact-form-7/v1/contact-forms/313/feedback",
        {
          method: "POST",
          body: form,
        }
      );
      
      const result = await response.json();
      console.log("CF7 response: ", result);
      if (result.status === "mail_sent") {
        setStatus("Message sent successfully!");
      } else {
        setStatus(`Failed to send message: ${result.message}`);
      }
    } catch (error) {
      setStatus("An error occurred while sending your message.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles?.contactForm} container`}>
      <h2 className="fs-4 fw-bold mb-4">Tell us about you*</h2>

      <div className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            name="first-name"
            placeholder="First Name"
            value={formData["first-name"]}
            onChange={handleChange}
            className={`${styles?.formControl} form-control`}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="last-name"
            placeholder="Last Name"
            value={formData["last-name"]}
            onChange={handleChange}
            className={`${styles?.formControl} form-control`}
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <input
          type="email"
          name="work-mail"
          placeholder="Work Mail"
          value={formData["work-mail"]}
          onChange={handleChange}
          className={`${styles?.formControl} form-control`}
          required
        />
      </div>

      <div className="mt-4">
        <input
          type="text"
          name="company-name"
          placeholder="Company Name"
          value={formData["company-name"]}
          onChange={handleChange}
          className={`${styles?.formControl} form-control`}
          required
        />
      </div>

      <div className="mt-4">
        <input
          type="text"
          name="company-industry"
          placeholder="Industry"
          value={formData["company-industry"]}
          onChange={handleChange}
          className={`${styles?.formControl} form-control`}
          required
        />
      </div>

      <h2 className="fs-5 fw-bold mt-4">How can we help you?</h2>
      <div className={`${styles?.serviceGroup} btn-group d-flex flex-wrap mt-3`} role="group">
        {["Packaging", "Audio Visuals", "CGI", "Imaging"].map((service) => (
          <div key={service} className="me-2">
            <input
              type="checkbox"
              name="services"
              value={service}
              checked={formData.services.includes(service)}
              onChange={handleChange}
              className="btn-check"
              id={service}
              autoComplete="off"
            />
            <label
              className={`btn btn-outline-dark ${
                formData.services.includes(service) ? "active" : ""
              } ${styles?.checkBtn}`}
              htmlFor={service}
            >
              {service}
            </label>
          </div>
        ))}
      </div>

      <h2 className="fs-5 fw-bold mt-5 mb-3">Describe your project*</h2>
      <textarea
        name="project-details"
        placeholder="Your project details"
        value={formData["project-details"]}
        onChange={handleChange}
        className={`${styles?.formControl} ${styles?.formControltextarea} form-control`}
        required
      />

      <div className="mt-4">
        <ReCAPTCHA
          sitekey="6LcM2DcrAAAAAOZ5tf9bnGkdicwOsBZfPjdWWsOt"
          onChange={(token) => setRecaptchaToken(token)}
        />
      </div>


      {!status ? (
      <button type="submit" className={`${styles?.contactBtn} btn btn-dark mt-3 text-2`}>
        Submit Enquiry
      </button>
    ) : (
      <p className={`mt-3 text-muted ${styles.messageSuccess}`}>
        {status}
      </p>
    )}


    </form>
  );
}