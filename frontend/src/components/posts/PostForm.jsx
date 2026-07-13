import { useEffect, useState } from "react";

function PostForm({
  initialValues,
  onSubmit,
  submitText,
  onCancel, // Received from parent views to trigger safety checks
}) {
  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Preserving your exact tag formatting array parser safely
      const postData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      await onSubmit(postData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Shared input class styles for structural consistency across themes
  const inputClasses =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/20";

  // Shared label typography styles
  const labelClasses =
    "block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-slate-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* 1. Article Title Field */}
      <div className="space-y-2">
        <label htmlFor="title" className={labelClasses}>
          Article Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="e.g., Mastering Tailwind Layouts"
          value={formData.title}
          onChange={handleChange}
          className={inputClasses}
          required
        />
      </div>

      {/* 2. Cover Image URL Field */}
      <div className="space-y-2">
        <label htmlFor="coverImage" className={labelClasses}>
          Cover Image URL
        </label>
        <input
          id="coverImage"
          type="url"
          name="coverImage"
          placeholder="https://images.unsplash.com/..."
          value={formData.coverImage}
          onChange={handleChange}
          className={inputClasses}
        />
      </div>

      {/* 3. Short Excerpt Field */}
      <div className="space-y-2">
        <label htmlFor="excerpt" className={labelClasses}>
          Short Summary / Excerpt
        </label>
        <input
          id="excerpt"
          type="text"
          name="excerpt"
          placeholder="A brief teaser shown in the article feed..."
          value={formData.excerpt}
          onChange={handleChange}
          className={inputClasses}
          required
        />
      </div>

      {/* 4. Core Markdown Body Content Field */}
      <div className="space-y-2">
        <label htmlFor="content" className={labelClasses}>
          Article Body Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={12}
          placeholder="Write your comprehensive technical analysis or tutorial content here..."
          value={formData.content}
          onChange={handleChange}
          className={`${inputClasses} resize-y font-sans leading-relaxed`}
          required
        />
      </div>

      {/* 5. Tags / Meta Keywords Field */}
      <div className="space-y-2">
        <label htmlFor="tags" className={labelClasses}>
          Metadata Keywords (Tags)
        </label>
        <input
          id="tags"
          type="text"
          name="tags"
          placeholder="react, node, mongodb"
          value={formData.tags}
          onChange={handleChange}
          className={inputClasses}
        />
        <p className="text-xs text-gray-400 dark:text-slate-500">
          Separate tags with commas. Do not include hash (#) marks manually.
        </p>
      </div>

      {/* Form Validation Errors Alert Area */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900/30 dark:bg-red-950/20">
          <p className="text-xs font-medium text-red-800 dark:text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* Action Bar Button Control Matrix */}
      <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-5 dark:border-slate-800">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-offset-slate-950"
        >
          {loading ? "Saving Changes..." : submitText}
        </button>
      </div>
    </form>
  );
}

export default PostForm;
