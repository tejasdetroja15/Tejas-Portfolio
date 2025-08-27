import React, { useState } from "react";

const InputField = ({ field, label, icon: Icon, formData, handleChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  // Helper function to generate input classes dynamically
  const getInputClasses = (isTextArea = false) => {
    const baseClasses = `
      w-full p-4 rounded-xl bg-primary-card/20 backdrop-blur-xl text-text-primary placeholder-transparent 
      focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:ring-offset-2 
      focus:ring-offset-primary-bg transition-all duration-300 peer border border-border-default/30
      hover:border-accent-purple/30
    `;

    return `${baseClasses} ${isTextArea ? "h-52 pt-12" : "pl-12"}`;
  };

  // Render input or textarea based on the field type
  const renderInputContent = () => {
    if (field === "message") {
      return (
        <textarea
          id={field}
          name={field}
          placeholder={label}
          value={formData[field]}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={getInputClasses(true)}
          required
        />
      );
    }

    return (
      <input
        id={field}
        type={field === "email" ? "email" : "text"}
        name={field}
        placeholder={label}
        value={formData[field]}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={getInputClasses()}
        required
      />
    );
  };

  return (
    <div className="relative w-full group">
      {/* Icon */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted transition-colors group-hover:text-accent-purple z-10">
        <Icon className="w-5 h-5" />
      </div>

      {/* Input or Textarea */}
      {renderInputContent()}

      {/* Floating Label */}
      <label
        htmlFor={field}
        className={`
          absolute left-12 top-1/2 transform -translate-y-1/2 text-text-muted text-sm transition-all duration-300 
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-0 
          peer-placeholder-shown:text-text-secondary peer-placeholder-shown:text-base 
          peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-accent-purple peer-focus:text-sm
          peer-focus:-translate-y-1/2
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default InputField;
