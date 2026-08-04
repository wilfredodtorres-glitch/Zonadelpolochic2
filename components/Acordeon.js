"use client";
import { useState } from "react";

export default function Acordeon({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="acordeon">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div className="acordeon-item" key={index}>
            <button 
              className={`acordeon-btn ${isOpen ? 'activo' : ''}`} 
              aria-expanded={isOpen} 
              onClick={() => toggle(index)}
            >
              {faq.pregunta}
            </button>
            {isOpen && (
              <div className="acordeon-panel" style={{ display: 'block' }}>
                {faq.respuesta}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
