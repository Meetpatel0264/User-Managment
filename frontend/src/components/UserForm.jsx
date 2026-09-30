import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";

const initialValues = {
  name: "",
  email: "",
  phone: ""
};

function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = "Name is required.";
  else if (values.name.trim().length < 2) errors.name = "Name must be at least 2 characters.";

  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.phone.trim()) errors.phone = "Phone is required.";
  else if (!/^[0-9+\-\s()]{7,20}$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  return errors;
}

export default function UserForm({
  editingUser,
  onSubmit,
  onCancel,
  submitting
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues(
      editingUser
        ? {
            name: editingUser.name || "",
            email: editingUser.email || "",
            phone: editingUser.phone || ""
          }
        : initialValues
    );
    setErrors({});
  }, [editingUser]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    await onSubmit({
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      phone: values.phone.trim()
    });
  }

  const fieldError = (field) =>
    errors[field] ? (
      <p className="mt-1 text-xs font-medium text-red-500">{errors[field]}</p>
    ) : null;

  return (
    <div className="glass rounded-2xl p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">
            {editingUser ? "Edit user" : "Add new user"}
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {editingUser
              ? "Update the user's details."
              : "Enter the user's details below."}
          </p>
        </div>
        <button
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          onClick={onCancel}
          disabled={submitting}
          aria-label="Close form"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            className="input"
            placeholder="Leanne Graham"
            disabled={submitting}
          />
          {fieldError("name")}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className="input"
            placeholder="leanne@example.com"
            disabled={submitting}
          />
          {fieldError("email")}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            className="input"
            placeholder="+91 98765 43210"
            disabled={submitting}
          />
          {fieldError("phone")}
        </div>

        <div className="flex gap-2 pt-2">
          <button type="button" className="btn-secondary flex-1" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
          <button type="submit" className="btn-primary flex-1" disabled={submitting}>
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? "Saving..." : editingUser ? "Update user" : "Create user"}
          </button>
        </div>
      </form>
    </div>
  );
}